/**
 * AXIOM Verification Engine
 * Generates SHA-256 fingerprints for all uploaded engineering assets.
 */

const AXIOM_Verifier = {
    // Generate a unique fingerprint for any file
    async generateFingerprint(file) {
        const arrayBuffer = await file.arrayBuffer();
        const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
        
        // Convert to Hex string
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
        return hashHex;
    },

    // Verify if a file matches the registered hash
    async verify(file, expectedHash) {
        const actualHash = await this.generateFingerprint(file);
        return actualHash === expectedHash;
    }
};

// Example usage when uploading a file:
async function onFileUpload(event) {
    const file = event.target.files[0];
    const hash = await AXIOM_Verifier.generateFingerprint(file);
    
    console.log("File Verified. Registry Hash:", hash);
    // You would save this hash to your database alongside the file
}
