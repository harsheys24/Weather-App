    const apiU = "https://api.openweathermap.org/data/2.5/weather?&appid=2d2125e58f4bcc6e35cd6c87848feefa&units=metric&q=";

    const searchcity = document.querySelector('.search input');
    const searchbtn = document.querySelector('.search button');
    const weather_display = document.querySelector('.weather img');
    const errorMessage = document.querySelector('.error');
    const weathered = document.querySelector('.weather');
    weathered.style.display = "none";


    async function checkWeath(city) {
        try{
            const resp = await fetch(apiU + city);
            var data = await resp.json();
            console.log(data);
            
            if (data.cod !==200){
                throw new Error(data.message);
            }
        
            document.querySelector('.city').innerHTML = data.name;
            document.querySelector('.humidity').innerHTML = data.main.humidity + `%`;
            document.querySelector('.wind').innerHTML = data.wind.speed + `km/h`;
            document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + `°C`;

            if (data.weather[0].main == "Clouds"){
            weather_display.src = "icons/clouds.png";
            }
            else if (data.weather[0].main == "Rain"){
            weather_display.src = "icons/rain.png";
            }
            else if (data.weather[0].main == "Clear"){
            weather_display.src = "icons/clear.png";
            }
            else if (data.weather[0].main == "Mist"){
            weather_display.src = "icons/mist.png";
            }
            else{
            weather_display.src = "icons/drizzle.png";
            }  
            errorMessage.textContent = "";
            weathered.style.display = "block";
        }
        catch (error) {
        alert(`Error : ${error.message}`)
        console.error(error);
        }
    }
    searchbtn.addEventListener("click", ()=>{
        checkWeath(searchcity.value.trim());
    })

    searchcity.addEventListener("keypress", (event)=>{
        if (event.key == "Enter"){
            checkWeath(searchcity.value.trim());
        }
    })
        