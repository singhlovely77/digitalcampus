import { EventType,PublicClientApplication, type AuthenticationResult, type EventMessage } from "@azure/msal-browser";  
import { msalConfig } from "./authConfig";

export const msalInstance= new PublicClientApplication(msalConfig);

export const msalSetUp= async () =>{
    console.log("Bro step msalInstance initialize")
    await msalInstance.initialize();

    const accounts= msalInstance.getAllAccounts();
    if (accounts.length > 0) {
        console.log("Bro step msalInstance setup" )
        msalInstance.setActiveAccount(accounts[0]);
    }

    //optional- this will update account state if user signs in from another tab or window
    //msalInstance.enableAccountStorageEvents();

    //Listen for Sign -in Event and set Active account
    msalInstance.addEventCallback(async (event: EventMessage) => {
        console.log("Bro step msalInstance")
        if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
            console.log("Bro step msalInstance LOGIN_SUCCESS")
            const payload= event.payload as AuthenticationResult;
            const {account} = payload;
            msalInstance.setActiveAccount(account);
        }
    })

    return msalInstance;

}
