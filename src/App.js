import React, {useState, useEffect} from 'react'
import './App.css';
import Board from './components/board'
import Difficulty from './components/difficulty'
import Counter from './components/counter'

function App() {
  const [difficulty, setDifficulty] = useState()
  const [visibility, setVisibility] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [time, setTime] = useState()
  const [cantWins, setCantWins] = useState(0)
  const [cantLoses, setCantLoses] = useState(0)

  const handleWinOrLose = (setStateFunc) => {
    setStateFunc(prev => prev + 1)
    setVisibility(false)
    setIsPlaying(false)
    setTime(null)
    setDifficulty(null)
  }

  useEffect(() => {
      setTimeout(() => {
        setVisibility(false)
      }, time);
      // return () => clearTimeout(timer)
  }, [time])

  const handleDifficulty = (difficulty) => {
    setIsPlaying(true)
    setVisibility(true)
    setDifficulty(difficulty)

    if(difficulty === 3){
      setTime(5000) 
    }
    else if(difficulty === 5){
      setTime(7000) 
    }
    else if(difficulty === 7){
      setTime(10000) 
    }
  }

  return (
    <>
      <div className="back"></div>

      <div class="flex flex-col items-center justify-center space-y-5 w-screen h-screen">
          <Difficulty handleDifficulty={handleDifficulty}/>
          <Board difficulty={difficulty} visibility={visibility} isPlaying={isPlaying} handleWinning={() => handleWinOrLose(setCantWins)} handleLosing={() => handleWinOrLose(setCantLoses)}/>
          { visibility ? <Counter initialSeconds={time}/> : null }
  
      <div class="grid grid-cols-2 place-items-center">
        <div class="p-4 bg-red-500 grid place-items-center rounded">
          <h1>Loses</h1>
          <h2>{cantLoses}</h2>
        </div>
        <div class="p-4 bg-green-500 grid place-items-center rounded">
          <h1>Wins</h1>
          <h2>{cantWins}</h2>
        </div>
      </div>
      
      </div>
    </>
  );  
}

export default App;
