import { Button } from "@mui/material"

export default function Controls({handleShuffle, handleReset, handleMouseDown, text}) {

  return(
    <div style={{marginTop: 10}}>
      <Button variant="contained" onMouseDown={handleMouseDown} onClick={handleShuffle}>Shuffle</Button>
      <Button variant="outlined" onMouseDown={handleMouseDown} onClick={handleReset} disabled={!text.length}>Reset</Button>
    </div>
  )
}