# HayBTech React Native SDK

Official React Native SDK for the HayBTech Payment Gateway -- integrate mobile money payments  into your React Native apps.

[![NPM](https://img.shields.io/npm/v/@haybtech/react-native.svg)](https://www.npmjs.com/package/@haybtech/react-native)
[![React Native](https://img.shields.io/badge/React%20Native-0.70+-61DAFB.svg)](https://reactnative.dev/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## SECURITY WARNING

**NEVER use your Secret Key (`sk_...`) in a React Native app.**
Any key included in a mobile app can be extracted by decompiling the APK/IPA.

The React Native SDK only accepts **Public Keys (`pk_...`)**. All sensitive operations (like creating a payment) must be performed on your backend server using one of our server-side SDKs (PHP, Node.js, Python, Ruby, Java, Go, .NET).

---

## Installation

```bash
npm install @haybtech/react-native react-native-webview
```

For iOS, install native dependencies:

```bash
cd ios && pod install
```

---

## Secure Workflow

```
React Native App               Your Backend                  HayBTech API
    |                               |                            |
    |-- 1. Send order details ----->|                            |
    |                               |-- 2. Create payment ------>|
    |                               |<--- paymentUrl ------------|
    |<-- 3. Return paymentUrl ------|                            |
    |                               |                            |
    |-- 4. Open <Checkout /> ------>|                            |
    |   (WebView with paymentUrl)   |                            |
```

1. **Your App** sends order details to **Your Backend**.
2. **Your Backend** creates a payment via HayBTech API (using Secret Key) and returns the `paymentUrl`.
3. **Your App** receives the `paymentUrl` and opens it using the `Checkout` component.

---

## Usage

### 1. Initialize Client

```javascript
import HayBTech from '@haybtech/react-native';

const haybtech = new HayBTech.Client('pk_test_your_public_key');
```

### 2. Render Checkout

```javascript
import React, { useState } from 'react';
import { View, Modal, Button, Alert } from 'react-native';
import { Checkout } from '@haybtech/react-native';

const MyPaymentScreen = () => {
  const [visible, setVisible] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState(null);

  const startPayment = async () => {
    // 1. Call your backend to create a payment
    const res = await fetch('https://api.yourbackend.com/create-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 5000, currency: 'XOF' })
    });
    const { url } = await res.json();
    
    setPaymentUrl(url);
    setVisible(true);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Button title="Pay Now" onPress={startPayment} />

      <Modal visible={visible} animationType="slide">
        <Checkout 
          paymentUrl={paymentUrl}
          onSuccess={(url) => {
            setVisible(false);
            Alert.alert("Success", "Payment completed!");
          }}
          onCancel={() => {
            setVisible(false);
            Alert.alert("Cancelled", "Payment was cancelled.");
          }}
          onFailure={() => {
            setVisible(false);
            Alert.alert("Error", "Payment failed.");
          }}
        />
      </Modal>
    </View>
  );
};

export default MyPaymentScreen;
```

---


---

## Component Props

| Prop           | Type       | Required | Description                           |
|:---------------|:-----------|:---------|:--------------------------------------|
| `paymentUrl`   | `string`   | Yes      | URL received from your backend        |
| `onSuccess`    | `function` | Yes      | Called when payment succeeds           |
| `onCancel`     | `function` | Yes      | Called when customer cancels           |
| `onFailure`    | `function` | No       | Called when payment fails              |

---

## Security Features

- **Public Key Enforcement**: The SDK throws an error if a Secret Key is used, preventing accidental exposure.
- **Secure WebView**: Uses `react-native-webview` with optimized settings for secure payment processing.
- **No Local Storage**: Sensitive payment data is never stored on the device (`AsyncStorage`, `SecureStore`, etc.).
- **URL Monitoring**: Navigation state changes are monitored to detect terminal states securely.

---

## Requirements

| Requirement          | Version |
|:---------------------|:--------|
| React Native         | 0.70+   |
| react-native-webview | 13.0+   |
| Android SDK          | 21+     |
| iOS                  | 12.0+   |

---

MIT License
