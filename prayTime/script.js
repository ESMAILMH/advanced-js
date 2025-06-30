getPrayerTimes('Ar Riyāḑ');
let cities = [
    {
        arname: "الرياض",
        enname: "Ar Riyāḑ"
    },
    {
        arname: "المدينة المنورة",
        enname: "Al Madīnah al Munawwarah"
    },
    {
        arname: "القسيم",
        enname: "Al Qaşīm"
    },
    {
        arname: "الدمام",
        enname: "Al Dammam"
    },
    {
        arname: "الخبر",
        enname: "Al Khobar"
    },
    {
        arname: "جازان",
        enname: "Jāzān"
    },
    {
        arname: "تبوك",
        enname: "Tabūk"
    },
    {
        arname: "نجران",
        enname: "Najrān"
    }
]
document.getElementById('city').innerHTML = "";
for (let city of cities) {

    const content = `
<option value="${city.enname}">${city.arname}</option>
`
    document.getElementById('city').innerHTML += content;
}
document.getElementById('city').addEventListener('change', function () {
    document.getElementById('title-city').innerHTML = `<h1>${this.options[this.selectedIndex].text}</h1>`;
    getPrayerTimes(this.value);
})
function getPrayerTimes(cityname) {
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
