// import {
//     AuthenticatedTemplate,
//     MsalProvider,
//     UnauthenticatedTemplate,
//     useMsal,
// } from "@azure/msal-react";
// import { loginRequest } from "./configs/authConfig";
// import { Button } from "react-bootstrap";
// import { useEffect } from "react";
import { ThemeProvider } from "./components/theme/theme-provider";
//import UserTable from "./components/userdata/UserTable";
import Dashboard from "./page.tsx";
import { Calendar } from "./components/calendar/Calender.tsx";
import { Tabs } from "./components/ui/tabs.tsx";
import { DashboardLayout } from "./components/dashboard/dashboard-layout.tsx";
import { Route, Routes } from "react-router-dom";
import UserAttendance from "./components/pages/UserAttendance.tsx";
import UserTable from "./components/pages/user/UserTable.tsx";
import { SchedulerView } from "./components/scheduler/scheduler-view.tsx";

export default function App() {
    // const { instance } = useMsal();
    // const activeAccount = instance.getActiveAccount();
    // console.log("Bro step 0", activeAccount);
    // useEffect(() => {
    //     const accounts = instance.getAllAccounts();
    //     console.log("Bro step 6", accounts);
    //     if (accounts.length <= 0) {
    //         console.log("Bro step 7", accounts);
    //         instance.loginRedirect(loginRequest)
    //             .then(() => {
    //                 console.log("Bro step 8", accounts);
    //                 const account = instance.getActiveAccount();
    //                 if (account) {
    //                     console.log("Bro step 9", accounts);
    //                     instance.setActiveAccount(account);
    //                 }
    //             }).catch((error) => {
    //                 console.log("Bro step 10", accounts);
    //                 if (error.errorcode === 'interaction_in_progress') return;
    //                 console.error("MSAL loginRedirect error:", error);
    //             });
    //     }
    // }, [instance]);
    // const handleRedirect = () => {
    //     instance
    //         .loginRedirect({
    //             ...loginRequest,
    //             prompt: 'create',
    //         })
    //         .catch((error) => console.log(error));
    // };
    // return (
    // <MsalProvider instance={instance}>
    //     <AuthenticatedTemplate>
    //         {activeAccount ? (
    //             <>
    //                 <UserTable />
    //             </>
    //         ) : null}
    //     </AuthenticatedTemplate>
    //     <UnauthenticatedTemplate>
    //         <Button
    //             className="signInButton"
    //             onClick={handleRedirect}
    //             variant="primary"
    //         >
    //             Sign up
    //         </Button>
    //     </UnauthenticatedTemplate>
    // </MsalProvider>
    //  Direct render without authentication
    //     <div className="min-h-screen bg-gray-100 text-black flex items-center justify-center p-8">
    //         <div className="w-full max-w-6xl">
    //             <UserTable />
    //         </div>
    //     </div>
    // );
    return (
        <ThemeProvider attribute="class" defaultTheme="system" storageKey="vite-ui-theme" enableSystem>
            <DashboardLayout>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/tabs" element={<Tabs />} />
                    <Route path="/users" element={<UserTable />} />
                    <Route path="/attendance" element={<UserAttendance />} />
                    <Route path="/scheduler" element={<SchedulerView />} />
                </Routes>
            </DashboardLayout>
        </ThemeProvider>
    );
}