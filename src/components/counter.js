import React from 'react'
import { useState, useEffect } from 'react';

const Timer = (props) => {
    const {initialMinute = 0, initialSeconds = 0} = props;
    const [ minutes, setMinutes ] = useState(initialMinute);
    const [seconds, setSeconds ] =  useState(initialSeconds/1000);

    useEffect(()=>{
        setSeconds(initialSeconds/1000)
    }, [initialSeconds])

    useEffect(()=>{
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            } 
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
          };
    }, [initialSeconds, seconds, minutes]);

    return (
        <div>
        { minutes === 0 && seconds === 0
            ? null
            : <h1 class="font-mono text-center italic leading-8 font-semibold text-base md:text-xl">hiding in <span class="font-sans bg-blue-400 p-1">{seconds < 10 ?  `0${seconds}` : seconds}</span> seconds</h1> 
        }
        </div>
    )
}

export default Timer;