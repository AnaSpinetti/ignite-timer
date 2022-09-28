import { Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { CountdownContainer, FormContainer, HomeContainer, Separator, StartCountdownButton, TaskInput, TaskInputAmount } from "./styles";

interface NewCycleFormData{
    task: string,
    minutesAmount: number
}

export function Home() {
    const {register, handleSubmit, watch, reset} = useForm<NewCycleFormData>({
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    });

    // Verificando se tem valor no input de task para habilitar o botão de submit
    const task = watch('task')

    function handleSubmitForm(data: NewCycleFormData){
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
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>

                <StartCountdownButton disabled={!task} type="submit">
                    <Play size={24} />
                    Começar
                </StartCountdownButton>
            </form>
        </HomeContainer>
    )
}