import styled from "styled-components";

export const HomeContainer = styled.main`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    form{
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 3.5rem;
    }
`;

export const FormContainer = styled.main`
    width: 100%;
    align-items: center;
    justify-content: center;
    display: flex;
    gap: 0.5rem;
    color: ${props => props.theme["gray-100"]};
    font-size: 1.125rem;
    font-weight: bold;
    flex-wrap: wrap;
`;

export const CountdownContainer = styled.div`
    font-family: 'Roboto Mono', monospace;
    font-size: 10rem;
    line-height: 8rem;
    color: ${props => props.theme["gray-100"]};

    display: flex;
    gap: 1rem;

    span{
        background-color: ${props => props.theme["gray-700"]};
        padding: 2rem 1rem;
        border-radius: 8px;
    }
`;

export const Separator = styled.div`
    padding: 2rem 0;
    color: ${props => props.theme["green-500"]};
    width: 4rem;
    overflow: hidden;
    display: flex;
    justify-content: center;
`;

export const StartCountdownButton = styled.button`
    width: 100%;
    justify-content: center;
    align-items: center;
    border: 0;
    padding: 1rem;
    border-radius: 8px;
    display: flex;
    gap: 0.5rem;
    font-weight: bold;
    cursor: pointer;
    color: ${props => props.theme["gray-100"]};
    background: ${props => props.theme["green-500"]};
    
    &:hover{
        background: ${props => props.theme["green-700"]};

    }
`;

const BaseInput = styled.input`
    background-color: transparent;
    height: 2.5rem;
    border: 0;
    border-bottom: 2px solid ${props => props.theme["gray-500"]};
    color: ${props => props.theme["gray-100"]};
    font-size: 1.125rem;
    font-weight: bold;
    padding: 0 0.5rem;

`

export const TaskInput = styled(BaseInput)`
    flex: 1;
`

export const TaskInputAmount = styled(BaseInput)`
    width: 4rem;
`