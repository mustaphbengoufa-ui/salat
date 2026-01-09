let country;
let city;

const time=new Date();
//get locaion
function getlocaion(){
let lat;
let lon
    navigator.geolocation.getCurrentPosition(async (position) => {
   lat = position.coords.latitude;
   lon = position.coords.longitude;
gettimePray(lon,lat);
});


}

let month=time.getMonth()+1
//get prayer time
function gettimePray(lon,lat){fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=19`)
  .then((response) => response.json())
  .then((json) => {
    console.log(json.data)
    document.getElementById('fajer').textContent=json.data.timings.Fajr
    document.getElementById('dohr').innerHTML=json.data.timings.Dhuhr
    document.getElementById('asr').textContent=json.data.timings.Asr
    document.getElementById('madreb').textContent=json.data.timings.Maghrib
    document.getElementById('isha').textContent=json.data.timings.Isha
    document.getElementById('shorouk').textContent=json.data.timings.Sunrise
    document.getElementById('dateh').textContent=json.data.date.hijri.date
    document.getElementById('datem').textContent=json.data.date.gregorian.date
    document.getElementById('dayw').textContent=json.data.date.gregorian.weekday.en
   
});

}
   
//get time

function gettime() {
    const clock=new Date()
    document.getElementById('clock').innerText=clock.toLocaleTimeString();
}  
  
   setInterval(gettime, 100);
     gettime()



     navigator.geolocation.getCurrentPosition(async (position) => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
  );
  const data = await res.json();

  const city =
    data.address.city ||
    data.address.town ||
    data.address.village ||
    data.address.state;

  console.log("Your real city is:", city);
});
