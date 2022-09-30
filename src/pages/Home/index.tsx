import { Play, Stop } from "phosphor-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CountdownContainer, FormContainer, HomeContainer, Separator, StartCountdownButton, StopCountdownButton, TaskInput, TaskInputAmount } from "./styles";
import { differenceInSeconds } from 'date-fns';

interface NewCycleFormData {
    task: string,
    minutesAmount: number
}

interface Cycle {
    id: string,
    task: string,
    minutesAmount: number,
    startDate: Date,
    interruptedDate?: Date,
    finishedDate?: Date
}

export function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
    
    const activeCycle: any = cycles.find(cycle => cycle.id === activeCycleId)

    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    });

    // Verificando se tem valor no input de task para habilitar o botão de submit
    const task = watch('task')

    // Colocando o ciclo na tela

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
    const minutesAmount = Math.floor(currentSeconds / 60)
    const secondsAmount = currentSeconds % 60

    // Utilizando o padStart para preencher com um caractere a mais caso os minutos tenha um caractere só
    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0')

    useEffect(() => {

        let interval: number | any;

        if (activeCycle) {
            interval = setInterval(() => {
                const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate)

                if(secondsDifference >= totalSeconds){
                    setCycles( state => 
                        state.map((cycle) => {
                            if(cycle.id === activeCycleId){
                                return {...cycle, finishedDate: new Date()}
                            }else{
                                return cycle
                            }
                        })
                    )

                    setAmountSecondsPassed(totalSeconds)
                    clearInterval(interval)
                }else{
                    setAmountSecondsPassed(secondsDifference)
                }

            }, 1000)
        }

        return () => {
            clearInterval(interval)
        }
    }, [activeCycle, totalSeconds, activeCycleId])


    function handleSubmitForm(data: NewCycleFormData) {
        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }

        setCycles(state => [...state, newCycle])
        setActiveCycleId(newCycle.id)
        setAmountSecondsPassed(0)

        reset();
    }

    function handleInterruptCycle(){
        setCycles( state => 
            state.map((cycle) => {
                if(cycle.id === activeCycleId){
                    return {...cycle, interruptedDate: new Date()}
                }else{
                    return cycle
                }
            })
        )

        setActiveCycleId(null)
    }

    useEffect(() => {
        if (activeCycle) {
            document.title = `${minutes}:${seconds}`
        }
    }, [minutes, seconds, activeCycle])

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleSubmitForm)}>
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput disabled={!!activeCycle} id="task" placeholder="Dê um nome para o seu projeto" {...register('task')} />

                    <label htmlFor="minutesAmount">durante</label>
                    <TaskInputAmount disabled={!!activeCycle} list="task-suggestions" placeholder="00" step={2} min={1} max={60} type="number" id="minutesAmount" {...register('minutesAmount', { valueAsNumber: true })} />

                    <datalist id="task-suggestions">
                        <option value="" />
                    </datalist>

                    <span>minutos.</span>
                </FormContainer>

                <CountdownContainer>
                    <span>{minutes[0]}</span>
                    <span>{minutes[1]}</span>
                    <Separator>:</Separator>
                    <span>{seconds[0]}</span>
                    <span>{seconds[1]}</span>
                </CountdownContainer>

                {activeCycle ? (
                    <StopCountdownButton onClick={handleInterruptCycle} type="button">
                        <Stop size={24} />
                        Parar
                    </StopCountdownButton>
                ) : (
                    <StartCountdownButton disabled={!task} type="submit">
                        <Play size={24} />
                        Começar
                    </StartCountdownButton>
                )}
            </form>
        </HomeContainer>
    )
}