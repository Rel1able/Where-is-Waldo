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
    const imageRef = useRef();



    async function handleClick(e) {
        setClicked(true);
        console.log(e);
        setX(e.pageX);
        setY(e.pageY);
        console.log("X IS ", e.pageX);
        console.log("Y IS ", e.pageY);
        const rect = imageRef.current.getBoundingClientRect();

        const left = e.pageX - rect.left;
        const top = e.pageY - (rect.top + window.scrollY);
        const width = rect.width;
        const height = rect.height; 

        const percentX = (left / width) * 100;
        const percentY = (top / height) * 100;

        console.log("PERCENT XXX", percentX);
        console.log("PERCENT YYY", percentY);

        console.log("LEFT", left, "TOP", top)
        console.log("RECT", rect);

        const req = await fetch(`https://where-is-waldo-api.onrender.com/misterio?x=${percentX}&y=${percentY}`);
        const res = await req.json();
        setRes(res);
        console.log(res);

        

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
            <FindBar />
            
            <div  className={styles.container}>
                <div ref={ref}  className={styles.imageContainer} onClick={handleClick}>
                    <img ref={imageRef} className={styles.image}  src="img.jpg"/>
                </div>
                {clicked  && <Dropdown ref={dropdownRef} top={y} left={x} />}
            </div>
            {res && <h1>{res}</h1>}
        </>

    )
}