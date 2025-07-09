"use client";
import { useEffect, useState } from 'react';

export default function CertificatePage() {
  const [cert, setCert] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem('certificate');
    if (data) setCert(JSON.parse(data));
  }, []);

  if (!cert) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-8">
        <h2 className="text-2xl font-bold mb-4">No Certificate Found</h2>
        <p className="text-gray-600">Complete a course and pass to receive your certificate.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8">
      <h2 className="text-3xl font-bold mb-4">Congratulations!</h2>
      <p className="mb-4 text-lg">You have passed the course and earned a certificate.</p>
      <div className="border-2 border-dashed border-blue-400 rounded-lg p-8 bg-white shadow text-center">
        <span className="block text-xl font-semibold mb-2">Certificate of Completion</span>
        <span className="block text-gray-700 mb-2">Awarded to: <span className="font-bold">{cert.name}</span></span>
        <span className="block text-gray-700 mb-2">Course: <span className="font-bold">{cert.courseTitle}</span></span>
        <span className="block text-gray-700">Score: <span className="font-bold">{cert.score} / {cert.total}</span></span>
      </div>
    </div>
  );
}
