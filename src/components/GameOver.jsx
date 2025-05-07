import styles from "../styles/gameOver.module.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function GameOver({sessionId}) {
    const [username, setUsername] = useState("");
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();


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
            }
            console.log(res);
            navigate("/leaderboard");

        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label htmlFor="name">Please enter your name if you want to be displayed on the leaderboard</label>
                <input onChange={e => setUsername(e.target.value)} required min="3" type="text" id="name" name="name" />
                <button>Submit</button>
                {errors && (
                    <ul>
                        {errors.map((err, id) => (
                            <li key={id}>{err.msg}</li>
                        ))}
                    </ul>
                )}
            </form>
        </>

    )
}