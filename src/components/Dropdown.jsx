import styles from "../styles/dropdown.module.css";

export default function Dropdown() {
    return (
        <div className={styles.dropdown}>
            <div className={styles.targetingBox}>
                <div className={styles.pointer}></div>
            </div>
            <div className={styles.charactersList}>
                <p>Char 1</p>
                <p>Char 2</p>
                <p>Char 3</p>
            </div>
        </div>

    )
}