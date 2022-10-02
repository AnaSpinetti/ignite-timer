import { Play, Stop } from "phosphor-react";
import { Countdown } from "./components/Countdown";
import { FormProvider, useForm } from 'react-hook-form'
import { useContext } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { CyclesContext } from "../../contexts/CyclesContext";
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";

interface NewCycleFormData {
    task: string,
    minutesAmount: number
}

export function Home() {
    const { createNewCycle, interruptCurrentCycle, activeCycle } = useContext(CyclesContext)
    const newCycleForm = useForm<NewCycleFormData>({
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    });

    const { handleSubmit, watch, reset } = newCycleForm


    function handleCreateNewCycle(data: NewCycleFormData) {
        createNewCycle(data)
        reset()
    }

    // Verificando se tem valor no input de task para habilitar o botão de submit
    const task = watch('task')

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>

                <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                </FormProvider>
                <Countdown />

                {activeCycle ? (
                    <StopCountdownButton onClick={interruptCurrentCycle} type="button">
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