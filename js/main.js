document.addEventListener('DOMContentLoaded', async function () {
  const form = document.getElementById('carForm');
  const input = document.getElementById('carModel');
  const elResult = document.getElementById('result');

  if (!form || !input || !elResult) {
    console.error('Elementlarni topib bo\'lmadi. To\'g\'ri IDs ni ishlatmoqdan aniqroq bo\'ling');
    return;
  }

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const carModel = input.value.trim();
    if (!carModel) {
      console.log('Avtomobil modelini kiriting!');
      return;
    }

    const apiUrl = `https://api-ninjas.com/cars?model=${encodeURIComponent(carModel)}`;
    const apiKey = await getApiKey();

    const headers = new Headers({
      'X-Api-Key': apiKey
    });

    try {
      const response = await fetch(apiUrl, { headers });
      if (response.ok) {
        const data = await response.json();
        displayResults(data);
      } else {
        console.error('Ma\'lumotlarni olib kelishda xatolik yuz berdi:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('So\'rovni amalga oshirishda xatolik yuz berdi.', error);
    }
  });

  function displayResults(data) {
    elResult.innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
    console.log(data);
  }

  async function getApiKey() {
    try {
      const response = await fetch('api-key');
      const apiKeyData = await response.json();
      return apiKeyData.apiKey;
    } catch (error) {
      console.error('API keyni olishda xatolik yuz berdi:', error);

      return null;
    }
  }

});
