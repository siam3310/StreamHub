import { useEffect } from 'react';

const AdBlocker = () => {
  useEffect(() => {
    const blockPatterns = {
      href: ['adsco.re', 'uzvcffe-aw.vip'],
      src: ['adsco.re', 'c.adsco.re'],
      styles: ['font-size: 5px', 'display: none', 'visibility: hidden', 'position: absolute', 'top: -1000px', 'left: -1000px',],
      iframes: ['iframeParent'], // Add iframe names to target specific ones
    };

    // Function to clean elements in a given document
    const cleanDocument = (doc) => {
      // Remove <a> tags
      doc.querySelectorAll('a').forEach((anchor) => {
        const href = anchor.getAttribute('href') || '';
        const style = anchor.getAttribute('style') || '';
        if (
          blockPatterns.href.some((pattern) => href.includes(pattern)) ||
          blockPatterns.styles.some((pattern) => style.includes(pattern))
        ) {
          anchor.remove();
        }
      });

      // Remove <script> tags
      doc.querySelectorAll('script').forEach((script) => {
        const src = script.getAttribute('src') || '';
        if (blockPatterns.src.some((pattern) => src.includes(pattern))) {
          script.remove();
        }
      });

      // Remove <iframe> tags
      doc.querySelectorAll('iframe').forEach((iframe) => {
        const name = iframe.getAttribute('name') || '';
        const style = iframe.getAttribute('style') || '';
        if (
          blockPatterns.iframes.includes(name) ||
          blockPatterns.styles.some((pattern) => style.includes(pattern)) ||
          iframe.width === '0' ||
          iframe.height === '0'
        ) {
          iframe.remove();
        } else {
          // Clean inside iframe
          try {
            cleanDocument(iframe.contentDocument || iframe.contentWindow.document);
          } catch (err) {
            console.error('Cannot access iframe content:', err);
          }
        }
      });
    };

    // Create a MutationObserver to observe DOM changes
    const observer = new MutationObserver(() => {
      cleanDocument(document);
    });

    // Configure the observer to watch for added nodes in the document
    observer.observe(document.body, {
      childList: true, // Watch for added/removed child elements
      subtree: true,   // Watch the entire document
    });

    // Run the blockAds function every 1 second as a fallback
    const intervalId = setInterval(() => {
      cleanDocument(document);
    }, 1000);

    console.log('Ad-blocking script running...');

    // Clean up when component is unmounted
    return () => {
      clearInterval(intervalId); // Clear the interval
      observer.disconnect(); // Disconnect the observer
    };
  }, []);

  return null; // This component does not render anything in the UI
};

export default AdBlocker;
