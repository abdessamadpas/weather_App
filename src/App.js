import React, { useState, useEffect } from "react";

const api = {
  key: "5759b361eac3e0a1b9098b397b27fcab",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('tanger');


  const [weather, setWeather] = useState({});


  let search = evt =>{
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)

      //fetch(`${api.base}weather?q=${query}&unit=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result);
    //    console.log(result.main.temp);
        

      })
    }}
  
  

   let today = new Date();
   let time = today.getHours();
   let  alltime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    console.log(time);
    console.log(alltime);

  const dateBuilder = (d) =>{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];  
 
  let day = days[d.getDay()];
  let time = d.getHours();
  
  // let today = new Date();
  // let time = today.getHours()
  
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear(); 
      
    return `${day} ${date} ${month} ${year}` 
               
  }
  return (
    <div className={(typeof weather.main != "undefined") ?
    (( time >= 12 )? ("app warm"):("app ") 
    ):("app ")}>
    
    
      <main>
      
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="search..."
            onChange={e=>setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <>
        <div className="location-box">
          <div className="location"> {weather.name}, {weather.sys.country}</div>
          <div className="date">{dateBuilder(new Date())}</div>  
          <div className="date">{alltime}</div>  
          <div className="date">{( time <= 12 )? ("morning"):("afternon")} </div>
        </div>
        <div className="weather-box">
          <div className="temp"> {weather.main.temp} C </div>
          <div className="weather"> {weather.weather[0].main}</div>
        </div>
        </>
        ) : (
          <>
        <div className="location-box">
          
           <div className="weather-box">
           <div className="weather">   {weather.message}   </div>
        </div>  </div>
        </>
        
        )}
      </main>
    </div>
  );
}

export default App;
