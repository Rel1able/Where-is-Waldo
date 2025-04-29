import { createContext, useState } from "react";

const GameContext = createContext()

function Context({ children }) {

        const [clicked, setClicked] = useState(false);
        const [responseAlert, setResponseAlert] = useState(false);
        const [status, setStatus] = useState("");
    return (
        <GameContext.Provider value={{responseAlert, setResponseAlert, status, setStatus, clicked, setClicked}}>
            {children}
        </GameContext.Provider>
    )
}

export {GameContext, Context}