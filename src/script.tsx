import React from 'react';
import { createRoot } from 'react-dom/client';
import './common.css';
import { App } from './Components/App/App';

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
