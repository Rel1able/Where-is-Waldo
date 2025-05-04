import { createContext, useState, useRef } from "react";

const GameContext = createContext()

function Context({ children }) {

    const [clicked, setClicked] = useState(false);
    const [responseAlert, setResponseAlert] = useState(false);
    const [status, setStatus] = useState("");
     const [characters, setCharacters] = useState([]);
    const timeoutId = useRef(null);
    const [gameOver, setGameOver] = useState(false);
    const [time, setTime] = useState(0);
    return (
        <GameContext.Provider value={{time, setTime,characters, setCharacters,timeoutId, responseAlert, setResponseAlert, status, setStatus, clicked, setClicked, gameOver, setGameOver}}>
            {children}
        </GameContext.Provider>
    )
}

export {GameContext, Context}