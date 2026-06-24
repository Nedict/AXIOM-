/**
 * AXIOM Local Storage Operations Wrapper
 * Handles profile configuration mapping and publication arrays via local sandbox endpoints.
 */

const AXIOM_DB_KEY = "axiom_local_state";

// Initialize system memory layout structure if missing
if (!localStorage.getItem(AXIOM_DB_KEY)) {
    const initialState = {
        profile: null,
        posts: [],
        projects: [],
        preferences: {
            topics: ["Electrical", "Mechatronics", "Renewable Energy", "AI Engineering"]
        }
    };
    localStorage.setItem(AXIOM_DB_KEY, JSON.stringify(initialState));
}

const AxiomDB = {
    get() {
        return JSON.parse(localStorage.getItem(AXIOM_DB_KEY));
    },
    save(data) {
        localStorage.setItem(AXIOM_DB_KEY, JSON.stringify(data));
    },
    updateProfile(profileData) {
        const state = this.get();
        state.profile = profileData;
        this.save(state);
    }
};
                             
