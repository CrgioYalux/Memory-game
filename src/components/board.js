import React, {useEffect, useState} from 'react'
const generate = require('./generation')

const Board = ({difficulty = 0, visibility, isPlaying}) => {
    const [pairs, setPairs] = useState()
    const [cantBoxes, setCantBoxes] = useState(0)

    useEffect(()=>{
        setCantBoxes(difficulty)
    },[difficulty])

    useEffect(() => {
        const keys = [...Array(cantBoxes**2).keys()]
        const values = generate(cantBoxes)
        setPairs(
            keys.reduce((acc, key) => {
                return [...acc, {key:key, value:values[key], active:false}]
            }, [])
        )
    }, [cantBoxes])

    const handleClick = (e) => {
        setPairs(pairs.reduce((acc, pair) => {
                // console.log(`(obj):${pair.key}\n(new):${e.target.dataset.key}`);
                if (pair.key === Number(e.target.dataset.key)) return [...acc, {key:pair.key, value:pair.value, active:true}]
                else return [...acc, {key:pair.key, value:pair.value, active:pair.active}]
            }, []))
        console.log(pairs);
    }

    if(isPlaying){
        return (
            <div class={`w-64 h-64 md:w-96 md:h-96 bg-green-300 border-2 border-black grid grid-cols-${difficulty} grid-rows-${difficulty} gap-1 p-1.5`}>
            {
                pairs.map(pair => {
                    return (
                        visibility 
                        ? <div class="w-full h-full max-w-xs bg-red-500 hover:bg-red-400 cursor-pointer grid place-items-center text-lg font-semibold text-white" key={pair.key} data-value={pair.value}>{pair.value}</div>
                        : pair.active 
                            ? <div class="w-full h-full max-w-xs bg-yellow-300 hover:bg-red-200 cursor-pointer grid place-items-center text-lg font-semibold text-white" key={pair.key} data-key={pair.key} data-value={pair.value} data-active={pair.active} onClick={(e)=>{handleClick(e)}}></div>
                            : <div class="w-full h-full max-w-xs bg-red-500 hover:bg-red-400 cursor-pointer grid place-items-center text-lg font-semibold text-white" key={pair.key} data-key={pair.key} data-value={pair.value} data-active={pair.active} onClick={(e)=>{handleClick(e)}}></div>

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