#!/usr/bin/env python3
"""Insert form submissions into legacy SQLite (Django-compatible tables)."""
from __future__ import annotations

import json
import sqlite3
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_DB = ROOT / "data" / "legacy-db.sqlite3"

INSERTERS: dict[str, tuple[str, list[str]]] = {
    "enquire": (
        "caritasapp_enquire",
        ["name", "email", "phone_number", "message", "page_url", "created_at", "send_status"],
    ),
    "contact-us": (
        "caritasapp_contactus",
        [
            "first_name",
            "last_name",
            "email",
            "phone_number",
            "message",
            "page_url",
            "created_at",
            "send_status",
        ],
    ),
    "home-care": (
        "caritasapp_homecare",
        [
            "first_name",
            "last_name",
            "email",
            "phone_number",
            "package",
            "agree_terms",
            "created_at",
            "send_status",
        ],
    ),
    "book-consultation": (
        "caritasapp_bookconsultation",
        [
            "first_name",
            "last_name",
            "email",
            "country",
            "phone_number",
            "gender",
            "agree_terms",
            "dob",
            "department_id",
            "doctor_id",
            "message",
            "op_number",
            "created_at",
            "send_status",
        ],
    ),
    "international": (
        "caritasapp_internationalform",
        [
            "first_name",
            "last_name",
            "email",
            "phone_number",
            "country",
            "message",
            "created_at",
            "send_status",
        ],
    ),
    "health-package": (
        "caritasapp_healthcheckuppackage",
        ["name", "email", "phone_number", "package", "page_url", "created_at", "send_status"],
    ),
    "nri-health-package": (
        "caritasapp_nrihealthpackage",
        ["name", "email", "phone_number", "package", "page_url", "created_at", "send_status"],
    ),
    "robotics": (
        "caritasapp_roboticsconsultation",
        ["name", "email", "phone_number", "page_url", "created_at", "send_status"],
    ),
    "dbs": (
        "caritasapp_dbsconsultation",
        ["name", "email", "phone_number", "page_url", "created_at", "send_status"],
    ),
    "contact": (
        "caritasapp_contact",
        ["query_type", "name", "email", "message", "department_id", "doctor_id", "created_at"],
    ),
}


def _now() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S")


def _bool(val: Any) -> int:
    if val in (True, 1, "1", "true", "on", "yes"):
        return 1
    return 0


def prepare_row(form_type: str, data: dict[str, Any]) -> dict[str, Any]:
    row = dict(data)
    row.setdefault("created_at", _now())
    row.setdefault("send_status", 0)

    if form_type in ("home-care", "book-consultation"):
        if "agree_terms" in row:
            row["agree_terms"] = _bool(row["agree_terms"])

    if form_type == "book-consultation":
        if "department_id" not in row and "department" in row:
            row["department_id"] = row.pop("department")
        if "doctor_id" not in row and "doctor" in row:
            row["doctor_id"] = row.pop("doctor")

    return row


def insert(form_type: str, data: dict[str, Any], db_path: Path) -> int:
    if form_type not in INSERTERS:
        raise ValueError(f"Unknown form type: {form_type}")

    table, columns = INSERTERS[form_type]
    row = prepare_row(form_type, data)
    values = [row.get(col) for col in columns]
    placeholders = ", ".join("?" for _ in columns)
    col_list = ", ".join(columns)

    conn = sqlite3.connect(db_path)
    try:
        cur = conn.execute(
            f"INSERT INTO {table} ({col_list}) VALUES ({placeholders})",
            values,
        )
        conn.commit()
        return int(cur.lastrowid)
    finally:
        conn.close()


def main() -> None:
    if len(sys.argv) < 2:
        print("Usage: insert-form-submission.py <form-type>", file=sys.stderr)
        sys.exit(1)

    form_type = sys.argv[1]
    payload = json.load(sys.stdin)
    db_path = Path(payload.pop("db_path", str(DEFAULT_DB)))

    row_id = insert(form_type, payload, db_path)
    print(json.dumps({"id": row_id}))


if __name__ == "__main__":
    main()
