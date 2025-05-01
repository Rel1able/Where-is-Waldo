import styles from "../styles/header.module.css";
import Timer from "./Timer";
export default function Header({started}) {
    return (
        <header className={styles.header}>
            Where's Waldo
            {started && <Timer started={started} />}
            
        </header>
    )
}