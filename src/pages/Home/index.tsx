import { Play } from "phosphor-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CountdownContainer, FormContainer, HomeContainer, Separator, StartCountdownButton, TaskInput, TaskInputAmount } from "./styles";

interface NewCycleFormData{
    task: string,
    minutesAmount: number
}

interface Cycle{
    id: string,
    task: string,
    minutesAmount: number
}

export function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
    
    const {register, handleSubmit, watch, reset} = useForm<NewCycleFormData>({
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    });

    // Verificando se tem valor no input de task para habilitar o botão de submit
    const task = watch('task')

    // Colocando o ciclo na tela
    const activeCycle = cycles.find(cycle => cycle.id === activeCycle)

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
    const minutesAmount = Math.floor(currentSeconds / 60)
    const secondsAmount = currentSeconds % 60

    // Utilizando o padStart para preencher com um caractere a mais caso os minutos tenha um caractere só
    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0')

    function handleSubmitForm(data: NewCycleFormData){
        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.minutesAmount,
        }

        setCycles(state => [...state, newCycle])
        setActiveCycleId(newCycle.id)

        reset();
    }
    
    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleSubmitForm)}>
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput id="task" placeholder="Dê um nome para o seu projeto" {...register('task')} />

                    <label htmlFor="minutesAmount">durante</label>
                    <TaskInputAmount list="task-suggestions" placeholder="00" step={2} min={1} max={60} type="number" id="minutesAmount" {...register('minutesAmount', {valueAsNumber: true})} />
                    
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

                <StartCountdownButton disabled={!task} type="submit">
                    <Play size={24} />
                    Começar
                </StartCountdownButton>
            </form>
        </HomeContainer>
    )
}