import './erro.css'
import { Link } from 'react-router-dom'

export default function Erro(){
    return(
        <div className='not-found'>
            <h1>404</h1>
            <h2>Pagina não encontrada!</h2>
            <Link to="/">Volte para página inicial!</Link>
        </div>
    )
}