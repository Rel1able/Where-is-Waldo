import styles from "../styles/findBar.module.css";


export default function FindBar({ characters }) {
    
    return (
        <nav>
            <ul className={styles.list}>
                {characters.map((character) => {
                    const found = character.found; 
                    return <li className={styles.listItem} style={{ background: found && "red", textDecoration: found && "line-through" }} key={character.id}>
                        <img className={styles.img} src={`${character.name}.png`}/>
                        {character.name}
                    </li>
                }

                    
                )}
            </ul>
        </nav>
    )
}