import { supabase } from './supabaseClient.js';

document.addEventListener('DOMContentLoaded', async () => {
    const root = document.getElementById('app-root');

    // 1. Initial Boot Sequence UI
    root.innerHTML = `
        <div class="flex items-center justify-center h-64">
            <div class="animate-pulse flex flex-col items-center">
                <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p class="text-slate-400 font-mono tracking-widest">INITIALIZING CORE...</p>
            </div>
        </div>
    `;

    try {
        // 2. Fetch Cloud Data (Supabase)
        const { data: cloudProjects, error } = await supabase
            .from('projects')
            .select('*')
            // This sorts projects so the newest are at the top
            .order('created_at', { ascending: false });

        if (error) throw error;

        // 3. Render Full Architecture
        renderDashboard(root, cloudProjects);

    } catch (err) {
        root.innerHTML = `
            <div class="p-6 bg-red-900/20 border border-red-500 rounded-xl max-w-2xl mx-auto mt-8">
                <h2 class="text-red-500 font-bold text-xl mb-2">System Fault</h2>
                <p class="text-red-300 font-mono text-sm">${err.message}</p>
            </div>
        `;
        console.error("AXIOM Error:", err);
    }
});

function renderDashboard(container, projects) {
    const totalProjects = projects ? projects.length : 0;

    container.innerHTML = `
        <div class="max-w-7xl mx-auto space-y-10 animate-fade-in">
            
            <section class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="p-6 bg-slate-900 border border-slate-800 rounded-xl shadow-lg relative overflow-hidden">
                    <div class="absolute top-0 right-0 w-16 h-16 bg-green-500/10 rounded-bl-full"></div>
                    <h3 class="text-slate-500 text-xs font-bold uppercase tracking-widest">Network Status</h3>
                    <p class="text-green-400 font-bold text-2xl mt-2 flex items-center">
                        <span class="w-2.5 h-2.5 bg-green-500 rounded-full mr-3 animate-pulse"></span> Cloud Synced
                    </p>
                </div>
                
                <div class="p-6 bg-slate-900 border border-slate-800 rounded-xl shadow-lg relative overflow-hidden">
                    <div class="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-bl-full"></div>
                    <h3 class="text-slate-500 text-xs font-bold uppercase tracking-widest">Cloud Schematics</h3>
                    <p class="text-blue-400 font-bold text-2xl mt-2">${totalProjects} Records</p>
                </div>

                <div class="p-6 bg-slate-900 border border-slate-800 rounded-xl shadow-lg relative overflow-hidden">
                    <div class="absolute top-0 right-0 w-16 h-16 bg-purple-500/10 rounded-bl-full"></div>
                    <h3 class="text-slate-500 text-xs font-bold uppercase tracking-widest">Local Database</h3>
                    <p class="text-purple-400 font-bold text-2xl mt-2 text-sm pt-1">AxiomDB Ready</p>
                </div>
            </section>

            <section>
                <div class="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
                    <h2 class="text-2xl font-bold text-slate-200">Engineering Schematics</h2>
                    <a href="create.html" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-lg transition-all shadow-lg shadow-blue-600/20">
                        + New Schematic
                    </a>
                </div>
                
                ${(!projects || projects.length === 0) 
                    ? `<div class="p-16 text-center border-2 border-dashed border-slate-800 rounded-xl bg-slate-900/30">
                           <div class="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                               <svg class="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                           </div>
                           <h3 class="text-lg font-bold text-slate-300 mb-1">No Schematics Found</h3>
                           <p class="text-slate-500">Your database is connected, but empty. Add your first project.</p>
                       </div>`
                    : `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        ${projects.map(p => `
                            <div class="group p-6 bg-slate-900 rounded-xl border border-slate-800 hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-blue-900/10 flex flex-col justify-between h-48">
                                <div>
                                    <h3 class="text-lg font-bold text-slate-100 mb-2 group-hover:text-blue-400 transition-colors line-clamp-1">${p.title || 'Untitled'}</h3>
                                    <p class="text-slate-400 text-sm line-clamp-2">${p.description || 'No description provided.'}</p>
                                </div>
                                <div class="flex justify-between items-center mt-4 pt-4 border-t border-slate-800">
                                    <span class="text-xs text-slate-500 font-mono bg-slate-950 px-2 py-1 rounded">ID: ${p.id ? p.id.toString().substring(0,6) : 'N/A'}</span>
                                    <button class="text-blue-500 text-sm font-medium hover:text-blue-400 flex items-center">
                                        Open <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                       </div>`
                }
            </section>
        </div>
    `;
}
