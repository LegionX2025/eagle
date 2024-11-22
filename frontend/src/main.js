const API_URL = import.meta.env.VITE_API_URL; // Backend API base URL

// Handle Signup Form Submission
document.getElementById('signup-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const responseMessage = document.getElementById('response-message');

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

document.getElementById('search-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = document.getElementById('search-query').value.trim();
  const resultsContainer = document.getElementById('results-container');

  resultsContainer.innerHTML = 'Loading...';

  try {
    const response = await fetch(
      `${API_URL}/search?query=${encodeURIComponent(query)}`
    );
    const results = await response.json();

    if (results.length) {
      resultsContainer.innerHTML = results
        .map(
          (item) => `
          <div class="result-card">
            <h3>${item.web_info.title || 'No Title'}</h3>
            <p>${item.web_info.description || 'No Description'}</p>
            <a href="${item.web_info.url}" target="_blank">${
            item.web_info.url
          }</a>
          </div>
        `
        )
        .join('');
    } else {
      resultsContainer.innerHTML = '<p>No results found.</p>';
    }
  } catch (error) {
    console.error(error);
    resultsContainer.innerHTML = '<p>Error loading results.</p>';
  }
});
