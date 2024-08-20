import React, {useState, useCallback, useEffect, useRef} from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const generatePassword = useCallback(
    () => {
      let pass = "";
      let char = 0;

      let alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      const numbers = "1234567890"
      const special = "!@#$%^&*()_+=:;<>?"

      
      if(numbersAllowed){
        alphabets += numbers;
      }
      if(charAllowed){
        alphabets += special;
      }

      const lengthalpha = alphabets.length;

      for (let i = 1 ; i < length ; i++){
        char = Math.floor((Math.random()*lengthalpha)+1);
        pass += alphabets.charAt(char)
      }

      setPassword(pass)
  } , [length, numbersAllowed, charAllowed]);

  const passRef = useRef(null)

  const copyPass = () => {
    window.navigator.clipboard.writeText(password);
    passRef.current.select();
  }

  useEffect(() => {
    generatePassword();
  }, [length, charAllowed, numbersAllowed, generatePassword])

  


  return (

    <>
    <div className="Heading">Generate Strong Passwords!.</div>
    <div className="box">

      <div className="inputSection">
        <input
        placeholder="Password..."
        value={password}
        readOnly
        ref={passRef}
        ></input>
        <button
        onClick={copyPass}
        >Copy</button>
      </div>

      <div className="selection">


        <div className="length">
        <input
          type="range"
          min={6}
          max={30}
          onChange={ (e) => {
            setLength(e.target.value)
          }}
          value={length}
        ></input>
        <label htmlFor="length">Length : {length} </label>


        </div>
        <div className="numbers">
        <input
          type="checkbox"
          value={numbersAllowed}
          onChange={(e) => {
            setNumbersAllowed((prev) => !prev);
            
          }}
        
          ></input>
        <label htmlFor="numbers">Numbers </label>
        </div>


        <div className="characters">
        <input
          type="checkbox"
          value={charAllowed}
          onChange={(e) => {
            setCharAllowed((prev) => !prev);
          }}
          ></input>
          <label htmlFor="characters">Characters </label>
        </div>
        
      </div>

    </div>
    <footer>CopyRight 	<span>&#169;</span> 2023</footer>
    </>
  );
}

export default App;
