import styles from "../styles/gameOver.module.css"
import { useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { GameContext } from "./Context";
export default function GameOver({sessionId}) {
    const [username, setUsername] = useState("");
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();
    const { resetGame } = useContext(GameContext);

    async function handleSubmit(e) {
        
        e.preventDefault();
        try {
            const req = await fetch("https://where-is-waldo-api.onrender.com/game/end", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ sessionId, username})
            });
            const res = await req.json();
            if (!req.ok) {
                setErrors(res.errors);
                return;
            }
            resetGame()
            setTimeout(() => navigate("/leaderboard"), 0)
            
            

        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label htmlFor="name" className={styles.label}>Please enter your name if you want it to be displayed on the leaderboard</label>
                <input className={styles.input} onChange={e => setUsername(e.target.value)} required min="3" type="text" id="name" name="name" />
                <button className={styles.btn}>Submit</button>
                {errors && (
                    <ul className={styles.errorList}>
                        {errors.map((err, id) => (
                            <li key={id}>{err.msg}</li>
                        ))}
                    </ul>
                )}
            </form>
        </>

    )
}