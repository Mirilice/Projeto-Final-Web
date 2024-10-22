const baseUrlTodosOsCandidatos = 'https://dadosabertos.camara.leg.br/api/v2/deputados?ordem=ASC&ordenarPor=nome';

document.querySelector('#buscarButton').addEventListener('click', function () {
    const nome = document.querySelector('#nomeInput').value.trim().toLowerCase();

    fetch(baseUrlTodosOsCandidatos)
        .then(response => response.json())
        .then(data => {
            const candidato = data.dados.find(c => c.nome.toLowerCase() === nome);
            const infoDiv = document.querySelector('#numero'); // Atualiza para mostrar as infos na "tela" da urna
            const abasDiv = document.querySelector('#abas'); // Exibe as abas
            const despesasDiv = document.querySelector('#tab-despesas');
            const discursosDiv = document.querySelector('#tab-discursos');
            const ocupacoesDiv = document.querySelector('#tab-ocupacoes');

            infoDiv.innerHTML = '';
            despesasDiv.innerHTML = '';
            discursosDiv.innerHTML = '';
            ocupacoesDiv.innerHTML = '';

            if (candidato) {
                // Exibe as informações básicas do deputado
                console.log(candidato.id)
                infoDiv.innerHTML = `
                    <p><strong>Nome:</strong> ${candidato.nome}</p>
                    ${candidato.urlFoto ? `<img src="${candidato.urlFoto}" alt="Foto do Deputado" width="100" />` : ''} 
                    <p><strong>Partido:</strong> ${candidato.siglaPartido}</p>
                    <p><strong>Estado:</strong> ${candidato.siglaUf}</p>
                    <p><strong>Email:</strong> ${candidato.email || 'Não informado'}</p>
                `;
                abasDiv.style.display = 'block';
                // Busca e exibe as despesas do deputado
                fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados/${candidato.id}/despesas?ano=2024&mes=10`)
                    .then(response => response.json())
                    .then(data => {
                        let despesasHtml = '<h3>Despesas - Outubro/2024</h3>';
                        if (data.dados.length > 0) {
                            data.dados.forEach(despesa => {
                                despesasHtml += `
                                    <p><strong>Mês:</strong> ${despesa.mes}/${despesa.ano}</p>
                                    <p><strong>Tipo:</strong> ${despesa.tipoDespesa}</p>
                                    <p><strong>Valor:</strong> R$ ${despesa.valorLiquido.toFixed(2)}</p>
                                    <hr>`;
                            });
                        } else {
                            despesasHtml += '<p>Nenhuma despesa encontrada.</p>';
                        }
                        despesasDiv.innerHTML = despesasHtml;
                    });

                // Busca e exibe os discursos do deputado
                fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados/${candidato.id}/discursos?dataInicio=2024-10-01&dataFim=2024-10-31&ordenarPor=dataHoraInicio&ordem=DESC`)
                    .then(response => response.json())
                    .then(data => {
                        let discursosHtml = '<h3>Discursos - Outubro/2024</h3>';
                        if (data.dados.length > 0) {
                            data.dados.forEach(discurso => {
                                console.log(discurso)
                                discursosHtml += `
                                    <p><strong>Data:</strong> ${new Date(discurso.dataHoraInicio || 'Data não informada').toLocaleString()}</p>
                                    <p><strong>Resumo:</strong> ${discurso.resumo || 'Resumo não informado'}</p>
                                    <p><strong>Palavras-chave:</strong> ${discurso.keywords || 'Não informado'}</p>
                                    <p><strong>Tipo de Discurso:</strong> ${discurso.tipoDiscurso || 'Não informado'}</p>
                                    <hr>
                                `;
                            });
                        } else {
                            discursosHtml += '<p>Nenhum discurso encontrado.</p>';
                        }
                        discursosDiv.innerHTML = discursosHtml;
                    });

                // Busca e exibe as ocupações do deputado
                fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados/${candidato.id}/ocupacoes`)
    .then(response => response.json())
    .then(data => {
        let ocupacoesHtml = '<h3>Ocupações</h3>';

        // Verifica se há ocupações e se os valores são válidos
        if (data.dados.length > 0) {
            let encontrouOcupacaoValida = false;

            data.dados.forEach(ocupacao => {
                if (ocupacao.titulo) {
                    encontrouOcupacaoValida = true;
                    ocupacoesHtml += `
                        <p><strong>Título:</strong> ${ocupacao.titulo}</p>
                        <p><strong>Entidade:</strong> ${ocupacao.entidade || 'Entidade não informada'}, 
                        ${ocupacao.entidadeUF || 'Unidade Federativa não informada'}, 
                        ${ocupacao.entidadePais || 'País não informado'}</p>
                        <p>${ocupacao.anoInicio || 'Ano início não informado'} - 
                        ${ocupacao.anoFim || 'Ano fim não informado'}</p>
                        <hr>
                    `;
                }
            });

            // Se nenhuma ocupação válida foi encontrada, mostra mensagem
            if (!encontrouOcupacaoValida) {
                ocupacoesHtml += '<p>Nenhuma ocupação encontrada.</p>';
            }
        } else {
            ocupacoesHtml += '<p>Nenhuma ocupação encontrada.</p>';
        }

        // Insere o HTML na aba de ocupações
        document.querySelector('#tab-ocupacoes').innerHTML = ocupacoesHtml;
    })
            } else {
                infoDiv.innerHTML = `<p>Deputado não encontrado. Verifique o nome digitado.</p>`;
            }
        })
        .catch(error => {
            console.error('Erro:', error.message);
            document.querySelector('#info').innerHTML = `<p>Erro: ${error.message}</p>`;
        });
});

// Lógica para alternar entre abas
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function () {
        const target = this.getAttribute('data-tab');
        document.querySelectorAll('.tab-content').forEach(content => {
            content.style.display = 'none';
        });
        document.getElementById(target).style.display = 'block';
    });
});
