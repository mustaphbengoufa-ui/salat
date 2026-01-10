let country;
let city;
let salawat={
 Fajr:"الفجر",
 Dhuhr:"الظهر",
 asr:"العصر",
 Maghrib:"المغرب",
 Isha:"العشاء",
 Sunrise:"الشروق"
}
 document.getElementById('f').textContent=salawat.Fajr
 document.getElementById('d').textContent=salawat.Dhuhr
 document.getElementById('a').textContent=salawat.asr
 document.getElementById('m').textContent=salawat.Maghrib
 document.getElementById('i').textContent=salawat.Isha
 document.getElementById('s').textContent=salawat.Sunrise
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
function gettimePray(lon,lat){
  document.querySelectorAll(".salat").forEach(el => {
  el.classList.add("animations");
});
document.getElementById('day').classList.add('animations')
fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=19`)
  .then((response) => {

    return response.json()
})
  .then((json) => {
    document.querySelectorAll(".salat").forEach(el => {
  el.classList.remove("animations");
});
document.getElementById('day').classList.remove('animations')

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

// getlocaion()