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

  useEffect(()=>{
    if(difficulty === 3){
      setTime(5000) 
    }
    else if(difficulty === 5){
      setTime(7000) 
    }
    else if(difficulty === 7){
      setTime(10000) 
    }
  }, [difficulty])

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibility(false)
    }, time);
    return () => clearTimeout(timer)
  }, [time])

  const handleDifficulty = (difficulty) => {
    setDifficulty(difficulty)
    setIsPlaying(true)
    setVisibility(true)
  }

  return (
    <>
      <div className="back"></div>
      <div class="flex flex-col items-center justify-center space-y-5 w-screen h-screen">
          <Difficulty handleDifficulty={handleDifficulty}/>
          <Board difficulty={difficulty} visibility={visibility} isPlaying={isPlaying}/>
          { visibility ? <Counter initialSeconds={time}/> : null }
      </div>
    </>
  );  
}

export default App;
