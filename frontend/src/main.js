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

// Handle Search Form Submission
document.getElementById('search-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const query = document.getElementById('query').value.trim();
  const responseMessage = document.getElementById('response-message');

  if (!query) {
    responseMessage.innerHTML =
      '<p class="text-red-500">Please enter a valid search query.</p>';
    return;
  }

  try {
    const response = await fetch(
      `${API_URL}/search?query=${encodeURIComponent(query)}`
    );
    const data = await response.json();

    if (response.ok && data.length) {
      responseMessage.innerHTML = `
        <h3 class="text-xl font-bold mb-4 text-gray-800">Search Results:</h3>
        <ul class="list-disc list-inside space-y-4">
          ${data
            .map(
              (item) => `
            <li class="text-gray-700">
              <strong>Hash-ID:</strong> ${item['hash-ID']}<br>
              <strong>URL:</strong> <a href="${
                item.web_info.url
              }" target="_blank" class="text-blue-500 underline">${
                item.web_info.url
              }</a><br>
              <strong>Title:</strong> ${item.web_info.title || 'N/A'}<br>
              <strong>Description:</strong> ${
                item.web_info.description || 'N/A'
              }<br>
              <strong>Content:</strong> ${item.web_info.content
                .slice(0, 100)
                .trim()}...<br>
              <strong>BTC Wallets:</strong> ${
                item.financial_entity.btc_wallets.join(', ') || 'None'
              }<br>
              <strong>ETH Wallets:</strong> ${
                item.financial_entity.eth_wallets.join(', ') || 'None'
              }<br>
              <strong>Emails:</strong> ${
                item.person_entity.emails.join(', ') || 'None'
              }<br>
              <strong>SSIs:</strong> ${
                item.person_entity.ssi.join(', ') || 'None'
              }<br>
              <strong>Phone Numbers:</strong> ${
                item.person_entity.phone_number.join(', ') || 'None'
              }
            </li>
          `
            )
            .join('')}
        </ul>
      `;
    } else {
      responseMessage.innerHTML =
        '<p class="text-red-500">No results found.</p>';
    }
  } catch (error) {
    console.error('Search error:', error);
    responseMessage.innerHTML =
      '<p class="text-red-500">Error fetching results. Please try again.</p>';
  }
});
