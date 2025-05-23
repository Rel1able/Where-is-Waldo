import styles from "../styles/dropdown.module.css";
import { useRef, useEffect, useState , useContext} from "react";
import { GameContext } from "./Context";

export default function Dropdown({xShift, yShift, top, left, characters, x, y}) {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    let {timeoutId, setResponseAlert, setStatus, setClicked, setCharacters } = useContext(GameContext);
    const ref = useRef();
    useEffect(() => {
        const { offsetWidth, offsetHeight } = ref.current;
        setWidth(offsetWidth);
        setHeight(offsetHeight);
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
        if (res !== "Try again") {
            setStatus(`${characterName} ${res}`);
        } else {
            setStatus(res);
        }
        handleAlert()
        setClicked(false);
        if (res === "is found") {
            let foundCharacter = characters.find((character) => character.name === characterName);
            setCharacters(characters.map(character => {
                if (character.id === foundCharacter.id) {
                    return { ...character, found: true }
                } else {
                    return character
                }
            }))
            
        }
        
    }


   

    return (
        <div style={{top: `${top - height / 2}px`, left: `${left - width / 2}px`, flexDirection: yShift}} className={styles.dropdown}>
            <div ref={ref} className={styles.targetingBox}>
                <div className={styles.pointer}></div>
            </div>
            <div className={styles.charactersList}>
                {characters.map((character) => {
                    const found = character.found;
                    return <p key={character.id} className={styles.listItem}  style={
                        { background: found && "red", textDecoration: found && "line-through", right: xShift }
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