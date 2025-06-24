getPrayerTimes('Ar Riyāḑ');
let cities = [
    "الرياض",
    "المدينة المنورة",
    "القسيم",
    "الدمام",
    "الخبر",
    "الشرقية",
    "جازان",
    "تبوك",
    "نجران"
]
document.getElementById('city').innerHTML = "";
for (let city of cities) {

    const content = `
<option value="${city}">${city}</option>
`
    document.getElementById('city').innerHTML += content;
}
document.getElementById('city').addEventListener('change', function () {
    let city = document.getElementById('city').value;
    document.getElementById('title-city').innerHTML="";
   document.getElementById('title-city').innerHTML = `<h1>${city}</h1>`;
   if(city=="الرياض"){
    getPrayerTimes('Ar Riyāḑ');
   }
   else if(city=="المدينة المنورة"){
    getPrayerTimes('Al Madīnah al Munawwarah');
   }
   else if(city=="القسيم"){
    getPrayerTimes('Al Qaşīm');
   }
   else if(city=="مكة المكرمة"){
    getPrayerTimes('Makkah al Mukarramah');
   }
   else if(city=="الخبر"){
    getPrayerTimes('Al Khobar');
   }
   else if(city=="الشرقية"){
    getPrayerTimes('Ash Sharqīyah');
   }
   else if(city=="جازان"){
    getPrayerTimes('Jāzān');
   }
   else if(city=="تبوك"){
    getPrayerTimes('Tabūk');
   }
   else if(city=="نجران"){
    getPrayerTimes('Najrān');
   }
}) 
function getPrayerTimes(cityname){
let params = {
    country: 'SA',
    city: cityname
}

axios.get('https://api.aladhan.com/v1/timingsByCity', {
    params: params
})
    .then(function (response) {
        let times = response.data.data.timings;
        fillTimes('fajr-time', times.Fajr);
        fillTimes('shuruq-time', times.Sunrise);
        fillTimes('dhuhr-time', times.Dhuhr);
        fillTimes('asr-time', times.Asr);
        fillTimes('maghrib-time', times.Maghrib);
        fillTimes('isha-time', times.Isha);
        let date = response.data.data.date;
        document.getElementById('date').innerHTML = date.readable;
        document.getElementById('day').innerHTML = date.hijri.weekday.ar;
        console.log(response);

        function fillTimes(id, time) {
            document.getElementById(id).innerHTML = time;
        }
    })

    .catch(function (error) {
        console.log(error);
    });
}
