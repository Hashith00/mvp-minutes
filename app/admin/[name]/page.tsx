"use client";
import React, { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import AddBlogPostComponent from "@/app/admin/[name]/(components)/AddBlogPostComponent";
const AdminPage = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const sendEmail = async () => {
    try {
      const response = await fetch("/api/email", {
        method: "POST",
        body: JSON.stringify({
          sendTo: "hello@gmail.com",
          subject: "Test",
          body: "Test",
          firstName: "Hello",
        }),
      });
      toast({
        title: "Email sent",
        description: "Email has been sent to the user",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Error sending email",
        variant: "destructive",
      });
      console.error("Error sending email:", error);
    }
  };

  const uploadImage = async (file: File) => {
    try {
      setError(null);
      setUploading(true);

      // Check file size (2MB)
      if (file.size > 2 * 1024 * 1024) {
        throw new Error("File size exceeds 2MB limit");
      }

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to upload image");
      }

      setUploadedImageUrl(data.fileUrl);
      return data;
    } catch (err: any) {
      setError(err.message);
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadImage(file);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Image Upload</h1>

      <div className="space-y-4">
        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        {/* Upload button */}
        <button
          onClick={handleButtonClick}
          disabled={uploading}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md disabled:bg-gray-400"
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </button>

        {/* Error message */}
        {error && <div className="text-red-500 mt-2">{error}</div>}

        {/* Preview uploaded image */}
        {uploadedImageUrl && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Uploaded Image:</h2>
            <img
              src={uploadedImageUrl}
              alt="Uploaded"
              className="max-w-md rounded-lg shadow-md"
            />
          </div>
        )}
      </div>
      <div className="mt-4">
        <button onClick={sendEmail}>Send Email</button>
      </div>
      <AddBlogPostComponent />
    </div>
  );
};

export default AdminPage;
