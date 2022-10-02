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

export const StopCountdownButton = styled.button`
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
    background: ${props => props.theme["red-500"]};
    
    &:hover{
        background: ${props => props.theme["red-700"]};

    }
`;

