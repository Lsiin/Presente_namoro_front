import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import CartaoMomento from './CartaoMomento';
import './App.css';

export default function TelaPrincipal({ onVoltar }) {
    const [historia, setHistoria] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [desbloqueados, setDesbloqueados] = useState(1);
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
                <button className="botao-voltar" onClick={onVoltar}>
                    ⬅ Voltar
                </button>
                <h2>Aventuras Desbloqueadas</h2>
            </div>

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
        </div>
    );
}
