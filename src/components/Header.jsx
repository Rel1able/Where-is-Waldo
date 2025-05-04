import styles from "../styles/header.module.css";
import Timer from "./Timer";
import {Link } from "react-router-dom";
export default function Header({isRunning, setIsRunning}) {
    return (
        <header className={styles.header}>
            <Link to="/">Where's Waldo</Link>
            <Link to="/leaderboard">Leaderboard</Link>
            {isRunning && <Timer isRunning={isRunning} setIsRunning={setIsRunning} />}
            
        </header>
    )
}