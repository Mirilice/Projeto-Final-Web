const baseUrlTodosOsCandidatos = 'https://dadosabertos.camara.leg.br/api/v2/deputados?ordem=ASC&ordenarPor=nome';

        document.querySelector('#buscarButton').addEventListener('click', function () {
            const nome = document.querySelector('#nomeInput').value.trim().toLowerCase();

            fetch(baseUrlTodosOsCandidatos)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Erro ao obter os dados da API');
                })
                .then(data => {
                    const candidato = data.dados.find(c => c.nome.toLowerCase() === nome);
                    const resultadoDiv = document.querySelector('#resultado');
                    resultadoDiv.innerHTML = '';

                    if (candidato) {
                        console.log(candidato.id);
                        resultadoDiv.innerHTML = `
                            <p><strong>Nome:</strong> ${candidato.nome}</p>
                            ${candidato.urlFoto ? `<img src="${candidato.urlFoto}" alt="Foto do Deputado" width="100" />` : ''} 
                            <p><strong>Partido:</strong> ${candidato.siglaPartido}</p>
                            <p><strong>Estado:</strong> ${candidato.siglaUf}</p>
                            <p><strong>Email:</strong> ${candidato.email || 'Não informado'}</p>
                        `;
                        //caso a foto do Deputado não exista, tem um operador ternário ali
                        // há um or no campo de email para o mesmo caso também
                    } else {
                        resultadoDiv.innerHTML = `<p>Deputado não encontrado. Verifique o nome digitado.</p>`;
                    }
                })
                .catch(error => {
                    console.error('Erro:', error.message);
                    document.querySelector('#resultado').innerHTML = `<p>Erro: ${error.message}</p>`;
                });
    
        });