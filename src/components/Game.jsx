import Dropdown from "./Dropdown"
import { useState, useRef, useEffect } from "react";
import styles from "../styles/game.module.css"
import Header from "./Header";
import FindBar from "./FindBar";


export default function Game() {
    const [clicked, setClicked] = useState(false);
    const [x, setX] = useState("");
    const [y, setY] = useState("");
    const [res, setRes] = useState("");
    const ref = useRef();
    const dropdownRef = useRef();


    async function handleClick(e) {
        setClicked(true);
        console.log(e);
        setX(e.pageX);
        setY(e.pageY);
        console.log("X IS ", e.pageX);
        console.log("Y IS ", e.pageY);
        const req = await fetch(`https://where-is-waldo-api.onrender.com/misterio?x=${e.pageX}&y=${e.pageY}`);
        const res = await req.json();
        setRes(res);
        console.log(res);
        

    }

    useEffect(() => {
        function handler(e) {
            if (ref.current && !ref.current.contains(e.target)
            && !dropdownRef.current && !dropdownRef.current.contains(e.target)) {
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
            <FindBar />
            
            <div ref={ref} className={styles.container}>
                <div   className={styles.image} onClick={handleClick}>
                    <img  src="img.jpg"/>
                </div>
                {clicked  && <Dropdown ref={dropdownRef} top={y} left={x} />}
            </div>
            {res && <h1>{res}</h1>}
        </>

    )
}