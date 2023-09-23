inputPlace=document.getElementById("search_inp");
searchButton=document.getElementById("search_btn")
currentLocation=document.getElementById("curr_loc")


// fetch current location
    const success=(position)=>{
        latitude=position.coords.latitude;
        longitude=position.coords.longitude;
        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
        .then(data=>data.json()).then(data=>fetchData(data.localityInfo.administrative[4].name))
    }


// fetch details of input data when click the button
searchButton.addEventListener("click",function (){
    fetchData(inputPlace.value)

})


// fetch lon and lat
currentLocation.addEventListener("click",function (){
   navigator.geolocation.getCurrentPosition(success,(error=()=>{

    alert("can't fetch")
   })
   )
})



// fetching weather data
function fetchData(data){

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${data}&appid=b41ec3be35c7dac8aabbc21ba253137a`)
    .then(result=>result.json())
    .then(result=>{
        if(result.message){
            alert(result.message)
        }else{
            domUpdation(result)

        }
    } );

   
}
// updating datas on dom
function domUpdation(data){
    
    wcard=document.getElementById("d_weather_card");
    wdetail=document.getElementById("d_detail");

    if(wcard.style.display==="none"||wdetail.style.display==="none"){
        wcard.style.display="block";
        wdetail.style.display="block";

        document.getElementById("cd_location").innerText=data.name;
        // document.getElementById("cd_country").innerText=data
        document.getElementById("temperature").innerText=(data.main.temp-273.15).toFixed(1);
        document.getElementById("status").innerText=data.weather[0].description;
        document.getElementById("temp_max").innerText=(data.main.temp_max-273.15).toFixed(1)
        document.getElementById("temp_min").innerText=(data.main.temp_min-273.15).toFixed(1)
        document.getElementById("wind_speed").innerText=data.wind.speed;
        document.getElementById("humidity").innerText=data.main.humidity;
    
    

    }else{
        wcard.style.display="none";
        wdetail.style.display="none"
    }

}
