// import React from 'react';
// import { Route, useHistory, Switch } from 'react-router-dom';
// import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
// import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
// import Home from './Home';
// import Login from './Login';
// import Protected from './Protected';
// import { oktaSignInConfig } from './config';
// import View from './View';

// const oktaAuth = new OktaAuth({
//     issuer: 'https://castandcrew-dev.okta.com/oauth2/default',
//     clientId: '0oamurv1098NGUbfk357',
//     redirectUri: window.location.origin + '/login/callback',
//     authParams: {
//         // If your app is configured to use the Implicit flow
//         // instead of the Authorization Code with Proof of Code Key Exchange (PKCE)
//         // you will need to uncomment the below line
//         // pkce: true
//     }
// });



// const AppWithRouterAccess = () => {
//     const history = useHistory();

//     const customAuthHandler = () => {
//         history.push('/login');
//     };

//     const restoreOriginalUri = async (_oktaAuth, originalUri) => {
//         history.replace(toRelativeUrl(originalUri, window.location.origin));
//     };

//     return (
//         <Security
//             oktaAuth={oktaAuth} onAuthRequired={customAuthHandler} restoreOriginalUri={restoreOriginalUri}
//         >
//             <Switch>
//                 <Route path='/' exact={true} component={Home} />
//                 <Route path='/ViewProjects' exact={true} component={View} />
//                 <SecureRoute path='/protected' component={Protected} />
//                 <Route path='/login' render={() => <Login config={oktaSignInConfig} />} />
//                 <Route path='/login/callback' component={LoginCallback} />
//             </Switch>
//         </Security>
//     );
// };
// export default AppWithRouterAccess;
