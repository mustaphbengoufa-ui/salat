let country;
let city;
//get locaion
navigator.geolocation.getCurrentPosition(async (position) => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
  );
  const data = await res.json();
city=data.address.city
country=data.address.country
document.getElementById('city').textContent=city
});
//get time
const time=new Date();
function gettime() {
    const clock=new Date()
    document.getElementById('clock').innerText=clock.toLocaleTimeString();
}
   setInterval(gettime, 100);
     gettime()
let month=time.getMonth+1
//get prayer time
city="Algeria"
country="Algerias"
function gettimePray(){fetch(`https://api.aladhan.com/v1/timingsByCity/${time.getDay()}-${month}-${time.getFullYear()}?city=${city}&country=${country}&method=19`)
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

/*
ciaddress
: 
ISO3166-2-lvl4
: 
"DZ-02"
city
: 
"Chlef"
country
: 
"Algeria"
country_code
: 
"dz"
county
: 
"Chlef District"
neighbourhood
: 9
"Hay El Amel"
postcode
: 
"02000"
state
: 
"Chlef"
suburb
: 
"Bocaa"*/
 

     gettimePray()
  
