#!/usr/bin/env python3
"""Export gallery, posts, videos, career, quality & biomedical data from legacy SQLite."""
import json
import shutil
import sqlite3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DB = ROOT / "data" / "legacy-db.sqlite3"
OUT = ROOT / "constants" / "cms"
MEDIA_SRC = Path(__file__).resolve().parents[2] / "caritas_hospital" / "caritasapp" / "media"
MEDIA_DST = ROOT / "public" / "media"


def main() -> None:
    conn = sqlite3.connect(DB)
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    OUT.mkdir(parents=True, exist_ok=True)

    c.execute("SELECT Category_id, title, slug FROM caritasapp_category")
    categories = {row["Category_id"]: dict(row) for row in c.fetchall()}

    c.execute("SELECT Department_id, slug, Department_url FROM caritasapp_department")
    dept_by_id = {
        row["Department_id"]: {
            "slug": row["slug"] or "",
            "url": (row["Department_url"] or "").strip().rstrip("/"),
        }
        for row in c.fetchall()
    }

    c.execute(
        """
        SELECT post_id, title, slug, excerpt, body, image, created, modified,
               category_id, department_id
        FROM caritasapp_post
        ORDER BY created DESC
        """
    )
    posts = []
    for row in c.fetchall():
        cat = categories.get(row["category_id"], {})
        dept = dept_by_id.get(row["department_id"], {})
        posts.append(
            {
                "id": row["post_id"],
                "title": row["title"],
                "slug": row["slug"],
                "excerpt": row["excerpt"] or "",
                "body": row["body"] or "",
                "image": f"/media/{row['image']}" if row["image"] else None,
                "created": row["created"],
                "modified": row["modified"],
                "categoryTitle": cat.get("title", ""),
                "categorySlug": cat.get("slug", ""),
                "departmentSlug": dept.get("slug") or None,
                "departmentUrl": dept.get("url") or None,
            }
        )
    (OUT / "posts.json").write_text(json.dumps(posts, indent=2), encoding="utf-8")
    print("posts", len(posts))

    c.execute("SELECT id, title FROM caritasapp_album ORDER BY id")
    albums = []
    for album in c.fetchall():
        c.execute(
            "SELECT id, image, description FROM caritasapp_image WHERE album_id = ? ORDER BY id",
            (album["id"],),
        )
        images = []
        for img in c.fetchall():
            rel = img["image"]
            if rel:
                src = MEDIA_SRC / rel
                dst = MEDIA_DST / rel
                if src.exists() and not dst.exists():
                    dst.parent.mkdir(parents=True, exist_ok=True)
                    shutil.copy2(src, dst)
            images.append(
                {
                    "id": img["id"],
                    "src": f"/media/{rel}" if rel else None,
                    "description": img["description"] or "",
                }
            )
        albums.append(
            {
                "id": album["id"],
                "title": album["title"],
                "coverImage": images[0]["src"] if images else None,
                "images": images,
            }
        )
    (OUT / "albums.json").write_text(json.dumps(albums, indent=2), encoding="utf-8")
    print("albums", len(albums))

    c.execute(
        "SELECT id, title, youtube_id, created_at FROM caritasapp_videos ORDER BY id DESC"
    )
    testimonial_videos = [dict(r) for r in c.fetchall()]
    (OUT / "testimonial-videos.json").write_text(
        json.dumps(testimonial_videos, indent=2), encoding="utf-8"
    )
    print("testimonial videos", len(testimonial_videos))

    c.execute(
        "SELECT id, title, youtube_id, created_at FROM caritasapp_videogallery ORDER BY id DESC"
    )
    gallery_videos = [dict(r) for r in c.fetchall()]
    (OUT / "video-gallery.json").write_text(
        json.dumps(gallery_videos, indent=2), encoding="utf-8"
    )
    print("video gallery", len(gallery_videos))

    c.execute(
        """
        SELECT id, job_title, department, qualification, experience, job_discription,
               key_responsibilities, preferred_skills
        FROM caritasapp_career
        """
    )
    careers = [dict(r) for r in c.fetchall()]
    (OUT / "careers.json").write_text(json.dumps(careers, indent=2), encoding="utf-8")
    print("careers", len(careers))

    c.execute(
        """
        SELECT id, average_length, patient_satisfaction, cauti, vap, clabsi, ssi,
               pressure_ulcers_afteradmission, compliance_hand_hygiene, month_year
        FROM caritasapp_qualitycontrol
        ORDER BY month_year DESC
        """
    )
    quality = [dict(r) for r in c.fetchall()]
    (OUT / "quality-control.json").write_text(json.dumps(quality, indent=2), encoding="utf-8")
    print("quality rows", len(quality))

    c.execute(
        """
        SELECT id, total_bags, yellow_bags, red_bags, white_bags,
               brownish_yellow_bags, blue_bags, month_year
        FROM caritasapp_biomedical
        ORDER BY month_year DESC
        """
    )
    biomedical = [dict(r) for r in c.fetchall()]
    (OUT / "biomedical.json").write_text(json.dumps(biomedical, indent=2), encoding="utf-8")
    print("biomedical rows", len(biomedical))

    c.execute(
        """
        SELECT post_id, title, slug, body, image, created, date_of_added
        FROM caritasapp_csractivitys
        ORDER BY COALESCE(date_of_added, created) DESC
        """
    )
    csr_rows = []
    for row in c.fetchall():
        rel = row["image"]
        if rel:
            src = MEDIA_SRC / rel
            dst = MEDIA_DST / rel
            if src.exists() and not dst.exists():
                dst.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(src, dst)
        csr_rows.append(
            {
                "id": row["post_id"],
                "title": row["title"],
                "slug": row["slug"],
                "body": row["body"] or "",
                "image": f"/media/{rel}" if rel else None,
                "created": row["created"],
                "date_of_added": row["date_of_added"],
                "extraImages": [],
            }
        )

    c.execute(
        """
        SELECT e.image, c.slug
        FROM caritasapp_csrextraimages e
        JOIN caritasapp_csractivitys c ON c.post_id = e.csrPost_id
        """
    )
    extra_by_slug: dict[str, list[str]] = {}
    for row in c.fetchall():
        rel = row["image"]
        slug = row["slug"]
        if not rel or not slug:
            continue
        src = MEDIA_SRC / rel
        dst = MEDIA_DST / rel
        if src.exists() and not dst.exists():
            dst.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(src, dst)
        extra_by_slug.setdefault(slug, []).append(f"/media/{rel}")

    for item in csr_rows:
        item["extraImages"] = extra_by_slug.get(item["slug"], [])

    (OUT / "csr-activities.json").write_text(
        json.dumps(csr_rows, indent=2), encoding="utf-8"
    )
    print("csr activities", len(csr_rows))

    c.execute(
        """
        SELECT p.slug, i.image
        FROM caritasapp_postimage i
        JOIN caritasapp_post p ON p.post_id = i.post_id
        ORDER BY i.id
        """
    )
    post_images: dict[str, list[str]] = {}
    for row in c.fetchall():
        rel = row["image"]
        slug = row["slug"]
        if not rel or not slug:
            continue
        src = MEDIA_SRC / rel
        dst = MEDIA_DST / rel
        if src.exists() and not dst.exists():
            dst.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(src, dst)
        post_images.setdefault(slug, []).append(f"/media/{rel}")

    (OUT / "post-images.json").write_text(
        json.dumps(post_images, indent=2), encoding="utf-8"
    )
    print("post gallery slugs", len(post_images))

    c.execute(
        """
        SELECT id, image, title, description, created_at
        FROM caritasapp_sliderimage
        ORDER BY created_at DESC
        """
    )
    desktop = [dict(r) for r in c.fetchall()]
    c.execute(
        """
        SELECT id, image, title, description, created_at
        FROM caritasapp_mobilesliderimage
        ORDER BY created_at DESC
        """
    )
    mobile = [dict(r) for r in c.fetchall()]

    hero_slides = []
    for i, d in enumerate(desktop):
        m = mobile[i] if i < len(mobile) else None
        rel_d = d["image"]
        rel_m = m["image"] if m else None
        for rel in (rel_d, rel_m):
            if not rel:
                continue
            src = MEDIA_SRC / rel
            dst = MEDIA_DST / rel
            if src.exists() and not dst.exists():
                dst.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(src, dst)

        variant = "image-only"
        if i == 1:
            variant = "donate"
        elif d.get("title"):
            variant = "content"

        hero_slides.append(
            {
                "id": str(d["id"]),
                "desktopSrc": f"/media/{rel_d}" if rel_d else "",
                "mobileSrc": f"/media/{rel_m}" if rel_m else None,
                "title": d.get("title") or "",
                "description": d.get("description") or "",
                "variant": variant,
            }
        )
    (OUT / "hero-slides.json").write_text(
        json.dumps(hero_slides, indent=2), encoding="utf-8"
    )
    print("hero slides", len(hero_slides))

    conn.close()


if __name__ == "__main__":
    main()
