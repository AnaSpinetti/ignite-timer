import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { CyclesContext } from "../..";
import { FormContainer, TaskInput, TaskInputAmount } from "./styles";



export function NewCycleForm(){
    const {activeCycle} = useContext(CyclesContext)
    const {register} = useFormContext()
    
    return(
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
    )
}