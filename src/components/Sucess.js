export default function Sucess(props){
    const { obj } = props;
    const [ok, setOk] = React.useState(null);
    const [lugares, setLugares] = React.useState([]);
    const [sessao, setSessao] = React.useState([]);
    
    React.useEffect(() => {
        let sendObj = {
            ids: obj.seats,
            name: obj.name,
            cpf: obj.cpf
        };

        axios.post('https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many', sendObj);
        
    }, []);

    React.useEffect(() => {
        let promisse = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${obj.sessionId}/seats`);
        promisse.then((resposta) => {
            setSessao(resposta.data);
            setLugares(resposta.data.seats)})
    }, [])

    
    return(
        <div className="sucess-content">
            <h1>Pedido feito com sucesso!</h1>
            <div className="sessao">
                <h1>Filme e sessão</h1>

            </div>
            <div className="assentos">
                <h1>Ingressos</h1>
            </div>
            <div className="comprador">
                <h1>comprador</h1>
            </div>
        </div>
    )
}