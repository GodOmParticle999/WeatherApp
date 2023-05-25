const apiKey="f85d5985ae28d69f955187b7fa9fdb46";
const weatherDetailsEl=document.querySelector("#weather-details");
const cityNameEl=document.querySelector("#city-name");
const formEl=document.querySelector("form");
formEl.addEventListener("submit",(event)=>{
    event.preventDefault();
    const cityValue=cityNameEl.value;
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
        const description= data.weather[0].description;
        const icon = data.weather[0].icon;
        const UnixTimestamp=data.sys.sunset;
        const now= Date.now();
        const date = new Date(UnixTimestamp*1000);
        let hours=date.getHours();
        let ampm=hours>=12?"PM":"AM";
        hours=hours%12;
        hours=hours?hours:12;
        const minutes=date.getMinutes();
        const sunsetTime= hours+ ':'+minutes + " "+ ampm;
        let sunset="";
        if(UnixTimestamp>now){

            sunset=`Sunset at: ${sunsetTime}`;
        }else{
            sunset=`The Sun is already set at ${sunsetTime}`;
            
        }
        
        const details=[
            `Feels Like: ${Math.round(data.main.feels_like)}`,
            `Humidity:${data.main.humidity}%`,
            `Wind Speed:${data.wind.speed} m/s`,
            `${sunset}`,
    


        ];
        weatherDetailsEl.querySelector(".icon").innerHTML=`<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather-icon">`;
        weatherDetailsEl.querySelector(".temperature").textContent=`${temperature}°C`;
        weatherDetailsEl.querySelector(".weather-description").textContent=description;
        weatherDetailsEl.querySelector(".details").innerHTML=details.map((detail)=>
            `<div>${detail}</div>`
        ).join("")



        
    } catch (error) {
        weatherDetailsEl.querySelector(".icon").innerHTML="";
        weatherDetailsEl.querySelector(".temperature").textContent="";
        weatherDetailsEl.querySelector(".weather-description").textContent=
        "An error occured. Please Try Again!";
        weatherDetailsEl.querySelector(".details").innerHTML="";
    }
}