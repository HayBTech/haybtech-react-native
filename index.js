import HayBTechClient from './src/HayBTechClient';
import HayBTechCheckout from './src/HayBTechCheckout';

/**
 * HayBTech React Native SDK.
 * 
 * Usage:
 *   import HayBTech from '@haybtech/react-native';
 *   const haybtech = new HayBTech.Client('pk_test_...');
 */
export default {
    Client: HayBTechClient,
    Checkout: HayBTechCheckout
};

export { HayBTechClient as Client, HayBTechCheckout as Checkout };
