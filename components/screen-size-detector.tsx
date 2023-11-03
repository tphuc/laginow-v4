
'use client';

import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect'

interface ScreenSizeDetectorProps {
  onMobileScreen: () => void;
}

const ScreenSizeDetector: React.FC<ScreenSizeDetectorProps> = ({ onMobileScreen }) => {
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  const handleWindowSizeChange = () => {
    if (typeof window !== 'undefined')
      setIsMobileScreen(window?.innerWidth <= 768);
    else {
      setIsMobileScreen(isMobile)
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check if window is defined (client-side)
      window.addEventListener('resize', handleWindowSizeChange);
      window.addEventListener('load', handleWindowSizeChange);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleWindowSizeChange);
        window.removeEventListener('load', handleWindowSizeChange);
      }
    };
  }, []);

  useEffect(() => {
    if (isMobileScreen) {
      onMobileScreen();
    }
  }, [isMobileScreen]);

  return null;
};

export default ScreenSizeDetector;
