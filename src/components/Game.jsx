import Dropdown from "./Dropdown"
import { useState, useRef, useEffect } from "react";
import styles from "../styles/game.module.css"
import Header from "./Header";



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
        
        console.log(e.clientX);
        console.log(e.clientX);
        const rect = imageRef.current.getBoundingClientRect();
        setX(e.pageX - rect.left);
        setY(e.pageY - rect.top);

        const clickX = e.pageX - (rect.left + window.scrollX);
        const clickY = e.pageY - (rect.top + window.scrollY);
        const width = rect.width;
        const height = rect.height; 

        const percentX = (clickX / width) * 100;
        const percentY = (clickY / height) * 100;
        console.log("X", percentX, "Y", percentY)

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