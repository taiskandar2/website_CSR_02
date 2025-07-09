"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Admin login
    if (username === 'taiskandar2' && password === 'uoc414') {
      localStorage.setItem('user', JSON.stringify({ username, isAdmin: true }));
      router.push('/add-course');
      return;
    }
    // Normal user login
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem('user', JSON.stringify({ username, isAdmin: false }));
      router.push('/courses');
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="max-w-sm mx-auto py-12">
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>
      <form className="space-y-4" onSubmit={handleSignIn}>
        <input type="text" className="w-full border rounded px-3 py-2" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
        <input type="password" className="w-full border rounded px-3 py-2" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded">Sign In</button>
        {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
      </form>
      <div className="mt-6 flex flex-col gap-2">
        <button onClick={() => router.push('/guest')} className="w-full px-4 py-2 bg-gray-500 text-white rounded">Join as Guest</button>
        <button onClick={() => router.push('/signup')} className="w-full px-4 py-2 bg-green-600 text-white rounded">Sign Up</button>
      </div>
    </div>
  );
}
