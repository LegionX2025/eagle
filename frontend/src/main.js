const API_URL = import.meta.env.VITE_API_URL; // Backend API base URL

// Handle Signup Form Submission
document.getElementById('signup-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const responseMessage = document.getElementById('response-message');

  document
    .getElementById('searchForm')
    .addEventListener('submit', async (e) => {
      e.preventDefault();

      const query = document.getElementById('query').value;
      const resultsDiv = document.getElementById('results');
      resultsDiv.innerHTML = '<p>Loading...</p>';

      try {
        const response = await fetch(
          `/api/search?query=${encodeURIComponent(query)}`
        );
        const results = await response.json();

        if (results.length === 0) {
          resultsDiv.innerHTML = '<p>No results found.</p>';
          return;
        }

        resultsDiv.innerHTML = results
          .map(
            (result) => `
        <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">${result.web_info.title || 'No Title'}</h5>
            <p class="card-text">${
              result.web_info.description || 'No Description'
            }</p>
            <a href="${
              result.web_info.url
            }" target="_blank" class="card-link">Visit</a>
          </div>
        </div>
      `
          )
          .join('');
      } catch (error) {
        resultsDiv.innerHTML = `<p class="text-danger">Error: ${error.message}</p>`;
      }
    });

  if (!name || !email) {
    responseMessage.innerText = 'Please provide valid name and email.';
    responseMessage.classList.add('text-red-500');
    responseMessage.classList.remove('text-green-500');
    return;
  }

  try {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    });

    if (response.ok) {
      responseMessage.innerText = 'Signup successful!';
      responseMessage.classList.add('text-green-500');
      responseMessage.classList.remove('text-red-500');
    } else {
      responseMessage.innerText =
        'Something went wrong. Please try again later.';
      responseMessage.classList.add('text-red-500');
      responseMessage.classList.remove('text-green-500');
    }
  } catch (error) {
    console.error('Signup error:', error);
    responseMessage.innerText = 'Network error. Please try again.';
    responseMessage.classList.add('text-red-500');
  }

  document.getElementById('signup-form').reset(); // Reset the form fields
});
