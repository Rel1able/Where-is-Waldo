import Dropdown from "./Dropdown"
import { useState, useRef, useEffect, useContext } from "react";
import styles from "../styles/game.module.css"
import Header from "./Header";
import { GameContext } from "./Context";
import FindBar from "./FindBar";
import GameOver from "./GameOver";



export default function Game() {

    const [pixelX, setPixelX] = useState(0);
    const [pixelY, setPixelY] = useState(0);
    const [x, setX] = useState("");
    const [y, setY] = useState("");
    const [res, setRes] = useState("");
    const BOX_SIZE = 75;
    const { characters, setGameOver, gameOver, setCharacters, status, responseAlert, clicked, setClicked, setResponseAlert, timeoutId } = useContext(GameContext);

    const [percentX, setPercentX] = useState(0);
    const [percentY, setPercentY] = useState(0);
    const [xShift, setXShift] = useState("");
    const [yShift, setYShift] = useState("");

    const [isRunning, setIsRunning] = useState(false);

    const [session, setSession] = useState("");
    const sessionId = parseInt(session.id);


    const charactersLeft = characters.filter((character) => character.found === false);

    useEffect(() => {
        async function startGame() {
            try {
                const req = await fetch("https://where-is-waldo-api.onrender.com/game/start", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json", 
                    }
                })
                const res = await req.json();
                setSession(res.session);
            
            } catch (err) {
                console.log(err);
            }
        }
        startGame();
        setGameOver(false);
        setIsRunning(true);
    }, [])


    useEffect(() => {
        if (characters.length > 0 && charactersLeft.length === 0) {
            setGameOver(true);
        }
    }, [charactersLeft, characters])


   

    useEffect(() => {
        async function getCharacters() {
            const req = await fetch("https://where-is-waldo-api.onrender.com");
            const res = await req.json();
            setCharacters(res);
        }
        getCharacters()
    }, [])

    const ref = useRef();
    const dropdownRef = useRef();
    const imageRef = useRef();




    async function handleClick(e) {
        if (timeoutId.current !== null) {
            window.clearTimeout(timeoutId.current);
        }
       
        setClicked(true);
        setPixelX(e.pageX);
        setPixelY(e.pageY);
        const rect = imageRef.current.getBoundingClientRect();

        const clickX = e.pageX - (rect.left + window.scrollX);
        const clickY = e.pageY - (rect.top + window.scrollY);
        const width = rect.width;
        const height = rect.height; 
        setX(clickX);
        setY(clickY);

        const percentX = (clickX / width) * 100;
        const percentY = (clickY / height) * 100;
        setPercentX(percentX);
        setPercentY(percentY);

        setRes(res);
        setResponseAlert(false);

        setYShift(percentY > 50 ? "column-reverse" : "column")
        setXShift(percentX > 50 ? "125px" : 0);

    }

    useEffect(() => {
        function handler(e) {
            if (ref.current && !ref.current.contains(e.target)
            && dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setClicked(false);
            }


        }
        document.addEventListener("mousedown", handler)
        return () => {
            document.removeEventListener("mousedown", handler);
        }
    }, [])

    useEffect(() => {
        async function saveTime() {
            await fetch("https://where-is-waldo-api.onrender.com/game/saveTime", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({sessionId})
                
            })
        }
        if (gameOver) {
            saveTime();
        }
        
    }, [gameOver])

    return (
        <>
            {gameOver && <GameOver sessionId={session.id} />}
             <div className={`${styles.pageWrapper} ${gameOver ? styles.blurred : ""}`}>
            
            <Header isRunning={isRunning} setIsRunning={setIsRunning} />
            <FindBar characters={characters}/>
            {responseAlert &&
                <p style={
                    {
                        left: pixelX - BOX_SIZE,
                        top: pixelY - BOX_SIZE,
                        background: status === "Try again" ? "red"
                            : "green"
                    }} className={styles.alert}>{status}</p>}
            <div  className={styles.container}>
                <div ref={ref}  className={styles.imageContainer} onClick={gameOver ? null : handleClick}>
                    <img ref={imageRef} className={styles.image}  src="img.jpg"/>
                    
                </div>
                {characters.map((character, id) => 
                        character.found ? (
                            <div key={id} className={styles.marker} style={{left: `${character.coordinates.x}%`, top: `${character.coordinates.y}%`}}></div>
                    ) : null )}
                {clicked  && <Dropdown yShift={yShift} xShift={xShift} x={percentX} y={percentY} characters={characters} ref={dropdownRef} top={y} left={x} />}
            </div>
        </div>
        </>
       

    )
}