import styles from "../styles/findBar.module.css";


export default function FindBar({ characters }) {
    
    return (
        <nav>
            <ul className={styles.list}>
                {characters.map((character) => {
                    const found = character.found; 
                    return <li style={{background: found && "red", textDecoration: found && "line-through"}} key={character.id}>{character.name}</li>
                }

                    
                )}
            </ul>
        </nav>
    )
}