import React from 'react'

const Difficulty = ({handleDifficulty}) => {
    return (
        <div class="grid grid-cols-3 gap-1 w-40">
            <button onClick={()=>{handleDifficulty(3)}} class="shadow-inner shadow-2xl h-full w-full border-2 border-black bg-indigo-400 p-1 grid place-items-center rounded-lg hover:bg-indigo-300 font-semibold">3x3</button>
            <button onClick={()=>{handleDifficulty(5)}} class="shadow-inner shadow-2xl h-full w-full border-2 border-black bg-indigo-400 p-1 grid place-items-center rounded-lg hover:bg-indigo-300 font-semibold">5x5</button>
            <button onClick={()=>{handleDifficulty(7)}} class="shadow-inner shadow-2xl h-full w-full border-2 border-black bg-indigo-400 p-1 grid place-items-center rounded-lg hover:bg-indigo-300 font-semibold">7x7</button>
        </div>
    )
}

export default Difficulty