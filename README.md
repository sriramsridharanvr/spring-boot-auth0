# spring-boot-auth0
Demo of Auth0 security using Spring Boot and React

This is a simple demonstration project that works as follows:
1. User logs in to react app, and clicks Login.
2. User is taken to Auth0 login page, and logs in with credentials.
3. User is redirected back to the react app with Profile information

Access token is now stored as a state value in the react app.

Using the access token, the private API in the Spring boot backend is called.
