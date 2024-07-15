import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
    auth: {
        clientId: "2df56a3c-17d4-472b-895f-3884a857f3c6",
        authority: "https://login.microsoftonline.com/fe641ad9-d4f0-4ccc-bf6d-ef582675d0ef",
        redirectUri: "http://localhost:3000",
    },
};

const msalInstance = new PublicClientApplication(msalConfig);

export default msalInstance;