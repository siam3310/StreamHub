import { useEffect } from 'react';

const AdBlocker = () => {
  useEffect(() => {
    // Dynamically load the Adblocker JS script from CDN
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/adblocker-js@1.0.0/dist/adblocker.min.js';
    script.async = true;

    script.onload = () => {
      // Initialize the ad blocker once the script is loaded
      const adBlocker = new window.Adblocker();
      adBlocker.blockAds();
      console.log('Ad blocker activated!');
    };

    script.onerror = () => {
      console.error('Failed to load the ad blocker script.');
    };

    // Append the script to the document head
    document.head.appendChild(script);

    // Clean up the script when the component is unmounted
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;  // No UI needed for this functionality
};

export default AdBlocker;
