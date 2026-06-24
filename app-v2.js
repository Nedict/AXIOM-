// --- 1. IMPORT DEPENDENCIES ---
import { supabase } from './supabaseClient.js';
import { AxiomDB } from './db.js';

// --- 2. INITIALIZATION ---
// We wait for the browser to finish loading the HTML structure
document.addEventListener('DOMContentLoaded', async () => {
    const root = document.getElementById('app-root');
    
    if (!root) {
        console.error("Critical: #app-root element missing in HTML");
        return;
    }

    // Set initial loading state
    root.innerHTML = `<p class="text-gray-400">Initializing AXIOM OS...</p>`;

    try {
        // --- 3. CORE LOGIC ---
        // A. Verify Database Connection
        console.log("Checking Supabase connection...");
        const { data: { user }, error } = await supabase.auth.getUser();
        
        // B. Load your local data
        const localData = AxiomDB.get(); // Assuming your db.js handles this
        console.log("Local Database Loaded:", localData);

        // C. Render your main dashboard interface
        renderDashboard(root, user, localData);

    } catch (err) {
        root.innerHTML = `<p class="text-red-500">System Boot Error: ${err.message}</p>`;
        console.error("Full Error:", err);
    }
});

// --- 4. UI RENDER FUNCTIONS ---
function renderDashboard(container, user, data) {
    container.innerHTML = `
        <div class="space-y-6">
            <header>
                <h2 class="text-2xl font-bold text-white">Engineering Dashboard</h2>
                <p class="text-gray-400">${user ? 'User Session Active' : 'Offline Mode'}</p>
            </header>
            
            <div class="p-6 border border-gray-800 rounded-xl bg-gray-900">
                <h3 class="text-lg font-semibold text-blue-400 mb-2">Recent Schematics</h3>
                <div id="project-list" class="text-gray-500 italic">No projects found.</div>
            </div>
        </div>
    `;
    
    // If you had a function to list projects, call it here:
    // listProjects();
}

// --- 5. YOUR CUSTOM FUNCTIONS ---
// Paste any specific logic you previously wrote here.
// e.g., export function saveProject(data) { ... }
    
