import Dropdown from "./components/Dropdown"
import { useState, useRef, useEffect } from "react";
import styles from "./styles/app.module.css";

function App() {
  const [clicked, setClicked] = useState(true);
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const ref = useRef();

  function handleClick(e) {
    setClicked(true);
    console.log(e);
    setX(e.pageX);
    setY(e.pageY);

  }

  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) {
          setClicked(false);
      }

    }
    document.addEventListener("mousedown", handler)
    return () => {
      document.removeEventListener("mousedown", handler);
    }
  }, [clicked])

  return (
    <div ref={ref} className={styles.container}>
      <div className={styles.image} onClick={handleClick}>
        <img  src="img.jpg"/>
      </div>
      {clicked && <Dropdown top={y} left={x} />}
    </div>
  )
}

export default App
