// Set the date to countdown to (Year, Month (0-based), Day, Hour, Minute, Second)
const countdownDate = new Date("2024-03-09T18:00:00");

function updateCountdown() {
  const currentTime = new Date();
  const difference = countdownDate - currentTime;

  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML = `
      <div>${days}D ${hours} : ${minutes} : ${seconds}</div>`;
  } else {
    document.getElementById("countdown").innerHTML = "Countdown expired";
  }
}

// Update countdown every second
setInterval(updateCountdown, 1000);