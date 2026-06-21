import musicaArquivo from './assets/Micheal_Jackson_-_You_Are_Not_Alone_(mp3.pm).mp3';
import { useEffect, useRef, useState } from 'react';
import TelaInicial from './TelaInicial';
import TelaPrincipal from './TelaPrincipal';

function App() {
    const [comecou, setComecou] = useState(false);
    const [musicaAtiva, setMusicaAtiva] = useState(false);
    const audioRef = useRef(new Audio(musicaArquivo));

    useEffect(() => {
        audioRef.current.loop = true;
        audioRef.current.volume = 0.5;

        return () => {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        };
    }, []);

    const tocarMusica = async () => {
        setComecou(true);
        try {
            await audioRef.current.play();
            setMusicaAtiva(true);
        } catch (e) {
            console.log('Áudio bloqueado', e);
            setMusicaAtiva(false);
        }
    };

    const alternarMusica = async () => {
        if (audioRef.current.paused) {
            try {
                await audioRef.current.play();
                setMusicaAtiva(true);
            } catch (e) {
                console.log('Não foi possível retomar o áudio', e);
                setMusicaAtiva(false);
            }
            return;
        }

        audioRef.current.pause();
        setMusicaAtiva(false);
    };

    const voltarProInicio = () => {
        setComecou(false);
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setMusicaAtiva(false);
    };

    if (!comecou) return <TelaInicial onPlay={tocarMusica} />;

    return (
        <TelaPrincipal
            onVoltar={voltarProInicio}
            musicaAtiva={musicaAtiva}
            onToggleMusica={alternarMusica}
        />
    );
}

export default App;
