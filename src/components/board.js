import React from 'react'
const generate = require('./generation')

const Board = ({difficulty, visibility, isPlaying}) => {
    if(isPlaying){
        const keys = [...Array(difficulty**2).keys()]
        const pairs = generate(difficulty)
        return (
            <div class={`w-64 h-64 md:w-96 md:h-96 bg-green-300 border-2 border-black grid grid-cols-${difficulty} grid-rows-${difficulty} gap-1 p-1.5`}>
            {
                keys.map(key => {
                    return (
                        visibility 
                        ? <div class="w-full h-full max-w-xs bg-red-500 hover:bg-red-400 cursor-pointer grid place-items-center text-lg font-semibold text-white" key={key} data-value={pairs[key]}>{pairs[key]}</div>
                        : <div class="w-full h-full max-w-xs bg-red-500 hover:bg-red-400 cursor-pointer grid place-items-center text-lg font-semibold text-white" key={key} data-value={pairs[key]}></div>
                    )
                })
            }
            </div>
        )
    }
    else{
        return (
            <div class="w-64 h-64 md:w-96 md:h-96 bg-green-300 border-2 border-black grid place-items-center">
                <p>Choose a difficulty to start</p>
            </div>
        )
    }
}

export default Board