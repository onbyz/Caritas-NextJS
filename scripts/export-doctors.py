"""
Export visible doctors from bundled legacy SQLite into constants/doctors.json.
Requires: data/legacy-db.sqlite3 (copy of Django db.sqlite3)

Usage: python3 scripts/export-doctors.py
"""
import json
import sqlite3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
db = ROOT / "data" / "legacy-db.sqlite3"
out = ROOT / "constants" / "doctors.json"

if not db.exists():
    raise SystemExit(
        f"Missing {db}. Copy Django db.sqlite3 to data/legacy-db.sqlite3 before exporting."
    )

conn = sqlite3.connect(db)
conn.row_factory = sqlite3.Row
c = conn.cursor()
c.execute(
    """
SELECT doc.id, doc.name, doc.designation, doc.specialization, doc.image,
       doc.appointment_enabled, doc."order",
       dept.name AS department_name, dept.Department_url AS department_url
FROM caritasapp_doctor doc
LEFT JOIN caritasapp_department dept ON doc.department_id = dept.Department_id
WHERE doc.is_visible = 1
ORDER BY CASE WHEN doc."order" GLOB '[0-9]*' THEN CAST(doc."order" AS INTEGER) ELSE 999 END, doc.name
"""
)
media_dir = ROOT / "public" / "media" / "doctors"
available = (
    {p.name for p in media_dir.iterdir() if p.is_file()}
    if media_dir.is_dir()
    else set()
)
default_image = "/media/doctors/Default.png"

rows = []
missing_count = 0
for r in c.fetchall():
    d = dict(r)
    if d["image"]:
        filename = Path(d["image"]).name
        image = (
            f"/media/doctors/{filename}"
            if filename in available
            else default_image
        )
        if filename not in available:
            missing_count += 1
    else:
        image = default_image

    rows.append(
        {
            "id": d["id"],
            "name": d["name"],
            "designation": d["designation"] or "",
            "specialization": d["specialization"] or "",
            "image": image,
            "appointmentEnabled": bool(d["appointment_enabled"]),
            "order": d["order"] or "",
            "departmentName": d["department_name"] or "",
            "departmentUrl": d["department_url"] or "",
        }
    )

out.write_text(json.dumps(rows, indent=2), encoding="utf-8")
print(f"Exported {len(rows)} doctors to {out}")
if missing_count:
    print(f"Warning: {missing_count} doctors use Default.png (image file not found in public/media/doctors)")
