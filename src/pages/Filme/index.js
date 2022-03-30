import { useEffect, useState } from 'react';
import './filme-info.css';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { toast } from 'react-toastify';

export default function Filme(){
    const {id} = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{

        async function loadFilme(){
            const response = await api.get(`r-api/?api=filmes/${id}`);
            
            if(response.data.length === 0){
                navigate('/');
                return;
            }

            setFilme(response.data);
            setLoading(false);
        }

        loadFilme();

        return() => {
            console.log('componente desmontado')
        }

    }, [id, navigate]);

    function SalvaFilme(){
        
        const minhaLista = localStorage.getItem('filmes');

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some( (filmeSalvo) => filmeSalvo.id === filme.id)

        if(hasFilme){
            toast.error('Você já salvou este filme!');
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem('filmes', JSON.stringify(filmesSalvos));
        toast.success('Salvo nos favoritos!')

    }

    if(loading){
        return(
            <div className='filme-info'>
                <h1>Carregando seu filme... Relaxe a mente brother!</h1>
            </div>
        )
    };
    return(
        <div className='filme-info'>
            <h1> {filme.nome} </h1>
            <img src={filme.foto} alt={filme.nome}/>
            <h3>Sinopse</h3>
            {filme.sinopse}

            <div className='botoes'>
                <button onClick={ SalvaFilme }>Salvar</button>
                <button>
                    <a target="blank" href={`https://www.youtube.com/results?search_query=${filme.nome} TrailerOfficial`}>
                        Trailler
                    </a>
                </button>
            </div>
        </div>
    )
};