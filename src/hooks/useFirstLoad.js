'use client';

import { useEffect, useState } from 'react';

/**
 * Hook to detect if this is the first load of the app
 * Uses sessionStorage to track if animations have played
 */
export function useFirstLoad() {
  const [isFirstLoad, setIsFirstLoad] = useState(false);

  useEffect(() => {
    // Check if animations have already played in this session
    const hasPlayed = sessionStorage.getItem('animations-played');
    
    if (!hasPlayed) {
      setIsFirstLoad(true);
      // Mark that animations have played
      sessionStorage.setItem('animations-played', 'true');
    }
  }, []);

  return isFirstLoad;
}
