import { differenceInSeconds } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { CyclesContext } from "../..";
import { CountdownContainer, Separator } from "./styles";


export function Countdown(){
    const {activeCycle, activeCycleId, markCycleAsFinished, amountSecondsPassed, setSecondsPassed} = useContext(CyclesContext)

        // Colocando o ciclo na tela
    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
    const minutesAmount = Math.floor(currentSeconds / 60)
    const secondsAmount = currentSeconds % 60
    
        // Utilizando o padStart para preencher com um caractere a mais caso os minutos tenha um caractere só
    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0')
    
    useEffect(() => {
        if (activeCycle) {
            document.title = `${minutes}:${seconds}`
        }
    }, [minutes, seconds, activeCycle])
    

    useEffect(() => {
        let interval: number | any;

        if (activeCycle) {
            interval = setInterval(() => {
                const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate)

                if(secondsDifference >= totalSeconds){
                    markCycleAsFinished()
                    setSecondsPassed(totalSeconds)
                    clearInterval(interval)
                }else{
                    setSecondsPassed(secondsDifference)
                }
            }, 1000)
        }
        return () => {
            clearInterval(interval)
        }
    }, [activeCycle, totalSeconds, activeCycleId, markCycleAsFinished, setSecondsPassed])
    
    return(
        <CountdownContainer>
        <span>{minutes[0]}</span>
        <span>{minutes[1]}</span>
        <Separator>:</Separator>
        <span>{seconds[0]}</span>
        <span>{seconds[1]}</span>
    </CountdownContainer>
    )
}