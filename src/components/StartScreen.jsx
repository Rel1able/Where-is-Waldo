import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import styles from "../styles/startScreen.module.css";
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
        <div className={styles.container}>
            {isRunning ? 
                <div className={styles.pictureContainer}>
                    <img className={styles.image} src="img.jpg"/>
                    <Link className={styles.btn} to="/game">Start Game</Link>
                </div>
              
             : <h1>Loading...</h1>}
            
        </div>
        
    )
}