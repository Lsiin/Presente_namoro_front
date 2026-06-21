import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import CartaoMomento from './CartaoMomento';
import CartaoMesversario from './CartaoMesversario';
import './App.css';

export default function TelaPrincipal({ onVoltar, musicaAtiva, onToggleMusica }) {
    const [historia, setHistoria] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [desbloqueados, setDesbloqueados] = useState(1);
    const [secao, setSecao] = useState('memorias'); // 'memorias' | 'mesversario'
    const { width, height } = useWindowSize();

    useEffect(() => {
        fetch('https://presente-namoro.onrender.com/api/historia')
            .then(res => res.json())
            .then(dados => {
                setHistoria(dados);
                setCarregando(false);
            })
            .catch(erro => {
                console.error('Erro ao buscar a história:', erro);
                setCarregando(false);
            });
    }, []);

    const handleVirar = (index) => {
        if (index + 1 >= desbloqueados) setDesbloqueados(index + 2);
    };

    return (
        <div className="tela-principal">
            <Confetti
                width={width}
                height={height}
                numberOfPieces={60}
                gravity={0.15}
                colors={['#ff4d4d', '#ff9999', '#ff1a1a', '#ffcccc', '#cc0000']}
            />

            <div className="cabecalho">
                <div className="cabecalho-esquerda">
                    <button className="botao-voltar" onClick={onVoltar}>
                        ⬅ Voltar
                    </button>

                    <button className="botao-musica" onClick={onToggleMusica}>
                        {musicaAtiva ? '⏸ Pausar música' : '▶ Retomar música'}
                    </button>
                </div>

                <nav className="nav-links">
                    <button
                        className={`nav-link ${secao === 'memorias' ? 'ativo' : ''}`}
                        onClick={() => setSecao('memorias')}
                    >
                        Memórias
                    </button>
                    <button
                        className={`nav-link ${secao === 'mesversario' ? 'ativo' : ''}`}
                        onClick={() => setSecao('mesversario')}
                    >
                        Mesversário
                    </button>
                </nav>
            </div>

            {secao === 'memorias' && (
                <div className="grade-cartas">
                    {carregando && <p className="texto-carregando">Carregando nossas memórias...</p>}


                    {historia.map((momento, index) => (
                        <CartaoMomento
                            key={momento.id}
                            momento={momento}
                            desbloqueado={index < desbloqueados}
                            onVirar={() => handleVirar(index)}
                        />
                    ))}
                </div>
            )}

            {secao === 'mesversario' && (
                <div className="pagina-mesversario">
                    <CartaoMesversario onVoltar={() => setSecao('memorias')} />
                </div>
            )}
        </div>
    );
}
