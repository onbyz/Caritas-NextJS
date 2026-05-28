# Legacy data

- **`legacy-db.sqlite3`** — Copy of the Django `db.sqlite3` used only to regenerate `constants/doctors.json`:
  ```bash
  python3 scripts/export-doctors.py
  ```
- Doctor photos live in **`public/media/doctors/`** (served at `/media/doctors/...`).

You can delete the old `caritas_hospital/` folder once this project builds and runs on its own.
