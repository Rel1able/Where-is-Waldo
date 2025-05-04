import Header from "./Header"
import { useState, useEffect } from "react";

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
                <ul style={{color: "white"}}>
                    {players.map((player) => (
                        <li>{player.name} {player.bestTime}</li>
                    ))}
                </ul>}
        </>
    )
}