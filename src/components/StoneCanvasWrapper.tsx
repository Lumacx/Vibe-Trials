
'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const CanvasScene = dynamic(() => import('./CanvasScene'), { ssr: false });

export default function StoneCanvasWrapper(props: any) {
  return <CanvasScene {...props} />;
}
