"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function GuestPage() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) {
      setError('Username is required.');
      return;
    }
    localStorage.setItem('user', JSON.stringify({ username, isGuest: true, isAdmin: false }));
    router.push('/courses');
  };

  return (
    <div className="max-w-sm mx-auto py-12">
      <h2 className="text-2xl font-bold mb-4">Join as Guest</h2>
      <form className="space-y-4" onSubmit={handleGuest}>
        <input type="text" className="w-full border rounded px-3 py-2" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
        <button type="submit" className="w-full px-4 py-2 bg-gray-600 text-white rounded">Join as Guest</button>
        {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
      </form>
    </div>
  );
}
