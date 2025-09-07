// Suppress hydration warnings for browser extension attributes
(function() {
  const originalError = console.error;
  console.error = function(...args) {
    const message = args[0];
    if (
      typeof message === 'string' &&
      (message.includes('data-new-gr-c-s-check-loaded') ||
       message.includes('data-gr-ext-installed') ||
       message.includes('data-gr-aaa-loaded') ||
       message.includes('Extra attributes from the server'))
    ) {
      return; // Suppress these specific warnings
    }
    originalError.apply(console, args);
  };
})();
