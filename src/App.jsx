import Dropdown from "./components/Dropdown"
import { useState, useRef, useEffect } from "react";


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
    <div>
      <div  style={{border: "2px solid", width: "50%"}} ref={ref} onClick={handleClick}>
        <img  src="img.jpg"/>
      </div>
      <div style={{position: "absolute", top: `${y - 75}px`, left: `${x - 65}px`}}>
        {clicked && <Dropdown/>}
      </div>
    </div>
  )
}

export default App
