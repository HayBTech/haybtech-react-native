import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

/**
 * HayBTech Checkout Component.
 * 
 * Safely renders the payment gateway in a WebView and handles callbacks.
 */
const HayBTechCheckout = ({ 
    paymentUrl, 
    onSuccess, 
    onCancel, 
    onFailure,
    onClose 
}) => {
    
    const handleNavigationStateChange = (navState) => {
        const { url } = navState;

        // Detection of terminal states via URL fragments or query params
        if (url.includes('/success') || url.includes('status=success')) {
            onSuccess && onSuccess(url);
        } else if (url.includes('/cancel') || url.includes('status=cancelled')) {
            onCancel && onCancel(url);
        } else if (url.includes('/failed') || url.includes('status=failed')) {
            onFailure && onFailure(url);
        }
    };

    if (!paymentUrl) {
        return null;
    }

    return (
        <View style={styles.container}>
            <WebView
                source={{ uri: paymentUrl }}
                onNavigationStateChange={handleNavigationStateChange}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                renderLoading={() => (
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" color="#FF6B00" />
                    </View>
                )}
                // Security: Prevent the webview from navigating away from the gateway
                // unless it's a known success/cancel URL.
                onShouldStartLoadWithRequest={(request) => {
                    // Allow everything for now, but in production, we could restrict to haybtech.com
                    return true;
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    }
});

export default HayBTechCheckout;
