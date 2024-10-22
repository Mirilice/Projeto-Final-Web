// Selecionar o botão e o conteúdo
const accordionButton = document.querySelector('.topicos');
const accordionContent = document.querySelector('.content');

// Adicionar evento de clique ao botão
accordionButton.addEventListener('click', function () {
    // Alterna a exibição do conteúdo
    accordionContent.classList.toggle('show');
});