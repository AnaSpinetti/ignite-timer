import { HistoryContainer, HistoryList, Status } from "./styles";

export function History(){
    return (
        <HistoryContainer>
            <h1>Meu histórico</h1>

            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duração</th>
                            <th>Início</th>
                            <Status statusColor="yellow">Status</Status>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>Tarefa</td>
                            <td>20 Minutos</td>
                            <td>Há 2 meses</td>
                            <td>Concluído</td>
                        </tr>
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    )
}