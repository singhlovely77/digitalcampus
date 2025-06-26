import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// import type { PublicClientApplication } from '@azure/msal-browser'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { MsalProvider } from '@azure/msal-react'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import { msalSetUp } from './configs/msalSetup.config.ts'
import { BrowserRouter } from 'react-router-dom';
import React from 'react'

// msalSetUp().then((instance: PublicClientApplication) => {
//     const root = createRoot(document.getElementById('root')!);
//     const queryClient = new QueryClient();

//     root.render(
//         <React.StrictMode>
//             <MsalProvider instance={instance}>
//                 <QueryClientProvider client={queryClient}>
//                     <App />
//                     <ReactQueryDevtools />
//                 </QueryClientProvider>
//             </MsalProvider>
//         </React.StrictMode>)

// });

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
                <App />
        </BrowserRouter>
        
    </React.StrictMode>
);
