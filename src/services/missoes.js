import React, { useState, useEffect } from 'react';

const [missao, setMissao] = useState(null);
  const [pontos, setPontos] = useState(0);
  const [tipoMissao, setTipoMissao] = useState(null);

useEffect(() => {
    // Buscar a missão atual
    fetch('/missao/atual')
      .then(response => response.json())
      .then(data => setMissao(data.missao));

    // Buscar os pontos atuais
    fetch('/usuario/pontos')
      .then(response => response.json())
      .then(data => setPontos(data.pontos_usuario));
  }, []);

const adicionarProgresso = () => {
    fetch('/missao/progresso', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ progresso: 20 })  // Por exemplo, adiciona 20% de progresso
    })
    .then(response => response.json())
    .then(data => {
        setMissao(data.missao);
        setPontos(data.pontos_usuario);
    });
};

const gerarMissoes = (e) => {
    e.preventDefault();
    fetch('/liga_missoes_usuario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuarioId, tipo: tipoMissao })
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message || data.error);
    });
  };