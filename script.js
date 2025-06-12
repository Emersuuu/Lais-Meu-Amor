// Data especial (03/08/2024)
let specialDate = new Date("2024-08-03T00:00:00");

// Elementos do DOM
const yearsElement = document.getElementById("years");
const monthsElement = document.getElementById("months");
const weeksElement = document.getElementById("weeks");
const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

// Elementos de música
const audioPlayer = document.getElementById("audioPlayer");
const playPauseBtn = document.getElementById("playPauseBtn");
const progressBar = document.getElementById("progressBar");
const progressContainer = document.querySelector(".progress-container");

// Elementos de imagem
const mainImage = document.getElementById("mainImage");

// Elemento de mensagem
const customMessage = document.getElementById("customMessage");

// Função para calcular a diferença de tempo
function calculateTimeDifference() {
    const now = new Date();
    const difference = now - specialDate;
    
    if (difference < 0) {
        // Se a data ainda não chegou, mostrar zeros
        return {
            years: 0,
            months: 0,
            weeks: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        };
    }
    
    // Calcular anos
    const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365.25));
    
    // Calcular meses (aproximado)
    const months = Math.floor((difference % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
    
    // Calcular semanas
    const weeks = Math.floor((difference % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24 * 7));
    
    // Calcular dias
    const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24));
    
    // Calcular horas
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    // Calcular minutos
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    
    // Calcular segundos
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    return { years, months, weeks, days, hours, minutes, seconds };
}

// Função para atualizar o contador
function updateCounter() {
    const time = calculateTimeDifference();
    
    yearsElement.textContent = time.years;
    monthsElement.textContent = time.months;
    weeksElement.textContent = time.weeks;
    daysElement.textContent = time.days;
    hoursElement.textContent = time.hours;
    minutesElement.textContent = time.minutes;
    secondsElement.textContent = time.seconds;
}

// Função para criar mais corações flutuantes
function createFloatingHearts() {
    const heartsContainer = document.querySelector(".hearts-background");
    
    for (let i = 0; i < 5; i++) {
        const heart = document.createElement("div");
        heart.innerHTML = "💖";
        heart.style.position = "absolute";
        heart.style.fontSize = Math.random() * 15 + 15 + "px";
        heart.style.left = Math.random() * 100 + "%";
        heart.style.top = Math.random() * 100 + "%";
        heart.style.animation = `float ${Math.random() * 3 + 4}s ease-in-out infinite`;
        heart.style.animationDelay = Math.random() * 3 + "s";
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        
        heartsContainer.appendChild(heart);
    }
}

// Funcionalidades de música
let isPlaying = false;

playPauseBtn.addEventListener("click", () => {
    if (isPlaying) {
        audioPlayer.pause();
        playPauseBtn.textContent = "▶";
    } else {
        audioPlayer.play();
        playPauseBtn.textContent = "⏸️";
    }
    isPlaying = !isPlaying;
});

audioPlayer.addEventListener("timeupdate", function() {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.style.width = progress + "%";
});

progressContainer.addEventListener("click", function(e) {
    const clickX = e.offsetX;
    const width = this.clientWidth;
    const duration = audioPlayer.duration;
    audioPlayer.currentTime = (clickX / width) * duration;
});

// Inicializar
updateCounter();
createFloatingHearts();

// Atualizar contador a cada segundo
setInterval(updateCounter, 1000);

// Adicionar efeito de hover nos itens do contador
document.querySelectorAll(".countdown-item").forEach(item => {
    item.addEventListener("mouseenter", () => {
        item.style.transform = "translateY(-5px) scale(1.05)";
    });
    
    item.addEventListener("mouseleave", () => {
        item.style.transform = "translateY(0) scale(1)";
    });
});

// Tornar o campo de texto somente leitura
customMessage.readOnly = true;

// Iniciar a música automaticamente (se permitido pelo navegador)
window.addEventListener("load", () => {
    audioPlayer.play().then(() => {
        isPlaying = true;
        playPauseBtn.textContent = "⏸️";
    }).catch(error => {
        console.log("Reprodução automática bloqueada. O usuário precisa interagir para iniciar a música.", error);
        // Se a reprodução automática for bloqueada, o botão de play/pause permanecerá como \'play\'
    });
});


