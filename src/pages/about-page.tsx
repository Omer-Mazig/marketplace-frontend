import api from "@/lib/api";
import { useState } from "react";

export default function AboutPage() {
  const [file, setFile] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    try {
      const result = await uploadFile(file);
      setUploadResult(result); // URL or uploaded file details
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload the file.");
    }
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post("/uploads/file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data; // Cloudinary URL or file details
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  };

  return (
    <div>
      <h2>Upload a File</h2>
      <input
        type="file"
        onChange={handleFileChange}
      />
      <button onClick={handleUpload}>Upload</button>
      {uploadResult && (
        <div>
          <h3>Upload Result:</h3>
          <p>{uploadResult.path}</p>
          <img
            src={uploadResult.path}
            alt="Uploaded File"
            style={{ maxWidth: "100%" }}
          />
        </div>
      )}
    </div>
  );
}
