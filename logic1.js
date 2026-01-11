const salawat = {
  Fajr: "الفجر",
  Dhuhr: "الظهر",
  Asr: "العصر",
  Maghrib: "المغرب",
  Isha: "العشاء",
  Sunrise: "الشروق",
};

// set labels
document.getElementById('f').textContent = salawat.Fajr;
document.getElementById('d').textContent = salawat.Dhuhr;
document.getElementById('a').textContent = salawat.Asr;
document.getElementById('m').textContent = salawat.Maghrib;
document.getElementById('i').textContent = salawat.Isha;
document.getElementById('s').textContent = salawat.Sunrise;
let city = document.getElementById('city');
// ================= LOCATION =================
function getLocation() {
  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      getPrayerTimes(latitude, longitude);
    },
    (error) => {
      alert("Location access denied");
      console.error(error.message);
    }
  );
}

// ================= PRAYER TIMES =================
async function getPrayerTimes(lat, lon) {
  toggleLoading(true);

  try {
    const res = await fetch(
      `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=19`
    );
    const json = await res.json();
    if (json.code !== 200) {
      throw new Error("Failed to fetch prayer times");
    }
    
    // set city name

    const t = json.data.timings;

    document.getElementById('fajer').textContent = t.Fajr;
    document.getElementById('dohr').textContent = t.Dhuhr;
    document.getElementById('asr').textContent = t.Asr;
    document.getElementById('madreb').textContent = t.Maghrib;
    document.getElementById('isha').textContent = t.Isha;
    document.getElementById('shorouk').textContent = t.Sunrise;

    document.getElementById('dateh').textContent = json.data.date.hijri.date;
    document.getElementById('datem').textContent = json.data.date.gregorian.date;
    document.getElementById('dayw').textContent =
      json.data.date.gregorian.weekday.en;

  } catch (err) {
    console.error("API error:", err);
  } finally {
    toggleLoading(false);
  }
}

// ================= UI =================
function toggleLoading(state) {
  document.querySelectorAll(".salat, #day").forEach(el => {
    el.classList.toggle("animations", state);
  });
}

// ================= CLOCK =================
function updateClock() {
  document.getElementById('clock').textContent =
    new Date().toLocaleTimeString();
}

setInterval(updateClock, 1000);
updateClock();
getLocation();
