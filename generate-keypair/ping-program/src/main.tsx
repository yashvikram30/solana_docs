import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import WalletConnectionProvider from "./WalletComponentProvider.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WalletConnectionProvider>
    <App />
  </WalletConnectionProvider>
  </StrictMode>,
)
