import styles from "../styles/header.module.css";
import Timer from "./Timer";
export default function Header({isRunning, setIsRunning}) {
    return (
        <header className={styles.header}>
            Where's Waldo
            {isRunning && <Timer isRunning={isRunning} setIsRunning={setIsRunning} />}
            
        </header>
    )
}