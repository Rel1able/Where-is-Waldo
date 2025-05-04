import styles from "../styles/gameOver.module.css"

export default function GameOver() {



    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const req = await fetch("https://where-is-waldo-api.onrender.com/game/end", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({})
            });
            const res = await req.json();
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label htmlFor="name">Please enter your name:</label>
                <input required min="3" type="text" id="name" name="name" />
                <button>Submit</button>
            </form>
        </>

    )
}