import { supabase } from './supabaseClient.js';

document.addEventListener('DOMContentLoaded', async () => {
    const root = document.getElementById('app-root');
    
    // Initial UI state
    root.innerHTML = `<p class="p-4 text-slate-500">Syncing with AXIOM Cloud...</p>`;

    try {
        // Fetch data
        const { data: projects, error } = await supabase
            .from('projects')
            .select('*');

        if (error) throw error;

        // Render logic
        if (!projects || projects.length === 0) {
            root.innerHTML = `
                <div class="p-6 border border-slate-800 rounded-xl bg-slate-900 text-center">
                    <h2 class="text-xl font-bold text-slate-300">System Ready</h2>
                    <p class="text-slate-500 mt-2">No projects found in database. Add your first project in Supabase!</p>
                </div>
            `;
        } else {
            root.innerHTML = `
                <div class="space-y-4">
                    ${projects.map(p => `
                        <div class="p-6 bg-slate-900 rounded-xl border border-slate-700 shadow-lg">
                            <h3 class="text-xl font-bold text-white">${p.title || 'Untitled'}</h3>
                            <p class="text-slate-400 mt-2">${p.description || 'No description provided.'}</p>
                        </div>
                    `).join('')}
                </div>
            `;
        }
    } catch (err) {
        root.innerHTML = `<p class="text-red-500">Error: ${err.message}</p>`;
    }
});
