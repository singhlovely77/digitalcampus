/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { LogLevel, type Configuration, BrowserCacheLocation } from "@azure/msal-browser";
import { AAD_AUTHORITY, AAD_CLIENT_ID, AAD_REDIRECTURI, AED_AUTHORITY, AED_CLIENT_ID, AED_REDIRECTURI, APP_AUTH_MODE, TOKEN_SCOPE
} from "../constants/env";


/**
 * Enter here the user flows and custom policies for your B2C application
 * To learn more about user flows, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/user-flow-overview
 * To learn more about custom policies, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-overview
 */

/**
 * Configuration object to be passed to MSAL instance on creation. 
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md 
 */

const authSettings = APP_AUTH_MODE.toLowerCase() === ('Internal').toLowerCase() ?
    {
        // Internal apps
        clientId:AAD_CLIENT_ID,
        authority:AAD_AUTHORITY,
        redirectUri: AAD_REDIRECTURI
        //clientId: 'f2af7c28-8974-4519-9ff5-1288bc3f09a6',
        //authority: 'https://login.microsoftonline.com/c649db39-0032-4b3d-bbe4-9a281ad84bd9',
        //redirectUri: 'https://digitalcampusdev-bwhsgzabc8f8frcy.centralindia-01.azurewebsites.net/redirect'

    }
    : {
        // External apps
        redirectUri: AED_REDIRECTURI,
        clientId: AED_CLIENT_ID, // This is the ONLY mandatory field that you need to supply.
        authority: AED_AUTHORITY,  //authority: 'https://Enter_the_Tenant_Subdomain_Here.ciamlogin.com/', // Replace the placeholder with your tenant subdomain 
        knownAuthorities: ["digitaldevexternal.ciamlogin.com"],// redirectUri: '/', // You must register this URI on Azure Portal/App Registration. Defaults to window.location.origin
        navigateToLoginRequestUrl: false, // If "true", will navigate back to the original request location before processing the auth code response.
        postLogoutRedirectUri: '/', // Indicates the page to navigate after logout.

    };

export const msalConfig: Configuration = {
    auth: authSettings,
    cache: {
        cacheLocation: BrowserCacheLocation.SessionStorage, // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }
            },
        },
    },
};


/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit: 
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
    scopes: []
};

export const tokenRequest = {
    scopes: [TOKEN_SCOPE],
};

export const graphConfig = {
    graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
};

