import logo from './logo.svg';
import './App.css';
import { MsalProvider, useMsal } from '@azure/msal-react';
import axios from 'axios';
import msalInstance from './msalConfig';

const App = () => {
  return (
      <MsalProvider msalInstance={msalInstance}>
        <AuthenticationButton />
        <ApiRequest />
      </MsalProvider>
  );
};

const AuthenticationButton = () => {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginRedirect({
      scopes: ["User.Read"]
    }).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
  };

  return <button onClick={handleLogin}>Click here to login</button>;
};

const ApiRequest = () => {
  const { instance } = useMsal();

  const callApi = async () => {
    const accounts = instance.getAllAccounts();
    if (accounts.length > 0) {
      const response= await instance.acquireTokenSilent({
        scopes: ["api://xxx/.default"],
        account: accounts[0]
      });

      const token = response.accessToken;
      const apiResponse = await axios.get('http://localhost:3001/api', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(apiResponse.data);
    }
  };
  return <button onClick={callApi}>Click here to call the API</button>
};

export default App;
