import './App.css';

export default function TelaInicial({ onPlay }) {
    return (
        <div className="tela-inicial">
            <div className="conteudo-play">
                <h1>Nossa História ❤️</h1>
                <p>Coloque os fones de ouvido e clique para começar...</p>
                <button className="botao-play" onClick={onPlay}>
                    ▶ PLAY
                </button>
            </div>
        </div>
    );
}
