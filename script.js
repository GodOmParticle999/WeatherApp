const apiKey="f85d5985ae28d69f955187b7fa9fdb46";
const weatherDetailsEl=document.querySelector("#weather-details");
const cityNameEl=document.querySelector("#city-name");
const formEl=document.querySelector("form");
const h1=document.querySelector(".h1");
formEl.addEventListener("submit",(event)=>{
    event.preventDefault();
    let cityValue=cityNameEl.value;
    getWeatherDetails(cityValue);
});
async function getWeatherDetails(cityValue){
    try {
        const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`)
        if(!response.ok){
            throw new Error("Network response error");
        }
        const data = await response.json();
        console.log(data)
        const temperature = Math.round(data.main.temp);
        const max_Temp = Math.round(data.main.temp_max);
        const description= data.weather[0].description.toUpperCase();
        const icon = data.weather[0].icon;
        const unixTimestampSunset=data.sys.sunset;
        const unixTimestampSunrise=data.sys.sunrise;
        const setNrise=(unixTimestamp)=>{
            const date = new Date(unixTimestamp*1000);
        let hours=date.getHours();
        const ampm=hours>=12?"PM":"AM";
        hours=hours%12;
        hours=hours?hours:12;
        hours=hours<10?'0'+hours:hours;
        let minutes=date.getMinutes();
        // if(minutes<10){
        //  minutes='0'+minutes;
        // }else{
        //     minutes=minutes;
        // }
        minutes=minutes<10?'0'+minutes:minutes;
        const time=hours+ ':'+minutes + " "+ ampm;
        return time;
        }
        const sunset=setNrise(unixTimestampSunset);
        const sunrise=setNrise(unixTimestampSunrise);
        // console.log(sunrise);
        // if(cityValue=="Lohardaga"||"lohardaga"||"LOHARDAGA"){
        //     h1.textContent="Lohardaga is an Amazing Place";
        // }else{
        //     h1.textContent="Let's See How's the Weather Today";
        // }
        // const date = new Date(unixTimestamp*1000);
        // let hours=date.getHours();
        // let ampm=hours>=12?"PM":"AM";
        // hours=hours%12;
        // hours=hours?hours:12;
        // const minutes=date.getMinutes();
        // const sunset= hours+ ':'+minutes + " "+ ampm; 

        const details=[
            `Feels Like: ${Math.round(data.main.feels_like)}`,
            `Max Temp: ${max_Temp}`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${data.wind.speed} m/s`,
            `Sunrise at: ${sunrise}`,
            `Sunset at: ${sunset}`,
        ];
        h1.textContent=`Weather in ${cityValue}`;
        weatherDetailsEl.querySelector(".icon").innerHTML=`<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather-icon">`;
        weatherDetailsEl.querySelector(".temperature").innerHTML=`${temperature}°C`;
        weatherDetailsEl.querySelector(".weather-description").textContent=description;
        weatherDetailsEl.querySelector(".details").innerHTML=details.map((detail)=>
            `<div>${detail}</div>`
        ).join(""); 
    } catch (error) {
        h1.textContent=`It seems ${cityValue} doesn't Exist in The Earth!`
        weatherDetailsEl.querySelector(".icon").innerHTML="";
        weatherDetailsEl.querySelector(".temperature").textContent="";
        weatherDetailsEl.querySelector(".weather-description").textContent=
        "Please Try Again!";
        weatherDetailsEl.querySelector(".details").innerHTML="";
    }
}