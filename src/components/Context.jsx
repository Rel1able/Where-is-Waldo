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

    function resetGame() {
    setClicked(false);
    setResponseAlert(false);
    setStatus("");
    setCharacters([]);
    setGameOver(false);
    setTime(0);
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
    }
    }
    
    return (
        <GameContext.Provider value={{resetGame, time, setTime,characters, setCharacters,timeoutId, responseAlert, setResponseAlert, status, setStatus, clicked, setClicked, gameOver, setGameOver}}>
            {children}
        </GameContext.Provider>
    )
}

export {GameContext, Context}