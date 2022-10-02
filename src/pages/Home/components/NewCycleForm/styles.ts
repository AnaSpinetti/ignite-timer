import styled from "styled-components";

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
