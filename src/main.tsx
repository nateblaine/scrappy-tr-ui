import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AwsRum, AwsRumConfig } from 'aws-rum-web';

// Export AWS RUM instance or null if initialization fails
export let awsRum: AwsRum | null = null;

try {
  const config: AwsRumConfig = {
    sessionSampleRate: 1,
    endpoint: "https://dataplane.rum.us-east-1.amazonaws.com",
    telemetries: ["performance"],
    allowCookies: true,
    enableXRay: false,
    signing: true
  };

  const APPLICATION_ID = '66c01d4f-61fc-49cc-872b-8aa19c48ffd0';
  const APPLICATION_VERSION = '1.0.0';
  const APPLICATION_REGION = 'us-east-1';

  awsRum = new AwsRum(
    APPLICATION_ID,
    APPLICATION_VERSION,
    APPLICATION_REGION,
    config
  );
} catch (error) {
  console.error('Error initializing AWS RUM:', error);
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);