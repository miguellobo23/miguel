let slideIndex = 1; // Começa no primeiro slide
showSlides(slideIndex);

function showSlides(n) {
    let slides = document.getElementsByClassName("slide");
    let iframes = document.getElementsByTagName("iframe");

    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }

    // Esconder todos os slides e pausar os vídeos corretamente
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        let iframe = iframes[i];

        // Pausar vídeo corretamente para YouTube e Vimeo
        if (iframe.src.includes("youtube.com")) {
            iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        } else if (iframe.src.includes("vimeo.com")) {
            iframe.contentWindow.postMessage('{"method":"pause"}', '*');
        } else {
            iframe.src = iframe.src; // Reinicia para outros players (caso não seja YouTube/Vimeo)
        }
    }

    // Exibir o novo slide com transição suave
    let currentSlide = slides[slideIndex - 1];
    currentSlide.style.opacity = "0";
    currentSlide.style.display = "block";

    setTimeout(() => {
        currentSlide.style.opacity = "1";
    }, 50); // Pequeno delay para suavizar a transição

    // Reiniciar e iniciar o vídeo visível
    let currentIframe = iframes[slideIndex - 1];

    if (currentIframe.src.includes("youtube.com")) {
        currentIframe.contentWindow.postMessage('{"event":"command","func":"seekTo","args":[0, true]}', '*'); // Reinicia do início
        currentIframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*'); // Reproduz
    } else if (currentIframe.src.includes("vimeo.com")) {
        currentIframe.contentWindow.postMessage('{"method":"setCurrentTime","value":0}', '*'); // Reinicia do início
        currentIframe.contentWindow.postMessage('{"method":"play"}', '*'); // Reproduz
    } else {
        currentIframe.src = currentIframe.src; // Reinicia para outros players
    }
}

// Função para avançar ou voltar os slides ao clicar nos botões
function plusSlides(n) {
    showSlides(slideIndex += n);
}
