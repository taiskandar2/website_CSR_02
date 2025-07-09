"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const [givenName, setGivenName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find((u: any) => u.username === username)) {
      setError('Username already exists.');
      return;
    }
    users.push({ givenName, username, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('user', JSON.stringify({ username, isAdmin: false }));
    router.push('/courses');
  };

  return (
    <div className="max-w-sm mx-auto py-12">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form className="space-y-4" onSubmit={handleSignUp}>
        <input type="text" className="w-full border rounded px-3 py-2" placeholder="Given Name" value={givenName} onChange={e => setGivenName(e.target.value)} required />
        <input type="text" className="w-full border rounded px-3 py-2" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
        <input type="email" className="w-full border rounded px-3 py-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" className="w-full border rounded px-3 py-2" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <input type="password" className="w-full border rounded px-3 py-2" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
        <button type="submit" className="w-full px-4 py-2 bg-green-600 text-white rounded">Sign Up</button>
        {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
      </form>
    </div>
  );
}
