// ai.js - The Brains of AXIOM AI

const AxiomAI = {
    async query(prompt) {
        // Simulated AI API Call
        return new Promise((resolve) => {
            setTimeout(() => {
                const responses = [
                    "To debug your sensor signal latency, verify your sampling frequency matches the Nyquist rate of the input.",
                    "The component you're referencing is compatible with standard 5V logic. Ensure your pull-up resistor is 10k.",
                    "I've analyzed your project. Your logic flow is sound, but consider adding a secondary interrupt to the reset pin.",
                    "I recommend checking the manufacturer's datasheet for the specific pinout impedance."
                ];
                resolve(responses[Math.floor(Math.random() * responses.length)]);
            }, 1000);
        });
    }
};

// UI Interaction Logic
function toggleAI() {
    document.getElementById('ai-modal').classList.toggle('hidden');
}

async function handleEnter(e) {
    if (e.key === 'Enter') {
        const input = document.getElementById('ai-input');
        const window = document.getElementById('ai-chat-window');
        const val = input.value;
        if (!val) return;

        window.innerHTML += `<div class="text-[11px] text-white bg-cyan-600/20 p-3 rounded-lg text-right">${val}</div>`;
        input.value = '';
        window.innerHTML += `<div id="loader" class="text-[10px] text-gray-500 italic p-2">AXIOM is processing...</div>`;
        
        const response = await AxiomAI.query(val);
        
        document.getElementById('loader').remove();
        window.innerHTML += `<div class="text-[11px] text-gray-300 bg-gray-900 p-3 rounded-lg border border-cyan-900/30 mt-2">${response}</div>`;
        window.scrollTop = window.scrollHeight;
    }
                  }
          
