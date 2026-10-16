'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function ResultContent() {
  const router = useRouter();
  const [score, setScore] = useState<number | null>(null);
  
  useEffect(() => {
    const resultStr = sessionStorage.getItem('surveyResult');
    if (!resultStr) {
      router.replace('/');
      return;
    }
    
    try {
      const result = JSON.parse(resultStr);
      if (typeof result.score === 'number') {
        setScore(result.score);
      } else {
        router.replace('/');
      }
    } catch (e) {
      router.replace('/');
    }
  }, [router]);

  if (score === null) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  let grade = '';
  let message = '';
  let colorClass = '';
  let imageSrc = '';

  if (score >= 80) {
    grade = '골든 라이트';
    message = '노후준비가 전반적으로 매우 탄탄합니다.';
    colorClass = 'text-yellow-600';
    imageSrc = '/goldenlight.jpg';
  } else if (score >= 60) {
    grade = '실버 라이트';
    message = '노후준비가 전반적으로 안정적인 편입니다.';
    colorClass = 'text-gray-500';
    imageSrc = '/silverlight.jpg';
  } else if (score >= 40) {
    grade = '옐로 라이트';
    message = '일부 영역에 점검과 보완이 필요합니다.';
    colorClass = 'text-amber-500';
    imageSrc = '/yellowlight.jpg';
  } else {
    grade = '레드 라이트';
    message = '집중적인 점검과 지원이 필요합니다.';
    colorClass = 'text-red-600';
    imageSrc = '/redlight.jpg';
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 pb-24 relative">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 text-center space-y-6">
        <h1 className="text-4xl font-extrabold text-gray-900">진단 결과</h1>
        
        <div className="py-4">
          <div className="flex justify-center mb-6">
            <img src={imageSrc} alt={grade} className="w-36 h-36 object-contain" />
          </div>
          <div className={`text-6xl font-black mb-4 ${colorClass}`}>{score}점</div>
          <h2 className={`text-3xl font-bold mb-4 ${colorClass}`}>{grade}</h2>
          <p className="text-gray-800 text-xl font-medium leading-relaxed break-keep">{message}</p>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <Link 
            href="/"
            className="block w-full py-5 bg-blue-600 text-white rounded-2xl font-bold text-xl hover:bg-blue-700 transition-colors shadow-sm"
          >
            처음으로 돌아가기
          </Link>
        </div>
      </div>

      {/* 춘천미래동행재단 로고 */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <img src="/logo.png" alt="춘천미래동행재단" className="h-10 object-contain opacity-80" />
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ResultContent />
    </Suspense>
  );
}