import { Play, Stop } from "phosphor-react";
import { createContext, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";

interface Cycle {
    id: string,
    task: string,
    minutesAmount: number,
    startDate: Date,
    interruptedDate?: Date,
    finishedDate?: Date
}

interface CyclesContextType {
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    markCycleAsFinished: () => void;
    amountSecondsPassed: number;
    setSecondsPassed: (seconds: number) => void;
}

interface NewCycleFormData {
    task: string,
    minutesAmount: number
}

export const CyclesContext = createContext({} as CyclesContextType)

export function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const newCycleForm = useForm<NewCycleFormData>({
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    });

    const { handleSubmit, watch, reset } = newCycleForm

    const activeCycle: any = cycles.find(cycle => cycle.id === activeCycleId)

    // Verificando se tem valor no input de task para habilitar o botão de submit
    const task = watch('task')

    function markCycleAsFinished() {
        setCycles(state =>
            state.map((cycle) => {
                if (cycle.id === activeCycleId) {
                    return { ...cycle, finishedDate: new Date() }
                } else {
                    return cycle
                }
            })
        )
    }

    function setSecondsPassed(seconds: number){
        setAmountSecondsPassed(seconds)
    }

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

    function handleInterruptCycle() {
        setCycles(state =>
            state.map((cycle) => {
                if (cycle.id === activeCycleId) {
                    return { ...cycle, interruptedDate: new Date() }
                } else {
                    return cycle
                }
            })
        )

        setActiveCycleId(null)
    }


    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleSubmitForm)}>
                <CyclesContext.Provider value={{ activeCycle, activeCycleId, markCycleAsFinished, amountSecondsPassed, setSecondsPassed }}>
                    <FormProvider {...newCycleForm}>
                        <NewCycleForm />
                    </FormProvider>
                    <Countdown />
                </CyclesContext.Provider>

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