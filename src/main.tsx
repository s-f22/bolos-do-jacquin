import { createRoot } from 'react-dom/client'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // <-- necessário para colapso funcionar
import 'primereact/resources/themes/lara-light-blue/theme.css';  // ou outro tema de sua escolha
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


import App from './App.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx';
import React from 'react';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
)
