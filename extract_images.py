import fitz
import os
import sys

pdf_path = sys.argv[1]
output_dir = sys.argv[2]
os.makedirs(output_dir, exist_ok=True)

doc = fitz.open(pdf_path)
for i in range(len(doc)):
    page = doc[i]
    images = page.get_images()
    for j, img in enumerate(images):
        xref = img[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        with open(f"{output_dir}/slide_{i+1}_img_{j+1}.{image_ext}", "wb") as f:
            f.write(image_bytes)
    
print(f"Extracted images from {len(doc)} pages.")
