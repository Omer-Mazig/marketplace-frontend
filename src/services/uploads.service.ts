import api from "@/lib/api";

type FileType = "image";
type MimeType = "image/gif" | "image/jpeg" | "image/jpg" | "image/png";

export type UploadResult = {
  id: number;
  type: FileType;
  name: string;
  path: string;
  mime: MimeType;
  size: number;
  createDate: Date;
  updateDate: Date;
};

export async function uploadFile(file: File): Promise<UploadResult> {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await api.post<UploadResult>("/uploads/file", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data; // Cloudinary URL or file details
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}
