import { uploadFile, UploadResult } from "@/services/uploads.service";
import { useState } from "react";

export default function AboutPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null);

  function handleFileChange(ev: React.ChangeEvent<HTMLInputElement>) {
    if (!ev.target.files) return;
    console.log(ev.target.files[0]);
    setFile(ev.target.files[0]);
  }

  async function handleUpload() {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    try {
      const result = await uploadFile(file);
      console.log(result);

      setUploadResult(result); // URL or uploaded file details
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload the file.");
    }
  }

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
