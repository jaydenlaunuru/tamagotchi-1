const hungerBar = document.getElementById("hunger-bar");
const happinessBar = document.getElementById("happiness-bar");
const energyBar = document.getElementById("energy-bar");
const notificationContainer = document.getElementById("notification-container");

let hunger = 100;
let happiness = 100;
let energy = 100;
let gameInterval;

function updateBars() {
    hungerBar.style.width = `${hunger}%`;
    happinessBar.style.width = `${happiness}%`;
    energyBar.style.width = `${energy}%`;

    [hungerBar, happinessBar, energyBar].forEach((bar, index) => {
        const value = [hunger, happiness, energy][index];
        bar.style.backgroundColor = value < 30 ? "red" : value < 70 ? "orange" : "#4caf50";
    });

    checkStatus();
}

function showNotification(message, type = "warning") {
    const notification = document.createElement("div");
    notification.classList.add("notification", "show", type);
    notification.innerText = message;

    notificationContainer.appendChild(notification);

    setTimeout(() => {
        notification.classList.remove("show");
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}
function checkStatus() {
    if (hunger === 0 || happiness === 0 || energy === 0) {
        gameOver();
    }

    if (hunger <= 20 && hunger > 0) {
        showNotification("Ik heb honger! 🍏 Wil je me eten geven?", "danger");
    }
    if (happiness <= 20 && happiness > 0) {
        showNotification("Ik verveel me! 🎾 Speel met mij!", "warning");
    }
    if (energy <= 20 && energy > 0) {
        showNotification("Ik ben moe! 😴 Tijd om te slapen!", "success");
    }
}

function decreaseStatus() {
    hunger = Math.max(hunger - 5, 0);
    happiness = Math.max(happiness - 5, 0);
    energy = Math.max(energy - 5, 0);
    updateBars();
}

function feedTamagotchi() {
    if (hunger === 0 || happiness === 0 || energy === 0) return;
    hunger = Math.min(hunger + 20, 100);
    happiness = Math.max(happiness - 5, 0);
    updateBars();
}

function playTamagotchi() {
    if (hunger === 0 || happiness === 0 || energy === 0) return;
    happiness = Math.min(happiness + 15, 100);
    energy = Math.max(energy - 10, 0);
    updateBars();
}

function sleepTamagotchi() {
    if (hunger === 0 || happiness === 0 || energy === 0) return;
    energy = Math.min(energy + 25, 100);
    hunger = Math.max(hunger - 10, 0);
    updateBars();
}

function gameOver() {
    clearInterval(gameInterval);
    document.getElementById("game-over").style.display = "flex";
    document.querySelectorAll(".controls button").forEach(button => button.disabled = true);
}

function restartGame() {
    if (hunger > 0 && happiness > 0 && energy > 0) {
        showNotification("Je kunt het spel pas opnieuw starten als een van de waarden 0 bereikt!", "warning");
        return;
    }

    hunger = 100;
    happiness = 100;
    energy = 100;
    updateBars();

    document.getElementById("game-over").style.display = "none";
    document.querySelectorAll(".controls button").forEach(button => button.disabled = false);
    gameInterval = setInterval(decreaseStatus, 5000);
}

document.addEventListener("DOMContentLoaded", () => {
    updateBars();
    gameInterval = setInterval(decreaseStatus, 5000);
});