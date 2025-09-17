import fs from "fs";
import path from "path";
import sharp from "sharp";

const UPLOAD_DIR = path.join(process.cwd(), "public/uploads");

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

export async function saveImage(file: File, articleTitle: string, addWatermark: boolean = true): Promise<string> {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const cleanTitle = articleTitle.replace(/[^a-zA-Z0-9-]/g, "_").toLowerCase();
    const uniqueFilename = `${cleanTitle}${path.extname(file.name)}`;
    const filePath = path.join(UPLOAD_DIR, uniqueFilename);

    if (addWatermark) {
      // Process image with watermark
      const image = sharp(buffer);
      const metadata = await image.metadata();

      // Create watermark text as SVG
      const watermarkText = "koransidak.co.id";
      const watermarkSvg = Buffer.from(`
        <svg width="${metadata.width}" height="${metadata.height}">
          <style>
            .watermark { 
              fill: rgba(255, 255, 255, 0.5); 
              font-size: 20px; 
              font-weight: bold; 
              font-family: Arial, sans-serif;
            }
          </style>
          <text 
            x="${metadata.width! - 20}" 
            y="${metadata.height! - 20}" 
            text-anchor="end" 
            class="watermark"
          >${watermarkText}</text>
        </svg>
      `);

      // Apply watermark and save
      await image
        .composite([
          {
            input: watermarkSvg,
            gravity: "southeast",
          },
        ])
        .toFile(filePath);
    } else {
      // Save file without watermark
      fs.writeFileSync(filePath, buffer);
    }

    // Return relative path for database storage
    return `/uploads/${uniqueFilename}`;
  } catch (error) {
    console.error("Error saving image:", error);
    throw new Error("Failed to save image");
  }
}

export function deleteImage(imageUrl: string): void {
  try {
    if (!imageUrl) return;

    // Extract filename from URL and construct full path
    const filename = imageUrl.split("/").pop();
    if (!filename) return;

    const filePath = path.join(UPLOAD_DIR, filename);

    // Check if file exists before deleting
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error("Error deleting image:", error);
    throw new Error("Failed to delete image");
  }
}
