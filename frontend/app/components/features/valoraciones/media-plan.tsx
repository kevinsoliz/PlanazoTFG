import React from 'react';

interface Props {
  notaMedia: number;
}

export default function MediaPlanBadge({ notaMedia }: Props) {
  return (
    <div className="bg-base-100 border border-base-300 px-2 py-1.5 rounded-xl flex flex-col items-center min-w-60px">
     
      <div className="flex items-center gap-1">
        <span className="text-lg font-bold text-base-content">
          {notaMedia ? notaMedia.toFixed(1) : "0.0"}
        </span>
        <span className="text-yellow-400 text-lg">★</span>
      </div>
    </div>
  );
}