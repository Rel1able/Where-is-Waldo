import styles from "../styles/dropdown.module.css";
import { useRef, useEffect, useState } from "react";

export default function Dropdown({ top, left ,}) {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    useEffect(() => {
        const { offsetWidth, offsetHeight } = ref.current;
        setWidth(offsetWidth);
        setHeight(offsetHeight);
        console.log(offsetWidth, offsetHeight)
    }, [])


    const ref = useRef();

    return (
        <div style={{top: `${top - height / 2}px`, left: `${left - (width / 2)}px`}} className={styles.dropdown}>
            <div ref={ref} className={styles.targetingBox}>
                <div className={styles.pointer}></div>
            </div>
            <div className={styles.charactersList}>
                <p>Char 1</p>
                <p>Char 2</p>
                <p>Char 3</p>
            </div>
        </div>

    )
}