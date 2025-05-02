import styles from "../styles/gameOver.module.css"

export default function GameOver() {

    async function handleSubmit(e) {
        e.preventDefault();
    }
    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <label htmlFor="name">Please enter your name:</label>
            <input type="text" id="name" name="name" />
            <button>Enter</button>
        </form>
    )
}