// Function to fetch weather data using an API (replace with your own API logic)
async function fetchWeatherData(location) {
    const apiKey = '876f3fcaf7102749c6c7d2d357ea5ad2';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      const dailyData = data.list.filter(item => item.dt_txt.includes('12:00:00'));
      return dailyData.map(item => ({
        date: new Date(item.dt * 1000).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
        day: new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' }),
        temperature: `${Math.round(item.main.temp)}°C`,
        description: item.weather[0].description
      }));
    } catch (error) {
      console.log('Error:', error);
      return null;
    }
  }
  
  
// Display weather details on the page
function displayWeatherData(weatherData, location) {
    const weatherContainer = document.querySelector('.weather-details');
    weatherContainer.innerHTML = '';
  
    if (weatherData) {
      const locationHeading = document.createElement('h2');
      locationHeading.textContent = `Weather forecast for ${location}`;
  
      weatherContainer.appendChild(locationHeading);
  
      weatherData.forEach(day => {
        const weatherCard = document.createElement('div');
        weatherCard.classList.add('weather-card');
  
        const dateHeading = document.createElement('h3');
        dateHeading.textContent = day.date;
  
        const dayPara = document.createElement('p');
        dayPara.textContent = day.day;
  
        const tempPara = document.createElement('p');
        tempPara.textContent = `Temperature: ${day.temperature}`;
  
        const descPara = document.createElement('p');
        descPara.textContent = `Description: ${day.description}`;
  
        weatherCard.appendChild(dateHeading);
        weatherCard.appendChild(dayPara);
        weatherCard.appendChild(tempPara);
        weatherCard.appendChild(descPara);
  
        weatherContainer.appendChild(weatherCard);
      });
    } else {
      weatherContainer.textContent = 'Unable to fetch weather data.';
    }
  }
  
  
  // Show notification
  function showNotification(message) {
    // Check if the browser supports notifications
    if ('Notification' in window) {
      // Check the notification permission status
      if (Notification.permission === 'granted') {
        new Notification(message);
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification(message);
          }
        });
      }
    }
  }
// Handle search button click
document.getElementById('search-btn').addEventListener('click', async () => {
    const locationInput = document.getElementById('location-input');
    const location = locationInput.value.trim();
  
    if (location) {
      const weatherData = await fetchWeatherData(location);
      displayWeatherData(weatherData, location);
      locationInput.value = '';
  
      showNotification('Weather details loaded!');
    }
  });
    
 