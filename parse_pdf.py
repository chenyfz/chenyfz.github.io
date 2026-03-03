import fitz
import sys
import os

pdf_path = sys.argv[1]
output_dir = sys.argv[2]
os.makedirs(output_dir, exist_ok=True)

doc = fitz.open(pdf_path)
for i in range(len(doc)):
    page = doc[i]
    text = page.get_text()
    
    with open(f"{output_dir}/page_{i+1}.txt", "w") as f:
        f.write(text)
    
    pix = page.get_pixmap(dpi=150)
    pix.save(f"{output_dir}/page_{i+1}.png")

print(f"Extracted {len(doc)} pages.")
