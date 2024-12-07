import { useEffect } from 'react';

// Patterns to block ads and suspicious elements
const blockPatterns = {
  ids: ['dontfoid', 'ad-container', 'popup-ad'], // Specific IDs to block
  styles: [
    'top: -1000px',
    'visibility: hidden',
    'display: none',
    'position: fixed',
    'z-index: 2147483647', // Overlay ads
  ],
  tags: [
    'iframe[width="0"][height="0"]',
    'iframe[style*="visibility: hidden"]',
    'iframe[style*="top: -1000px"]',
    'a[href*="journaleco.ma"]', // Example ad-related links
    'a[style*="position: fixed"][style*="z-index: 2147483647"]', // Overlay ad links
  ],
};

// Function to remove unwanted elements dynamically
const removeSuspiciousElements = (): void => {
  // Remove elements by ID
  blockPatterns.ids.forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      console.log('Removing element by ID:', element);
      element.remove();
    }
  });

  // Remove elements with specific styles
  const elements = document.querySelectorAll<HTMLElement>('*');
  elements.forEach((element) => {
    const style = element.getAttribute('style') || '';
    if (blockPatterns.styles.some((pattern) => style.includes(pattern))) {
      console.log('Removing element by style:', element);
      element.remove();
    }
  });

  // Remove specific tags
  blockPatterns.tags.forEach((tag) => {
    const taggedElements = document.querySelectorAll(tag);
    taggedElements.forEach((element) => {
      console.log('Removing element by tag:', element);
      element.remove();
    });
  });
};

// Network request interception to block suspicious requests
const interceptRequests = (): void => {
  const originalFetch = window.fetch;
  window.fetch = async (...args: [RequestInfo, RequestInit]) => {
    const url = args[0];
    if (
      typeof url === 'string' &&
      blockPatterns.tags.some((pattern) => url.includes(pattern))
    ) {
      console.log('Blocked request to:', url);
      return new Response(null, { status: 204 });
    }
    return originalFetch(...args);
  };

  const originalXhrOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (...args: [string, string, boolean?]) {
    const url = args[1];
    if (
      typeof url === 'string' &&
      blockPatterns.tags.some((pattern) => url.includes(pattern))
    ) {
      console.log('Blocked request to:', url);
      this.abort();
    } else {
      originalXhrOpen.apply(this, args);
    }
  };
};

// AdBlocker Component
const AdBlocker: React.FC = () => {
  useEffect(() => {
    // Intercept network requests
    interceptRequests();

    // Run cleanup initially
    removeSuspiciousElements();

    // Set interval to run every 3 seconds
    const interval = setInterval(removeSuspiciousElements, 3000);

    // Cleanup on unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  return null; // No UI component
};

export default AdBlocker;
