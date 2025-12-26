import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import path from "path";
import type { UploadApiResponse, UploadApiErrorResponse } from "cloudinary";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "menu",
            resource_type: "image",

            // image optimazation settings
            format: "webp",
            quality: "auto:eco",
            fetch_format: "auto",

            transformation: [
              {
                width: 1200,
                height: 1200,
                crop: "limit", // keeps aspect ratio
              },
            ],

            strip_metadata: true,
          },
          (error?: UploadApiErrorResponse, result?: UploadApiResponse) => {
            if (error) {
              reject(error);
              return;
            }
            if (!result) {
              reject(new Error("Upload failed: no result"));
              return;
            }
            resolve(result);
          }
        )
        .end(buffer);
    });

    return NextResponse.json({
      imageUrl: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
  }
  // const data = await req.formData();
  // const file = data.get("file") as File;
  // if (!file) {
  //   return NextResponse.json({ error: "No file" }, { status: 400 });
  // }
  // const bytes = await file.arrayBuffer();
  // const buffer = Buffer.from(bytes);
  // const filename = Date.now() + "-" + file.name;
  // const filepath = path.join(process.cwd(), "public/uploads", filename);
  // await writeFile(filepath, buffer);
  // return NextResponse.json({
  //   imageUrl: `/uploads/${filename}`,
  // });
}
