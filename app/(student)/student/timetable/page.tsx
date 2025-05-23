"use client";

import { useEffect, useState } from "react";

export default function TimetablePage() {
  const [fileUrl, setFileUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://istiqamauni-1.onrender.com/latest-timetable")
      .then((res) => res.json())
      .then((data) => {
        if (data?.timetable?.fileUrl) {
          setFileUrl(data.timetable.fileUrl);
        }
      })
      .catch(() => {
        setFileUrl("");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-6 md:p-10 text-center">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">🗓️ Current Timetable</h1>
        {loading ? (
          <p className="text-gray-500">Loading timetable...</p>
        ) : fileUrl ? (
          <img
            src={fileUrl}
            alt="Student Timetable"
            className="w-full h-auto rounded-xl border border-gray-200 shadow-sm transition hover:scale-105 duration-500"
          />
        ) : (
          <p className="text-red-500 font-medium">No timetable available right now.</p>
        )}
      </div>
    </div>
  );
}
