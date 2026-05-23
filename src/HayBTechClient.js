'use strict';

/**
 * HayBTech React Native Client - PUBLIC KEY ONLY.
 * 
 * SECURITY WARNING: Never use your Secret Key (sk_...) in a mobile app.
 * All sensitive operations (creating payments) must be done on your backend.
 */
class HayBTechClient {
    constructor(publicKey) {
        if (!publicKey || !publicKey.startsWith('pk_')) {
            throw new Error(
                "[HayBTech] Invalid Public Key. For security reasons, React Native SDK only accepts Public Keys (pk_...). " +
                "Do NOT use your Secret Key in mobile apps."
            );
        }
        this.publicKey = publicKey;
    }

    /**
     * Helper to prepare checkout data.
     * In a real app, the checkout_id comes from your backend.
     */
    getCheckoutUrl(paymentUrl) {
        if (!paymentUrl) throw new Error("[HayBTech] paymentUrl is required.");
        
        // Append public key for tracking if needed, 
        // but usually the URL already has a token.
        return paymentUrl;
    }
}

export default HayBTechClient;
