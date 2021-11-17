import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import config from "./config.json";
import axios from "axios";

function App() {
  useEffect(() => {
    document.title = "Auth0 Demo";
  }, []);

  const [accessToken, setAccessToken] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);

  const {
    user,
    getAccessTokenSilently,
    isLoading,
    error,
    isAuthenticated,
    loginWithRedirect,
    logout,
  } = useAuth0();
  useEffect(() => {
    console.log("Getting access token silently");
    (async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: config.audience,
          scope: "read:user",
        });
        setAccessToken(token);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [getAccessTokenSilently]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  const callSecureApi = async () => {
    try {
      const response = await axios.get("/auth0/private", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setApiResponse(response.data);
    } catch (error) {}
  };
  return (
    <div>
      {!isAuthenticated ? (
        <button onClick={loginWithRedirect}>Login</button>
      ) : (
        <Home
          user={user}
          onLogout={() => logout({ returnTo: window.location.origin })}
          callSecureApi={callSecureApi}
          apiResponse={apiResponse}
        />
      )}
    </div>
  );
}

const Home = ({ onLogout, user, apiResponse, callSecureApi }) => {
  return (
    <React.Fragment>
      <h1>Hello, {user ? user.name : "User!"}</h1>
      {apiResponse && (
        <div>
          <p>
            <span style={{ fontWeight: 500 }}>OIDC Claims Json: </span>
            <span>{apiResponse.claims.sub}</span>
          </p>
        </div>
      )}
      <button onClick={callSecureApi}>Call API</button>
      <button onClick={onLogout}>Logout</button>
    </React.Fragment>
  );
};

export default App;
