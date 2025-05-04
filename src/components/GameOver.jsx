import styles from "../styles/gameOver.module.css"
import { useState, useContext } from "react";
import { GameContext } from "./Context";
import { useNavigate } from "react-router-dom";

export default function GameOver() {
    const [username, setUsername] = useState("");
    const [errors, setErrors] = useState([]);

    const { time, setGameOver } = useContext(GameContext);
    const navigate = useNavigate();


    async function handleSubmit(e) {
        
        e.preventDefault();
        try {
            const req = await fetch("https://where-is-waldo-api.onrender.com/game/end", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username, time})
            });
            const res = await req.json();
            if (!req.ok) {
                setErrors(res.errors);
            }
            console.log(res);
            setGameOver(false);
            navigate("/leaderboard");

        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label htmlFor="name">Please enter your name:</label>
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