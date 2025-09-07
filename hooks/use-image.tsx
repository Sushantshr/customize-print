'use client';

import { useEffect, useState } from 'react';

const useImage = (url: string): [HTMLImageElement | undefined, 'loading' | 'loaded' | 'failed'] => {
  const [image, setImage] = useState<HTMLImageElement>();
  const [status, setStatus] = useState<'loading' | 'loaded' | 'failed'>('loading');

  useEffect(() => {
    if (!url) return;
    
    const img = new window.Image();
    
    const onLoad = () => {
      setStatus('loaded');
      setImage(img);
    };
    
    const onError = () => {
      setStatus('failed');
    };
    
    img.addEventListener('load', onLoad);
    img.addEventListener('error', onError);
    img.src = url;
    
    return () => {
      img.removeEventListener('load', onLoad);
      img.removeEventListener('error', onError);
    };
  }, [url]);

  return [image, status];
};

export default useImage;