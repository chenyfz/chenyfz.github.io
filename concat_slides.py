import os

with open("/tmp/pdf_slides/slides_summary.txt", "w") as out:
    for i in range(1, 47):
        try:
            with open(f"/tmp/pdf_slides/page_{i}.txt", "r") as f:
                text = f.read().strip()
                out.write(f"--- Slide {i} ---\n{text}\n\n")
        except:
            pass
