import { useState, useRef, useEffect } from 'react';
import './CartaoMomento.css';

export default function CartaoMomento({ momento, desbloqueado, onVirar }) {
    const [virado, setVirado] = useState(false);
    const [fotoAtual, setFotoAtual] = useState(0);
    const versoRef = useRef(null);
    const containerRef = useRef(null);
    const imagens = momento.imageUrl || [];

    useEffect(() => {
        if (virado && versoRef.current && containerRef.current) {
            containerRef.current.style.minHeight = versoRef.current.scrollHeight + 'px';
        } else if (!virado && containerRef.current) {
            containerRef.current.style.minHeight = '450px';
        }
    }, [virado]);

    const handleClick = () => {
        if (!desbloqueado) return;
        const novoVirado = !virado;
        setVirado(novoVirado);
        if (novoVirado) onVirar();
    };

    const avancar = (e) => {
        e.stopPropagation();
        setFotoAtual(i => (i + 1) % imagens.length);
    };

    const voltar = (e) => {
        e.stopPropagation();
        setFotoAtual(i => (i - 1 + imagens.length) % imagens.length);
    };

    return (
        <div
            ref={containerRef}
            className={`carta-container ${virado ? 'virada' : ''} ${!desbloqueado ? 'bloqueada' : ''}`}
            onClick={handleClick}
        >
            <div className="carta-inner">
                <div className="carta-frente">
                    <div className="selo-amor">{desbloqueado ? '❤️' : '🔒'}</div>
                    <h3>{desbloqueado ? 'Clique para revelar a memória' : 'Leia a memória anterior primeiro'}</h3>
                    <span className="data-frente">{momento.data}</span>
                </div>
                <div ref={versoRef} className="carta-verso">
                    {imagens.length > 0 && (
                        <div className="carrossel">
                            <img src={imagens[fotoAtual]} alt="Nossa memória" className="foto-memoria" referrerPolicy="no-referrer" />
                            {imagens.length > 1 && (
                                <>
                                    <button className="carrossel-btn esquerda" onClick={voltar}>&#8249;</button>
                                    <button className="carrossel-btn direita" onClick={avancar}>&#8250;</button>
                                    <div className="carrossel-dots">
                                        {imagens.map((_, i) => (
                                            <span
                                                key={i}
                                                className={`dot ${i === fotoAtual ? 'ativo' : ''}`}
                                                onClick={(e) => { e.stopPropagation(); setFotoAtual(i); }}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                    <div className="conteudo-verso">
                        <span className="arco-badge">{momento.arco}</span>
                        <h2 className="titulo-momento">{momento.titulo}</h2>
                        <p className="texto-descricao">{momento.descricao}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}