import Link from 'next/link';

export default function ThankYouPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8">
      <h1 className="text-4xl font-bold mb-4 text-green-700">Thank You!</h1>
      <p className="mb-6 text-lg text-gray-700">We appreciate your support and donation. Your contribution helps us keep this educational platform running and growing.</p>
      <Link href="/" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Back to Home</Link>
    </div>
  );
}
