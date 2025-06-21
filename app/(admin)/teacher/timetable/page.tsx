"use client";

import { useState } from "react";
import { CloudUpload, Loader2 } from "lucide-react";

export default function UploadTimetablePage() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a timetable image.");
      return;
    }

    const formData = new FormData();
    formData.append("images", file); // NOT "results"


    setUploading(true);
    setMessage("");

    try {
      const res = await fetch("https://istiqamauni-1.onrender.com/upload-timetable", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(`❌ Upload failed: ${data.error}`);
      } else {
        setMessage("✅ Timetable uploaded successfully.");
        setFile(null);
      }
    } catch (err) {
      setMessage("❌ Network error.");
    }

    setUploading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-8 space-y-6 text-center">
        <h1 className="text-3xl font-bold text-blue-700">
          🗂 Upload New Timetable
        </h1>

        <label
          htmlFor="file-upload"
          className="cursor-pointer flex flex-col items-center justify-center p-10 border-4 border-dashed border-blue-300 rounded-xl hover:bg-blue-50 transition"
        >
          <CloudUpload className="w-16 h-16 text-blue-500 mb-2" />
          <p className="text-gray-600">
            Click or drag & drop timetable image here
          </p>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setFile(e.target.files[0]);
              }
            }}
          />
        </label>

        {file && (
          <div className="text-sm text-gray-600">
            Selected: <strong>{file.name}</strong>
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={uploading}
          className={`w-full py-3 rounded-lg font-semibold text-white text-lg ${
            uploading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {uploading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" /> Uploading...
            </span>
          ) : (
            "Upload Timetable"
          )}
        </button>

        {message && (
          <p className="text-sm mt-2 text-blue-600">{message}</p>
        )}
      </div>
    </div>
  );
}
