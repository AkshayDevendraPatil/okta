export default {
    oidc: {
        issuer: 'https://castandcrew-dev.okta.com/oauth2/default',
        clientId: '0oamzfdyd88VKTGLd357',
        scopes: ['openid', 'profile', 'email'],
        redirectUri: window.location.origin + '/login/callback'
    },
    // login/callback
    widget: {
        issuer: 'https://castandcrew-dev.okta.com/oauth2/default',
        clientId: '0oamzfdyd88VKTGLd357',
        redirectUri: window.location.origin + '/login/callback',
        scopes: ['openid', 'profile', 'email'],
        authParams: {
            // If your app is configured to use the Implicit flow
            // instead of the Authorization Code with Proof of Code Key Exchange (PKCE)
            // you will need to uncomment the below line
            pkce: true
        },

        helpLinks: {
            forgotPassword: window.location.origin + '/Forget',
        }
    },
};

// redirectUri: `https://ttc-clear-dev.auth.us-west-2.amazoncognito.com/oauth2/idpresponse`,