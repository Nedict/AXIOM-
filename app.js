import { supabase } from './supabaseClient.js';
import { AxiomDB } from './db.js';

document.addEventListener('DOMContentLoaded', async () => {
    const root = document.getElementById('app-root');
    
    // 1. Render Initial Loading State
    root.innerHTML = `<p class="text-slate-400">Booting AXIOM System...</p>`;

    try {
        // 2. Initialize Local Data
        console.log("Loading AxiomDB...");
        const localData = AxiomDB.get() || { projects: [] };
        
        // 3. Supabase Auth Check
        console.log("Verifying Cloud Sync...");
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;

        // 4. Render Full Dashboard
        renderDashboard(root, session?.user, localData);

    } catch (err) {
        // Detailed error reporting on screen
        root.innerHTML = `
            <div class="bg-red-900/20 border border-red-800 p-6 rounded-xl">
                <h2 class="text-red-500 font-bold">System Boot Error</h2>
                <p class="text-red-300">${err.message}</p>
            </div>
        `;
        console.error("AXIOM Error:", err);
    }
});

function renderDashboard(container, user, data) {
    container.innerHTML = `
        <div class="space-y-8">
            <section>
                <h2 class="text-xl font-semibold mb-4 text-slate-300">Overview</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="p-4 bg-slate-900 border border-slate-800 rounded-lg">
                        <p class="text-sm text-slate-500">Status</p>
                        <p class="text-green-400 font-bold">${user ? 'Cloud Connected' : 'Offline Mode'}</p>
                    </div>
                    <div class="p-4 bg-slate-900 border border-slate-800 rounded-lg">
                        <p class="text-sm text-slate-500">Local Data</p>
                        <p class="text-blue-400 font-bold">${data.projects.length} Projects</p>
                    </div>
                </div>
            </section>
            
            <section>
                <h3 class="text-lg font-semibold mb-4">Engineering Schematics</h3>
                <div id="project-list" class="space-y-3">
                    ${data.projects.length > 0 
                        ? data.projects.map(p => `<div class="p-4 bg-slate-900 rounded-lg border border-slate-800">${p.name}</div>`).join('')
                        : '<p class="text-slate-600 italic">No schematics stored locally.</p>'
                    }
                </div>
            </section>
        </div>
    `;
}
