import { useState, useEffect, useRef} from "react";


export default function Timer({ started }) {
    const [time, setTime] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {

        if (started) {
            intervalRef.current = setInterval(() => setTime(prev => prev + 1), 10);
        }
        return () => clearInterval(intervalRef.current)
    }, [started])

    const minutes = Math.floor((time % 360000) / 6000)
    const seconds = Math.floor((time % 6000) / 100);
    const milliseconds = time % 100;


    return (
        <>
            <p>
                {minutes.toString().padStart(2, "0")}:
                {seconds.toString().padStart(2, "0")}:
                {milliseconds.toString().padStart(2, "0")}
            </p>
        </>
    )
}