import './css/animation.css'
import React, {useEffect, useState} from 'react'
import generate from './generation'

const Board = ({difficulty = 0, visibility, isPlaying, handleWinning, handleLosing}) => {
    const [selected, setSelected] = useState([])
    const [matches, setMatches] = useState([])
    const [pairs, setPairs] = useState([])

    useEffect(() => {
        if((matches.length * 2) === (difficulty**2 - 1)) {
            console.log("one");
            const checks = document.querySelectorAll('.checked')
            for(const check of checks){
                check.classList.add('win')
            }
            setTimeout(() => {
                for(const check of checks){
                check.classList.remove('win')
                setMatches([])
            }}, 2000)

            setTimeout(() => {
                handleWinning()
            }, 2001)
        }
    }, [matches])


    useEffect(() => {
        if (difficulty) {    
            console.log("two");
            const keys = [...Array(difficulty**2).keys()]
            const values = generate(difficulty)
            setPairs(
                keys.reduce((acc, key) => {
                    return [...acc, {key:key, value:values[key], active:false}]
                }, [])
                )
                setSelected([])
        }
    }, [difficulty])

    useEffect(() => {
        if (selected.length === 2){
            console.log("three");
            if (selected[0].value === selected[1].value){
                setMatches(prev => {
                    return [...prev, [selected[0].key, selected[1].key]]
                })
            }
            else {
                setPairs(
                    pairs.reduce((acc, pair) => {
                        if (selected[0].key === pair.key || selected[1].key === pair.key) return [...acc, {key:pair.key, value:pair.value, active:false}]
                        else {
                            if (pair.active) return [...acc, {key:pair.key, value:pair.value, active:true}]
                            else return [...acc, {key:pair.key, value:pair.value, active:false}]
                        }
                    }, [])
                )
            }
            setSelected([])
        }
    }, [selected, pairs])

    const handleClick = (e) => {
            if(e.target.dataset.value === "!"){
                e.target.classList.add('lose')
                setTimeout(() => {
                    setSelected([])
                    setMatches([])
                    e.target.classList.remove('lose')
                }, 2000)
                setTimeout(() => {
                    handleLosing()
                }, 2001)
            }
            else{
                setPairs(pairs.reduce((acc, pair) => {
                    if (pair.key === Number(e.target.dataset.key)) {
                        setSelected(prev => {
                            return [...prev, {key:pair.key, value:pair.value}]
                        })      
                        return [...acc, {key:pair.key, value:pair.value, active:true}]
                    }
                    else return [...acc, {key:pair.key, value:pair.value, active:pair.active}]
                }, []))
            }
        }
    

    if(isPlaying){
        return (
            <div class={`w-64 h-64 md:w-96 md:h-96 bg-green-300 border-2 border-black grid grid-cols-${difficulty} grid-rows-${difficulty} gap-1 p-1.5`}>
            {
                pairs.map(pair => {
                    return (
                        visibility 
                        ? <div class="w-full h-full  bg-red-500 hover:bg-red-400 cursor-pointer grid place-items-center text-lg font-semibold text-white" key={pair.key} data-value={pair.value}>{pair.value}</div>
                        : pair.active 
                            ? <div class="checked w-full h-full  bg-yellow-300 hover:bg-red-200 cursor-pointer grid place-items-center text-lg font-semibold text-white" key={pair.key} data-key={pair.key} data-value={pair.value} data-active={pair.active}>{pair.value}</div>
                            : <div class="w-full h-full  bg-red-500 hover:bg-red-400 cursor-pointer grid place-items-center text-lg font-semibold text-white text-opacity-0" key={pair.key} data-key={pair.key} data-value={pair.value} data-active={pair.active} onClick={(e)=>{handleClick(e)}}>?</div>
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