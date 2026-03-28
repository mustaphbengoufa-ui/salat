let country;
let city;
let salawat = {
  Fajr: "الفجر",
  Dhuhr: "الظهر",
  asr: "العصر",
  Maghrib: "المغرب",
  Isha: "العشاء",
  Sunrise: "الشروق"
};

let blur1 = document.getElementById('blur');
document.getElementById('f').textContent = salawat.Fajr;
document.getElementById('d').textContent = salawat.Dhuhr;
document.getElementById('a').textContent = salawat.asr;
document.getElementById('m').textContent = salawat.Maghrib;
document.getElementById('i').textContent = salawat.Isha;
document.getElementById('s').textContent = salawat.Sunrise;

const time = new Date();

// ✅ get location - مُصلَّح ليعمل على الهاتف
function getlocaion() {
  if (!navigator.geolocation) {
    blur1.style.display = "block";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    // ✅ نجاح
    (position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      gettimePray(lon, lat);
    },
    // ❌ خطأ (رفض الإذن أو غير متاح)
    (error) => {
      console.log("خطأ في الموقع:", error.message);
      blur1.style.display = "block";
    },
    // ⚙️ خيارات
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
  );
}

document.querySelectorAll(".salat").forEach(el => {
  el.classList.add("animations");
});

let month = time.getMonth() + 1;

// get prayer time
function gettimePray(lon, lat) {
  document.getElementById('day').classList.add('animations');
  fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=19`)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      document.querySelectorAll(".salat").forEach(el => {
        el.classList.remove("animations");
      });
      document.getElementById('day').classList.remove('animations');
      document.getElementById('fajer').textContent = json.data.timings.Fajr;
      document.getElementById('dohr').innerHTML = json.data.timings.Dhuhr;
      document.getElementById('asr').textContent = json.data.timings.Asr;
      document.getElementById('madreb').textContent = json.data.timings.Maghrib;
      document.getElementById('isha').textContent = json.data.timings.Isha;
      document.getElementById('shorouk').textContent = json.data.timings.Sunrise;
      document.getElementById('dateh').textContent = json.data.date.hijri.date;
      document.getElementById('datem').textContent = json.data.date.gregorian.date;
      document.getElementById('dayw').textContent = json.data.date.gregorian.weekday.en;
    })
    .catch((error) => {
      console.log("خطأ في جلب مواقيت الصلاة:", error);
    });
}

// get time
function gettime() {
  const clock = new Date();
  document.getElementById('clock').innerText = clock.toLocaleTimeString();
}

setInterval(gettime, 1000);
gettime();

// ✅ bluedisplay - مُبسَّطة
function bluedisplay() {
  blur1.style.display = "none";
  getlocaion();
}

getlocaion();
