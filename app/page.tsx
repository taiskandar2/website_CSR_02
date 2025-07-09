"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen py-8 overflow-hidden">
      <img
        src="/students-bg.jpg"
        alt="Students learning background"
        className="fixed top-0 left-0 w-screen h-screen object-cover object-center opacity-30 -z-10"
        style={{ pointerEvents: "none" }}
      />
      <h1 className="text-4xl font-bold mb-4 z-10">Welcome to Edu Website</h1>
      <p className="mb-8 text-lg text-gray-600 z-10">
        A modern educational platform for interactive learning.
      </p>
      <div className="flex gap-4 mb-8 z-10">
        <Link
          href="/courses"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          View Courses
        </Link>
        <Link
          href="/add-course"
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add Course
        </Link>
      </div>
      <a
        href="https://www.paypal.com/donate?business=YOUR_PAYPAL_EMAIL&currency_code=USD&return=https://localhost:3000/thank-you"
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 z-10"
      >
        Donate via PayPal
      </a>
    </div>
  );
}
