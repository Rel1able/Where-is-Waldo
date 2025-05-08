import styles from "../styles/header.module.css";
import Timer from "./Timer";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { GameContext } from "./Context";

export default function Header({ isRunning, setIsRunning }) {
    const { gameOver } = useContext(GameContext);

    return (
        <header className={styles.header}>
            {gameOver ?
                <>
                     <h3 className={styles.title}>Where's Waldo</h3> 
                    <h3 className={styles.title}>Leaderboard</h3>
                </>
                : 
                <>
                    <h3 className={styles.title}><Link to="/">Where's Waldo</Link></h3>
                    <h3 className={styles.title}><Link to="/leaderboard">Leaderboard</Link></h3>
                </>
                
            }
            
            {isRunning && <Timer isRunning={isRunning} setIsRunning={setIsRunning} />}
            
        </header>
    )
}