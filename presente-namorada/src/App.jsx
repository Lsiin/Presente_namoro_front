import musicaArquivo from './assets/Micheal_Jackson_-_You_Are_Not_Alone_(mp3.pm).mp3';
import { useState, useRef } from 'react';
import TelaInicial from './TelaInicial';
import TelaPrincipal from './TelaPrincipal';

function App() {
    const [comecou, setComecou] = useState(false);
    const audioRef = useRef(new Audio(musicaArquivo));

    const darOPlay = () => {
        setComecou(true);
        audioRef.current.loop = true;
        audioRef.current.volume = 0.5;
        audioRef.current.play().catch(e => console.log('Áudio bloqueado', e));
    };

    const voltarProInicio = () => {
        setComecou(false);
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
    };

    if (!comecou) return <TelaInicial onPlay={darOPlay} />;

    return <TelaPrincipal onVoltar={voltarProInicio} />;
}

export default App;
