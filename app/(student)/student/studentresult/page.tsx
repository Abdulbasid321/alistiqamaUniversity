"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StudentResultPage() {
  // Mocked result data
  const [student] = useState({
    name: "John Doe",
    class: "SS3 Science",
    subject: "Mathematics",
    result: {
      score: 85,
      grade: "A",
      remarks: "Excellent Performance!",
      uploadedAt: "2025-03-25",
    },
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Student Result</h1>

      {/* Result Card */}
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Student Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg"><span className="font-semibold">Name:</span> {student.name}</p>
          <p className="text-lg"><span className="font-semibold">Class:</span> {student.class}</p>
          <p className="text-lg"><span className="font-semibold">Subject:</span> {student.subject}</p>
        </CardContent>
      </Card>

      {/* Result Section */}
      <Card className="w-full max-w-lg mt-6">
        <CardHeader>
          <CardTitle>Uploaded Result</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg"><span className="font-semibold">Score:</span> {student.result.score}%</p>
          <p className="text-lg"><span className="font-semibold">Grade:</span> {student.result.grade}</p>
          <p className="text-lg"><span className="font-semibold">Remarks:</span> {student.result.remarks}</p>
          <p className="text-sm text-gray-500 mt-2">Uploaded on: {student.result.uploadedAt}</p>
        </CardContent>
      </Card>
    </div>
  );
}
