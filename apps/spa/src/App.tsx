import React, { useState } from 'react';
import { formatWalletAddress, assertWalletAddress } from '@wallet/libs';
import './App.css';

type WalletStatus = 'idle' | 'connected' | 'error';

function App() {
  const [address, setAddress] = useState<string>('');
  const [balance, setBalance] = useState<number>(0);
  const [status, setStatus] = useState<WalletStatus>('idle');
  const [error, setError] = useState<string>('');

  const handleConnect = () => {
    const sampleAddress = '0x1234567890abcdef1234567890abcdef12345678';
    try {
      assertWalletAddress(sampleAddress);
      setAddress(sampleAddress);
      setBalance(1.5);
      setStatus('connected');
      setError('');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Connection failed');
    }
  };

  const handleDisconnect = () => {
    setAddress('');
    setBalance(0);
    setStatus('idle');
    setError('');
  };

  const handleError = () => {
    setStatus('error');
    setError('Simulated connection error');
  };

  return (
    <div className="App">
      <h1>Wallet Monorepo Demo</h1>
      <p className="subtitle">Demonstrating @wallet/libs package functionality</p>
      
      <div className="wallet-info">
        <h2>Wallet Status: {status}</h2>
        
        {address && (
          <div>
            <p><strong>Address:</strong> {address}</p>
            <p><strong>Formatted:</strong> {formatWalletAddress(address)}</p>
            <p><strong>Balance:</strong> {balance} ETH</p>
          </div>
        )}
        
        {error && (
          <div className="error">
            <p><strong>Error:</strong> {error}</p>
          </div>
        )}
      </div>

      <div className="actions">
        <button onClick={handleConnect} disabled={status === 'connected'}>
          Connect Wallet
        </button>
        <button onClick={handleDisconnect} disabled={status !== 'connected'}>
          Disconnect
        </button>
        <button onClick={handleError}>
          Simulate Error
        </button>
      </div>

      <div className="utils-demo">
        <h3>@wallet/libs Utility Functions Demo</h3>
        <div className="demo-section">
          <h4>Default Formatting:</h4>
          <p className="demo-result">
            Input: <code>'0x1234567890abcdef1234567890abcdef12345678'</code><br/>
            Output: <code>'{formatWalletAddress('0x1234567890abcdef1234567890abcdef12345678')}'</code>
          </p>
        </div>
        
        <div className="demo-section">
          <h4>Custom Formatting:</h4>
          <p className="demo-result">
            Leading: 8, Trailing: 6, Separator: '...'<br/>
            Output: <code>'{formatWalletAddress('0x1234567890abcdef1234567890abcdef12345678', { leading: 8, trailing: 6, separator: '...' })}'</code>
          </p>
        </div>
        
        <div className="demo-section">
          <h4>Short Address (no formatting needed):</h4>
          <p className="demo-result">
            Input: <code>'0x1234'</code><br/>
            Output: <code>'{formatWalletAddress('0x1234')}'</code>
          </p>
        </div>
        
        <div className="demo-section">
          <h4>Empty Address:</h4>
          <p className="demo-result">
            Input: <code>''</code><br/>
            Output: <code>'{formatWalletAddress('')}'</code> (empty string)
          </p>
        </div>
      </div>
      
      <div className="success-message">
        <h3>🎉 Monorepo Setup Complete!</h3>
        <ul>
          <li>✅ Private Verdaccio registry running on localhost:4873</li>
          <li>✅ @wallet/libs package published and working</li>
          <li>✅ @wallet/hooks package published (immer integration ready)</li>
          <li>✅ Microbundle build system configured</li>
          <li>✅ SPA project consuming private packages</li>
        </ul>
      </div>
    </div>
  );
}

export default App;