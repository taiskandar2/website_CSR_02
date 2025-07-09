"use client";
import Link from 'next/link';

export default function Banner() {
  return (
    <div className="flex items-center gap-3">
      <Link href="/" className="cursor-pointer group" style={{ textDecoration: 'none' }}>
        <div className="border border-blue-400 rounded-lg shadow px-3 py-2 text-left transition-transform group-hover:scale-105"
          style={{ fontFamily: 'Georgia, serif', minWidth: 120, maxWidth: 180 }}>
          <span className="block text-base font-bold text-blue-700 leading-tight" style={{ fontFamily: 'Montserrat, Arial, sans-serif' }}>Edu Website</span>
          <span className="block text-xs text-gray-700 font-semibold mt-0.5">by Centre of</span>
          <span className="block text-xs text-gray-700 font-semibold">Biomedical Engineering (CBME)</span>
          <span className="block text-xs text-gray-700 font-semibold">University of Cyberjaya</span>
        </div>
      </Link>
      <img
        src="/CBME_logo.png"
        alt="CBME Logo"
        className="object-contain rounded bg-white border border-blue-200 shadow"
        style={{ minWidth: 93, minHeight: 93, height: 93, width: 93 }}
      />
    </div>
  );
}
