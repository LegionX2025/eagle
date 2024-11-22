const API_URL = import.meta.env.VITE_API_URL;

// Signup Form Handler
document
  .getElementById('signup-form')
  .addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    try {
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      const responseData = await response.json();

      const responseMessage = document.getElementById('response-message');
      if (response.ok) {
        responseMessage.innerText = 'Submission successful!';
        responseMessage.classList.add('text-green-500');
        responseMessage.classList.remove('text-red-500');
      } else {
        responseMessage.innerText = 'Something went wrong. Please try again.';
        responseMessage.classList.add('text-red-500');
        responseMessage.classList.remove('text-green-500');
      }
    } catch (error) {
      const responseMessage = document.getElementById('response-message');
      responseMessage.innerText = 'Network error. Please try again later.';
      responseMessage.classList.add('text-red-500');
    }

    document.getElementById('signup-form').reset();
  });

// Search Form Handler
document
  .getElementById('search-form')
  .addEventListener('submit', async function (e) {
    e.preventDefault();

    const query = document.getElementById('query').value;
    const responseMessage = document.getElementById('response-message');

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
                    <strong>Content:</strong> ${item.web_info.content.slice(
                      0,
                      100
                    )}...<br>
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
      responseMessage.innerHTML =
        '<p class="text-red-500">Error fetching results.</p>';
      console.error('Search error:', error);
    }
  });
