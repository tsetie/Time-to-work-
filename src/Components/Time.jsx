import { useEffect, useState } from 'react';
import TimeCSS from './Time.module.css';
import axios from 'axios'
function Time(){
    
    const [duration,setDuration] = useState(0);
    const [arrivalTime, setArrivalTime] = useState(0);

    //fetching duration to get to work 
    const getTime = () => {
        axios.get('https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf624884cd09bbb14c4e09a96522a27604a7da&start=-93.39403740453595,44.75545732118896&end=%20-93.3266644180229,44.88677059661782')
        .then(response => {
            const data = response.data.features[0].properties.segments[0].duration;
            setDuration(Math.round(data/60));
        })
        .catch(error => {console.log(error)});
    }

    useEffect(() => {

        getTime(); // getting time because interval makes it wait 3 minutes 
        const interval = setInterval(()=>{ getTime(); },180000); // getting time very 3 minutes 
       
        // clearing interval/memory to avoid memory leaks when this component gets unmounted 
        return () => {
            clearInterval(interval);
        }
    
    }, []);

    useEffect(() =>{
        
        const currentTimeVar = new Date();
        currentTimeVar.setMinutes(currentTimeVar.getMinutes() + duration);
        const arrivalTimeVar = currentTimeVar;
        // Turn to string bc react can only return numbers and strings, not Date objects.
        setArrivalTime(arrivalTimeVar.toLocaleTimeString().slice(0,4) + arrivalTimeVar.toLocaleTimeString().slice(7,11));  

    }, [duration]);


    return(
        <>
        <p className={TimeCSS.p}> {duration} Minutes</p>
        <p className={TimeCSS.p}>Arrival: {arrivalTime} </p>
        </>
    );

}
export default Time;