"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

const paymentOptions = [
  { name: 'Online Banking', url: '#' },
  { name: 'Touch n Go (Malaysia)', url: '#' },
  { name: 'PayPal', url: '#' },
];

export default function CourseDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<any>(null);
  const [userName, setUserName] = useState('');
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    const courses = JSON.parse(localStorage.getItem('courses') || '[]');
    const found = courses.find((c: any) => String(c.id) === String(id));
    setCourse(found);
    setUserAnswers(found ? Array(found.quizzes.length).fill(null) : []);
    // Check if payment was made for this course
    const paidCourses = JSON.parse(localStorage.getItem('paidCourses') || '[]');
    setPaid(paidCourses.includes(String(id)) || !found?.isPaid);
  }, [id]);

  if (!course) return <div className="max-w-2xl mx-auto py-8">Course not found.</div>;

  const handleOptionChange = (quizIdx: number, optionIdx: number) => {
    const updated = [...userAnswers];
    updated[quizIdx] = optionIdx;
    setUserAnswers(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let total = 0;
    course.quizzes.forEach((quiz: any, idx: number) => {
      if (userAnswers[idx] === quiz.answer) {
        total += quiz.marks;
      }
    });
    setScore(total);
    setSubmitted(true);
    if (total >= course.passingMark) {
      localStorage.setItem('certificate', JSON.stringify({
        name: userName,
        courseTitle: course.title,
        score: total,
        total: course.quizzes.reduce((a: number, q: any) => a + q.marks, 0)
      }));
    }
  };

  const handlePayment = (method: string) => {
    // Simulate payment success
    const paidCourses = JSON.parse(localStorage.getItem('paidCourses') || '[]');
    localStorage.setItem('paidCourses', JSON.stringify([...new Set([...paidCourses, String(id)])]));
    setPaid(true);
  };

  if (course.isPaid && !paid) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">This is a paid course</h2>
        <p className="mb-6">Please complete payment to access the course content and quizzes.</p>
        <div className="flex flex-col gap-4 items-center">
          {paymentOptions.map(opt => (
            <button key={opt.name} onClick={() => handlePayment(opt.name)} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-64">
              Pay with {opt.name}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
      <p className="mb-4 text-gray-600">{course.description}</p>
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Course Content</h3>
        <div className="bg-gray-100 p-4 rounded">{course.content}</div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <h3 className="font-semibold mb-2">Quizzes</h3>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Your Name</label>
          <input type="text" className="w-full border rounded px-3 py-2" value={userName} onChange={e => setUserName(e.target.value)} required disabled={submitted} />
        </div>
        {course.quizzes.map((quiz: any, idx: number) => (
          <div key={quiz.question} className="border p-4 rounded">
            <div className="mb-2 font-medium">{quiz.question}</div>
            <div className="space-y-1">
              {quiz.options.map((opt: string, oidx: number) => (
                <label key={oidx} className="block">
                  <input
                    type="radio"
                    name={`quiz-${idx}`}
                    value={oidx}
                    checked={userAnswers[idx] === oidx}
                    onChange={() => handleOptionChange(idx, oidx)}
                    disabled={submitted}
                  />{' '}
                  {opt}
                </label>
              ))}
            </div>
            <div className="text-xs text-gray-500 mt-1">Marks: {quiz.marks}</div>
          </div>
        ))}
        {!submitted && (
          <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Submit Answers</button>
        )}
      </form>
      {submitted && (
        <div className="mt-6 p-4 bg-green-100 rounded">
          <div className="font-semibold">Your Score: {score} / {course.quizzes.reduce((a: number, q: any) => a + q.marks, 0)}</div>
          {score >= course.passingMark ? (
            <div className="text-green-700 mt-2">Congratulations! You passed. <Link href="/certificate" className="underline text-blue-700">View Certificate</Link></div>
          ) : (
            <div className="text-red-700 mt-2">You did not reach the passing mark. Try again!</div>
          )}
        </div>
      )}
    </div>
  );
}
