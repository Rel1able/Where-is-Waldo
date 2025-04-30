import Dropdown from "./Dropdown"
import { useState, useRef, useEffect, useContext } from "react";
import styles from "../styles/game.module.css"
import Header from "./Header";
import { GameContext } from "./Context";
import FindBar from "./FindBar";



export default function Game() {

    const [xCoord, setXCoord] = useState(0);
    const [yCoord, setYCoord] = useState(0);
    const [x, setX] = useState("");
    const [y, setY] = useState("");
    const [res, setRes] = useState("");
    const BOX_SIZE = 75;
    const {characters, setCharacters, status, responseAlert, clicked, setClicked, setResponseAlert, timeoutId } = useContext(GameContext);

    const [percentX, setPercentX] = useState(0);
    const [percentY, setPercentY] = useState(0);

   

    useEffect(() => {
        async function getCharacters() {
            const req = await fetch("https://where-is-waldo-api.onrender.com");
            const res = await req.json();
            console.log("CHaracters", res);
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
        console.log(e);
        setXCoord(e.pageX);
        setYCoord(e.pageY);
        console.log(e.clientX);
        console.log(e.clientX);
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
        console.log("X", percentX, "Y", percentY)
        setRes(res);
        setResponseAlert(false);

        console.log(res);

        
        console.log("X IS ", x, "Y IS ", y, "PERCENT X IS ", percentX, "PERCENT Y IS ", percentY)
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

    return (
        <>
            <Header />
            <FindBar characters={characters}/>
            {responseAlert && <p style={{left: xCoord - BOX_SIZE, top: yCoord - BOX_SIZE}} className={styles.alert}>{status}</p>}
            <div  className={styles.container}>
                <div ref={ref}  className={styles.imageContainer} onClick={handleClick}>
                    <img ref={imageRef} className={styles.image}  src="img.jpg"/>
                    
                </div>
                {characters.map((character) => 
                        character.found ? (
                            <div className={styles.marker} style={{left: `${character.coordinates.x}%`, top: `${character.coordinates.y}%`}}></div>
                    ) : null )}
                {clicked  && <Dropdown x={percentX} y={percentY} characters={characters} ref={dropdownRef} top={y} left={x} />}
            </div>
        </>

    )
}