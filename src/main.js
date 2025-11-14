const iframe = document.getElementById('integrationFrame');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const appSelector = document.getElementById('appSelector');
const refreshButton = document.getElementById('refreshButton');

// Function to update iframe src based on app id
function refreshIframe() {
  const appId = appSelector.value;
  const newSrc = `http://localhost:3000/integrationLayer/${appId}/new`;
  
  // Show loading state
  loading.style.display = 'block';
  error.style.display = 'none';
  
  // Update iframe src
  iframe.src = newSrc;
  
  console.log(`Refreshing iframe with app ID: ${appId}`);
}

// Handle refresh button click
refreshButton.addEventListener('click', refreshIframe);

// Handle iframe load
iframe.addEventListener('load', () => {
  console.log('Iframe loaded successfully');
  loading.style.display = 'none';
  error.style.display = 'none';
});

// Handle iframe load error
iframe.addEventListener('error', (e) => {
  console.error('Iframe failed to load:', e);
  loading.style.display = 'none';
  error.style.display = 'block';
  error.textContent = 'Failed to load integration layer. Please check if the server is running at http://localhost:3000';
});

// Handle timeout (optional - if iframe takes too long)
let loadTimeout = setTimeout(() => {
  if (loading.style.display !== 'none') {
    console.warn('Iframe load timeout - still loading after 10 seconds');
  }
}, 10000);

iframe.addEventListener('load', () => {
  clearTimeout(loadTimeout);
});

// Log iframe messages (for debugging)
window.addEventListener('message', (event) => {
  // Only log messages from the iframe origin for security
  if (event.origin === 'http://localhost:3000') {
    console.log('Message received from iframe:', event.data);
  }
});

