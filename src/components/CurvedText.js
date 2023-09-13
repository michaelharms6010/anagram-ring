import React, {useState, useEffect} from 'react'
import { TextField } from '@mui/material'
import Controls from "./Controls"
const LENGTH_LIMIT = 15

export default ({initialText}) => {
  const [text, setText] = useState(initialText || "")
  const [charCount, setCharCount] = useState(text.length)
  const [angleStep, setAngleStep] = useState(360 / (charCount + 1))
  const radius = 100;

  const shuffleString = str => [...str].sort( _ => 0.5 - Math.random() ).join('');
  
  const handleShuffle = _ => {
    setText(shuffleString(text))
  }

  const handleReset = _ => setText("")

  useEffect(_ => {
    setCharCount(text.length)
    setAngleStep(360 / (text.length))
  }, [text])

  const getCirclePosition = (angle, radius) => {
    const radian = (angle * Math.PI) / 180;
    const x = radius + (radius * Math.sin(radian));
    const y = radius + (radius * Math.cos(radian));
    
    return { x, y };
  }

  const handleChange = e => {
    if (e.target.value.length <= LENGTH_LIMIT) {
      setText(e.target.value.replace(/[^a-z]/ig, "").toUpperCase())
    }
  }
  
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
              }}
            >
              {char}
            </div>
          );
        })}
      </div>
      <TextField
        style={{marginTop: 50, width: 300}}
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
