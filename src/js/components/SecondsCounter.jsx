import React, { useState, useEffect } from "react";
function SecondsCounter() {
    const [seconds, setSeconds] = useState(0);
    useEffect(() => {
        const intervalId = setInterval(() => {
            setSeconds(prev => prev + 1);
        }, 1000);
        return() => clearInterval(intervalId);
    },[]);
    return ( 
        <div style={{ fontSize: "2rem"}}>
            {seconds}
        </div>
    );
}
export default SecondsCounter;