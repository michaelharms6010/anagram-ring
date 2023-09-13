import { Button } from "@mui/material"

export default ({handleShuffle, handleReset, text}) => {

  return(
    <div style={{marginTop: 10}}>
      <Button variant="contained" onClick={handleShuffle}>Shuffle</Button>
      <Button variant="outlined" onClick={handleReset} disabled={!text.length}>Reset</Button>
    </div>
  )
}