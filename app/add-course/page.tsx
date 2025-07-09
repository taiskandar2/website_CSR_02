"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Quiz {
  question: string;
  options: string[];
  answer: number;
  marks: number;
}

export default function AddCoursePage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [quiz, setQuiz] = useState<Quiz>({ question: '', options: ['', '', ''], answer: 0, marks: 1 });
  const [passingMark, setPassingMark] = useState(1);
  const [isPaid, setIsPaid] = useState(false);
  const router = useRouter();

  const handleQuizChange = (field: keyof Quiz, value: any) => {
    setQuiz({ ...quiz, [field]: value });
  };

  const handleOptionChange = (idx: number, value: string) => {
    const newOptions = [...quiz.options];
    newOptions[idx] = value;
    setQuiz({ ...quiz, options: newOptions });
  };

  const addQuiz = () => {
    if (quiz.question && quiz.options.every(opt => opt) && quiz.marks > 0) {
      setQuizzes([...quizzes, quiz]);
      setQuiz({ question: '', options: ['', '', ''], answer: 0, marks: 1 });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const courses = JSON.parse(localStorage.getItem('courses') || '[]');
    const newCourse = {
      id: Date.now(),
      title,
      description,
      content,
      quizzes,
      passingMark,
      isPaid,
    };
    localStorage.setItem('courses', JSON.stringify([...courses, newCourse]));
    router.push('/courses');
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Add a New Course</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1 font-medium">Course Title</label>
          <input type="text" className="w-full border rounded px-3 py-2" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea className="w-full border rounded px-3 py-2" value={description} onChange={e => setDescription(e.target.value)} required />
        </div>
        <div>
          <label className="block mb-1 font-medium">Course Content</label>
          <textarea className="w-full border rounded px-3 py-2" value={content} onChange={e => setContent(e.target.value)} required />
        </div>
        <div>
          <label className="block mb-1 font-medium">Passing Mark</label>
          <input type="number" className="w-full border rounded px-3 py-2" value={passingMark} min={1} onChange={e => setPassingMark(Number(e.target.value))} required />
        </div>
        <div>
          <label className="block mb-1 font-medium">Course Type</label>
          <select className="w-full border rounded px-3 py-2" value={isPaid ? 'paid' : 'free'} onChange={e => setIsPaid(e.target.value === 'paid')}>
            <option value="free">Free</option>
            <option value="paid">Paid</option>
          </select>
        </div>
        <div className="border p-4 rounded bg-gray-50">
          <div className="font-semibold mb-2">Add Quiz</div>
          <input type="text" className="w-full border rounded px-3 py-2 mb-2" placeholder="Quiz Question" value={quiz.question} onChange={e => handleQuizChange('question', e.target.value)} />
          {quiz.options.map((opt, idx) => (
            <input key={idx} type="text" className="w-full border rounded px-3 py-2 mb-2" placeholder={`Option ${idx + 1}`} value={opt} onChange={e => handleOptionChange(idx, e.target.value)} />
          ))}
          <div className="mb-2">
            <label className="mr-2">Correct Option:</label>
            <select value={quiz.answer} onChange={e => handleQuizChange('answer', Number(e.target.value))}>
              {quiz.options.map((_, idx) => (
                <option key={idx} value={idx}>{`Option ${idx + 1}`}</option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label className="mr-2">Marks:</label>
            <input type="number" min={1} value={quiz.marks} onChange={e => handleQuizChange('marks', Number(e.target.value))} className="border rounded px-2 py-1 w-20" />
          </div>
          <button type="button" onClick={addQuiz} className="px-4 py-1 bg-blue-500 text-white rounded">Add Quiz</button>
          <div className="mt-2">
            {quizzes.length > 0 && <div className="font-medium mb-1">Quizzes Added:</div>}
            <ul className="list-disc ml-5">
              {quizzes.map((q, i) => (
                <li key={i}>{q.question} ({q.marks} marks)</li>
              ))}
            </ul>
          </div>
        </div>
        <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">Create Course</button>
      </form>
    </div>
  );
}
