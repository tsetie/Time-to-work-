import LocationCSS from './Location.module.css'
import locationIcon from '../assets/location.png'
import pathIcon from '../assets/path.png'
function Location(){

    return(
        <>
        <div className={LocationCSS.locationContainer}>
             <p><img className={LocationCSS.locationIcon} src={locationIcon}></img> Home </p>
             <p><img className={LocationCSS.pathIcon} src={pathIcon}></img></p>
             <p><img className={LocationCSS.locationIcon}  src={locationIcon}></img>Work</p>  
        </div>
     
        </>
    );
}

export default Location;