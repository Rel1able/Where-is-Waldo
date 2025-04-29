import { createContext, useState, useRef } from "react";

const GameContext = createContext()

function Context({ children }) {

    const [clicked, setClicked] = useState(false);
    const [responseAlert, setResponseAlert] = useState(false);
    const [status, setStatus] = useState("");
     const [characters, setCharacters] = useState([]);
    const timeoutId = useRef(null);
    return (
        <GameContext.Provider value={{characters, setCharacters,timeoutId, responseAlert, setResponseAlert, status, setStatus, clicked, setClicked}}>
            {children}
        </GameContext.Provider>
    )
}

export {GameContext, Context}