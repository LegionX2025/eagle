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
  const loadingIndicator = document.querySelector('.loading');

  resultsContainer.innerHTML = '';
  loadingIndicator.classList.remove('d-none');

  try {
    const response = await fetch(
      `/api/search?query=${encodeURIComponent(query)}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Fetched Data:', data); // Debugging

    loadingIndicator.classList.add('d-none');
    if (data.length) {
      data.forEach((item) => {
        const resultCard = document.createElement('div');
        resultCard.className = 'result-card';
        resultCard.innerHTML = `
          <h5>${item.web_info?.title || 'No Title'}</h5>
          <p>${item.web_info?.description || 'No Description'}</p>
          <a href="${item.web_info?.url || '#'}" target="_blank">${
          item.web_info?.url || 'No URL'
        }</a>
          <p><strong>BTC Wallets:</strong> ${
            item.financial_entity?.btc_wallets?.join(', ') || 'None'
          }</p>
          <p><strong>ETH Wallets:</strong> ${
            item.financial_entity?.eth_wallets?.join(', ') || 'None'
          }</p>
          <p><strong>Emails:</strong> ${
            item.person_entity?.emails?.join(', ') || 'None'
          }</p>
          <p><strong>Usernames:</strong> ${
            item.person_entity?.usernames?.join(', ') || 'None'
          }</p>
          <p><strong>Phone Numbers:</strong> ${
            item.person_entity?.phone_number?.join(', ') || 'None'
          }</p>
        `;
        resultsContainer.appendChild(resultCard);
      });
    } else {
      resultsContainer.innerHTML =
        '<p class="text-center text-muted">No results found.</p>';
    }
  } catch (error) {
    console.error('Error fetching search results:', error);
    loadingIndicator.classList.add('d-none');
    resultsContainer.innerHTML =
      '<p class="text-center text-danger">An error occurred while searching.</p>';
  }
});
