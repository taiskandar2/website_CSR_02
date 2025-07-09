"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaLock } from 'react-icons/fa';

interface Course {
  id: number;
  title: string;
  description: string;
  isPaid?: boolean;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('courses') || '[]');
    setCourses(stored);
    const u = localStorage.getItem('user');
    setUser(u ? JSON.parse(u) : null);
  }, []);

  const isAuthenticated = user && (user.username || user.isGuest);

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Available Courses</h2>
      <div className="mb-4">
        {user && user.isAdmin ? (
          <Link href="/add-course" className="text-blue-600 hover:underline">+ Add New Course</Link>
        ) : (
          <span className="text-gray-400 cursor-not-allowed">+ Add New Course (Admin only)</span>
        )}
      </div>
      <ul className="space-y-4">
        {courses.length === 0 && <li className="text-gray-500">No courses available.</li>}
        {courses.map((course) => (
          <li key={course.id} className="border p-4 rounded shadow flex justify-between items-center">
            <div className="flex items-center gap-2">
              {isAuthenticated ? (
                <Link href={`/courses/${course.id}`} className="text-lg font-semibold hover:underline">{course.title}</Link>
              ) : (
                <span className="text-lg font-semibold text-gray-400 flex items-center gap-1"><FaLock /> {course.title}</span>
              )}
              <div className="text-sm text-gray-500">{course.description}</div>
            </div>
            {course.isPaid && <span className="ml-4 px-2 py-1 bg-yellow-200 text-yellow-800 rounded text-xs">Paid</span>}
            {!course.isPaid && <span className="ml-4 px-2 py-1 bg-green-200 text-green-800 rounded text-xs">Free</span>}
          </li>
        ))}
      </ul>
      {!isAuthenticated && (
        <div className="mt-6 text-center text-red-600">Sign in, sign up, or join as guest to access courses.</div>
      )}
    </div>
  );
}
