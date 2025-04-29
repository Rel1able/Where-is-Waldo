import styles from "../styles/dropdown.module.css";
import { useRef, useEffect, useState , useContext} from "react";
import { GameContext } from "./Context";

export default function Dropdown({ top, left, characters, x, y}) {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    let {timeoutId, setResponseAlert, setStatus, setClicked, setCharacters } = useContext(GameContext);
    const ref = useRef();
    useEffect(() => {
        const { offsetWidth, offsetHeight } = ref.current;
        console.log("WIDTH", offsetWidth, "HEIGHT", offsetHeight)
        setWidth(offsetWidth);
        setHeight(offsetHeight);
        console.log(offsetWidth, offsetHeight)
    }, [])

    

    function handleAlert() {
        setResponseAlert(true);
        timeoutId.current = setTimeout(() => {
            setResponseAlert(false);
        }, 2000)
    }

    async function handleClick(characterName) {
        const req = await fetch(`https://where-is-waldo-api.onrender.com/${characterName}?x=${x}&y=${y}`);
        const res = await req.json();
        setStatus(`${characterName} is ${res}`);
        console.log(`${characterName} is ${res}`);
        handleAlert()
        setClicked(false);
        if (res === "You are right") {
            let foundCharacter = characters.find((character) => character.name === characterName);
            console.log(foundCharacter);
            setCharacters(characters.map(character => {
                if (character.id === foundCharacter.id) {
                    return { ...character, found: true }
                } else {
                    return character
                }
            }))
            
        }
        console.log(characters);
        
    }


   

    return (
        <div style={{top: `${top - height / 2}px`, left: `${left - width / 2}px`}} className={styles.dropdown}>
            <div ref={ref} className={styles.targetingBox}>
                <div className={styles.pointer}></div>
            </div>
            <div className={styles.charactersList}>
                {characters.map((character) => {
                    const found = character.found;
                    return <p className={styles.listItem}  style={
                        { background: found && "red", textDecoration: found && "line-through" }
                    } onClick={found ? null : () => handleClick(character.name)}>
                        <img src={`${character.name}.png`}/>
                        {character.name}
                    </p>
                }
                    
                   
                )}
            </div>
        </div>

    )
}