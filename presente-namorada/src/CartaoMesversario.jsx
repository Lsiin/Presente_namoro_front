import { useEffect, useState } from 'react';
import './CartaoMesversario.css';

const API_BASE = import.meta.env.VITE_API_URL || 'https://presente-namoro.onrender.com';
const ENDPOINT = `${API_BASE}/api/cartoes`;

function extrairCard(payload) {
    if (Array.isArray(payload)) {
        return payload[0] || null;
    }

    if (payload && typeof payload === 'object') return payload;

    return null;
}

function montarConteudo(card) {
    return {
        titulo: card?.titulo || 'Feliz 7 Meses, amor! ❤️',
        descricao:
            card?.descricao ||
            'Hoje celebramos 7 meses de namoro e eu quero dizer que cada momento ao seu lado tornou meus dias mais felizes. Obrigado por todo carinho, risadas e cumplicidade. Que a gente continue construindo lembranças lindas juntos — eu te amo demais! ❤️',
        assinatura: card?.assinatura || '— Com amor, seu amado vitor gostoso',
        cabecalho: card?.cabecalho || '7 meses de nós',
    };
}

export default function CartaoMesversario({ onVoltar }) {
    const [aberto, setAberto] = useState(false);
    const [conteudo, setConteudo] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');

    const toggle = () => setAberto(a => !a);

    useEffect(() => {
        let ativo = true;

        async function carregarMensagem() {
            setCarregando(true);
            setErro('');

            try {
                const resposta = await fetch(ENDPOINT);
                if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);

                const dados = await resposta.json();
                const card = extrairCard(dados);

                if (!card) throw new Error('Nenhum card encontrado em /api/cartoes');

                if (ativo) {
                    setConteudo(montarConteudo(card));
                    setCarregando(false);
                }
                return;
            } catch (err) {
                console.error('Erro ao buscar a mensagem do mesversário:', err);
            }

            if (ativo) {
                setConteudo(montarConteudo(null));
                setErro('Não foi possível carregar a mensagem do backend agora.');
                setCarregando(false);
            }
        }

        carregarMensagem();

        return () => {
            ativo = false;
        };
    }, []);

    return (
        <div className="mesversario-container">
            <div className="acoes-topo">
                <button className="botao-voltar-sec" onClick={onVoltar}>⬅ Voltar</button>
            </div>

            <div
                className={`cartao-real ${aberto ? 'aberto' : ''}`}
                onClick={toggle}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggle();
                    }
                }}
                aria-label="Abrir cartão do mesversário"
            >
                <div className="cartao-sombra" />
                <div className="cartao-interior">
                    <div className="cartao-conteudo">
                        <span className="cabecalho-cartao">{conteudo?.cabecalho || '7 meses de nós'}</span>
                        {carregando ? (
                            <>
                                <h2>Carregando a mensagem...</h2>
                                <p>Aguenta só um pouquinho, estou buscando no backend.</p>
                            </>
                        ) : (
                            <>
                                <h2>{conteudo?.titulo}</h2>
                                <p>{conteudo?.descricao}</p>
                                <p className="assinatura">{conteudo?.assinatura}</p>
                                {erro && <p className="mensagem-erro">{erro}</p>}
                            </>
                        )}
                    </div>
                </div>

                <div className="cartao-capa">
                    <div className="cartao-capa-frente">
                        <span className="icone-cartao">💝</span>
                        <strong>Toque para abrir</strong>
                        <small>uma surpresa só nossa</small>
                    </div>
                </div>
            </div>

            <p className="dica">Clique no cartão para abrir a mensagem</p>
        </div>
    );
}

