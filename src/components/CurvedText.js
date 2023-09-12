import React, {useState, useEffect} from 'react'
import { TextField } from '@mui/material'
import Controls from "./Controls"
const LENGTH_LIMIT = 15

export default ({initialText}) => {
  const [text, setText] = useState(initialText || "")
  const [charCount, setCharCount] = useState(text.length)
  const [angleStep, setAngleStep] = useState(360 / (charCount + 1))
  const radius = 100; // Define radius as required

  const shuffleString = s => s.split('').sort(() => 0.5 - Math.random()).join('');
  const handleShuffle = _ => {
    setText(shuffleString(text))
  }

  const handleReset = _ => setText("")

  useEffect(_ => {
    setCharCount(text.length)
    setAngleStep(360 / (text.length))
  }, [text])

  const getCirclePosition = (angle, radius) => {
      // Convert the angle to radians
      const radian = (angle * Math.PI) / 180;
      
      // Calculate x and y using sin and cos
      const x = radius + (radius * Math.sin(radian));
      const y = radius + (radius * Math.cos(radian));
      
      return { x, y };
  }

  const handleChange = e => {
    if (e.target.value.length <= LENGTH_LIMIT) {
      setText(e.target.value.replace(/[^a-z]/ig, ""))
    }
  }

      // const text = this.props.text.replace(/[^a-z]/ig, "");


      return (
        <div className="curved-text-container">
      

          <div style={{ marginBottom: 10, position: 'relative', width: 2*radius, height: 2*radius }}>
            {Array.from(text).map((char, index) => {
              const angle = angleStep * index;
              const position = getCirclePosition(angle, radius);

              return (
                <div
                  key={index}
                  style={{
                      position: 'absolute',
                      left: `${position.x}px`,
                      top: `${position.y}px`,
                      fontSize: 24
                      // transform: `rotate(${angle + 90}deg)`
                  }}
                >
                  {char.toUpperCase()}
                </div>
              );
            })}
          </div>
          <TextField
            style={{marginTop: 50}}
            placeholder="Enter letters to anagram" 
            value={text} 
            onChange={handleChange} 
          />
          <Controls 
            handleShuffle={handleShuffle}
            handleReset={handleReset}
            text={text}

          />
        </div>
      );
  
}

