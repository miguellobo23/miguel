let slideIndex = 1; // Começa no primeiro slide
showSlides(slideIndex);

function showSlides(n) {
    let slides = document.getElementsByClassName("slide");
    let iframes = document.getElementsByTagName("iframe");

    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }

    // Esconder todos os slides e parar os vídeos
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        let iframeSrc = iframes[i].src; 
        iframes[i].src = "";  // Limpa o src para parar o vídeo
        iframes[i].src = iframeSrc; // Reatribui o src para reiniciar quando necessário
    }

    // Exibir o slide atual
    slides[slideIndex - 1].style.display = "block";
}

// Função para avançar ou voltar os slides ao clicar nos botões
function plusSlides(n) {
    showSlides(slideIndex += n);
}
