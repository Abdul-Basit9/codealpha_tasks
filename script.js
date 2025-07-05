const dobInput = document.getElementById("dob");
const output = document.getElementById("output");
const error = document.getElementById("error");

dobInput.addEventListener("input", () => {
  const dob = new Date(dobInput.value);
  const today = new Date();

  if (isNaN(dob.getTime())) {
    error.textContent = "⚠️ Please select a valid date.";
    output.textContent = "--";
    return;
  } else if (dob > today) {
    error.textContent = "⚠️ Date of birth cannot be in the future.";
    output.textContent = "--";
    return;
  } else {
    error.textContent = "";
    calculateAgeLive(dob);
  }
});

function calculateAgeLive(dob) {
  clearInterval(window.ageTimer); // Clear previous timer if exists

  window.ageTimer = setInterval(function updateAge() {
    const now = new Date();

    let years = now.getFullYear() - dob.getFullYear();
    let months = now.getMonth() - dob.getMonth();
    let days = now.getDate() - dob.getDate();
    let hours = now.getHours() - dob.getHours();
    let minutes = now.getMinutes() - dob.getMinutes();
    let seconds = now.getSeconds() - dob.getSeconds();

    if (seconds < 0) {
      seconds = seconds + 60;
      minutes = minutes - 1;
    } else if (minutes < 0) {
      minutes = minutes + 60;
      hours = hours - 1;
    } else if (hours < 0) {
      hours = hours + 24;
      days = days - 1;
    } else if (days < 0) {
      months = months - 1;
      const prevMonthDays = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
      days = days + prevMonthDays;
    } else if (months < 0) {
      months = months + 12;
      years = years - 1;
    }

    output.textContent = `${years}y ${months}m ${days}d ${hours}h ${minutes}m ${seconds}s`;
  }, 1000);
}
