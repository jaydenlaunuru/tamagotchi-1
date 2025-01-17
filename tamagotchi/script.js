const hungerBar = document.getElementById("hunger-bar");
const happinessBar = document.getElementById("happiness-bar");
const energyBar = document.getElementById("energy-bar");

let hunger = 50;
let happiness = 50;
let energy = 50;

function updateBars() {
    hungerBar.style.width = `${hunger}%`;
    happinessBar.style.width = `${happiness}%`;
    energyBar.style.width = `${energy}%`;
    [hungerBar, happinessBar, energyBar].forEach((bar, index) => {
        const value = [hunger, happiness, energy][index];
        bar.style.backgroundColor = value < 30 ? "red" : value < 70 ? "orange" : "#4caf50";
    });
}
function feedTamagotchi() {
    hunger = Math.min(hunger + 10, 100);
    happiness = Math.max(happiness - 5, 0);
    updateBars();
}
function playTamagotchi() {
    happiness = Math.min(happiness + 10, 100);
    energy = Math.max(energy - 5, 0);
    updateBars();
}
function sleepTamagotchi() {
    energy = Math.min(energy + 20, 100);
    hunger = Math.max(hunger - 10, 0);
    updateBars();
}

document.addEventListener("DOMContentLoaded", updateBars);
