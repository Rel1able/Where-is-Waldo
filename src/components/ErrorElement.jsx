import { Link } from "react-router-dom"
import styles from "../styles/errorElement.module.css";

export default function ErrorElement() {
    return (
        <div className={styles.container}>
        <h1 className={styles.text}>This page does not exist <Link to="/">Go to the homepage</Link></h1>
            
        </div>
    )
}