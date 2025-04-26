import { Link } from "react-router-dom"
import { useState, useEffect } from "react";

export default function StartScreen() {

    const [isRunning, setIsRunning] = useState("");

    async function checkServer() {
        const req = await fetch("https://where-is-waldo-api.onrender.com");
        const res = await req.json();
        setIsRunning(res);
    }

    useEffect(() => {
        checkServer();
    }, [])


    return (
        <>
            {isRunning ? 
            <Link to="/game">Start Game</Link>
             : <h1>Loading...</h1>}
            
        </>
        
    )
}