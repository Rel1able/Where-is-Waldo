import  styles  from "../styles/findBar.module.css";

export default function FindBar() {
    return (
        <div className={styles.navbar}>
            <h1>Try to find them </h1>
            <div className={styles.characters}>
                <h2>Char1</h2>
                <h2>Char2</h2>
                <h2>Char3</h2>
            </div>
        </div>
        
    )
}