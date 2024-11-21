//This  function is designed to analyze the weather data received and provide relevant messages based on specific conditions, such as heavy rain
export const determineUpcomingEvent = (data) => {
  const messages = [];

  if (data.weather[0].main === "Rain") {
    messages.push(
      "⛈️ Heavy rain is approaching! Stay safe and take shelter. 🌧️"
    );
    messages.push("🌧️ Thunderstorms expected. Bring out the umbrella! 🌂");
    messages.push("⚠️ Flash flooding possible due to heavy rain. Stay alert!");
  } else if (data.weather[0].main === "Snow") {
    messages.push("❄️ Snowstorm warning! Drive safely and bundle up!");
    messages.push(
      "🌨️ Snowfall expected to intensify. Watch out for icy roads!"
    );
    messages.push("⚠️ Snow advisory in effect. Stay indoors if possible.");
  } else if (data.weather[0].main === "Extreme") {
    messages.push(
      "🔥 Extreme heat warning! Drink plenty of water and stay cool."
    );
    messages.push("⚠️ Heatwave alert: Stay indoors during peak sun hours.");
    messages.push(
      "🌞 Dangerously high temperatures. Avoid prolonged sun exposure!"
    );
  } else if (data.main.temp > 30) {
    messages.push("☀️ Hot day ahead! Keep hydrated and avoid the sun.");
    messages.push("🌞 It's sweltering out! Stay cool and use sunscreen.");
    messages.push(
      "⚠️ Heat advisory: Temperatures over 30°C. Drink water often!"
    );
  } else if (data.main.temp < 10) {
    messages.push("🥶 Freezing temperatures! Dress warmly and stay safe.");
    messages.push("❄️ Winter storm approaching! Stock up on essentials.");
    messages.push(
      "⚠️ Frost warning: Protect your pipes and pets from the cold."
    );
  } else {
    messages.push(
      "🌤️ Beautiful weather today! Perfect for outdoor activities."
    );
    messages.push("🌞 Clear skies, ideal for a walk or picnic.");
    messages.push("🌈 Mild and pleasant! A perfect day to be outside.");
  }

  // Randomly pick a message from the list of possible messages
  const randomIndex = Math.floor(Math.random() * messages.length);
  const upcomingEventMessage = messages[randomIndex];

  // Used the notification API to send the message to the user
  // f permission has not been granted or denied yet, the function requests permission to send notifications
  if (Notification.permission === "granted") {
    new Notification("Upcoming Weather Event", {
      body: upcomingEventMessage,
    });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification("Upcoming Weather Event", {
          body: upcomingEventMessage,
        });
      }
    });
  }
};
