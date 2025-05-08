import Header from "./Header"
import { useState, useEffect} from "react";
import styles from "../styles/leaderboard.module.css";

export default function LeaderBoard() {

    const [players, setPlayers] = useState([]);

    useEffect(() => {
        async function getLeaderboard() {
            const req = await fetch("https://where-is-waldo-api.onrender.com/game/leaderboard");
            const res = await req.json();
            setPlayers(res.players);
            console.log("Leaderboard,", res);
        }
        getLeaderboard();
    }, [])


    return (
        <>
            <Header />
            {players.length === 0 ? <h1>Loading...</h1> : 
                <div className={styles.container}>
                    <h1>Best results</h1>
                    <div className={styles.tableTitle}>
                        <h3>Username</h3>
                        <h3>Time in seconds</h3>
                    </div>
                    
                <ul className={styles.list} style={{color: "white"}}>
                    {players.map((player, id) => (
                        <li className={styles.listItem} key={id}><p>{player.username}</p><p>{player.duration}</p></li>
                    ))}
                </ul>
                </div>
                }
        </>
    )
}