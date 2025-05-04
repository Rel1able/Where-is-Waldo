import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import styles from "../styles/startScreen.module.css";
export default function StartScreen() {

    const [isRunning, setIsRunning] = useState("");

    async function checkServer() {
        try {
            const req = await fetch("https://where-is-waldo-api.onrender.com/ping");
            if (!req.ok) throw new Error("Server not OK");
            const res = await req.json();
            setIsRunning(res);
            
        } catch (err) {
            console.log(err.message);
        }
        
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
              
             : <h1 style={{color: "white"}}>Loading...</h1>}
            
        </div>
        
    )
}