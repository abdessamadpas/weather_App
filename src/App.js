import React, { useState, useEffect } from "react";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles} from '@material-ui/core/styles';


const api = {
  key: "5759b361eac3e0a1b9098b397b27fcab",
  base: "https://api.openweathermap.org/data/2.5/"
}


const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
});
function App() {
  const [query, setQuery] = useState('tanger');
  //const classes = useStyles();
  const classes = useStyles();


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
          <Backdrop className={classes.backdrop} > //** for loading app */
        <CircularProgress color="inherit" />
      </Backdrop>
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
