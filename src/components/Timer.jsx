import { useEffect, useRef, useContext} from "react";
import { GameContext } from "./Context";

export default function Timer({isRunning}) {
    const {gameOver, time, setTime} = useContext(GameContext)
    const intervalRef = useRef(null);

    useEffect(() => {
        if (isRunning && !gameOver) {
            intervalRef.current = setInterval(() => setTime(prev => prev + 1), 10);
        }
        if (gameOver) {
            clearInterval(intervalRef.current)
        }
        return () => clearInterval(intervalRef.current)
    }, [isRunning, gameOver])

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