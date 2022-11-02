import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import axios from 'axios';

const Protected = () => {
    <h3 id="protected">Protected</h3>
    const { authState, oktaAuth } = useOktaAuth();
    const [userInfo, setUserInfo] = useState(null);

    // useEffect(() => {
    //     if (!authState || !authState.isAuthenticated) {
    //         // When user isn't authenticated, forget any user info
    //         setUserInfo(null);
    //     } else {
    //         oktaAuth.getUser().then((info) => {
    //             setUserInfo(info);
    //         }).catch((err) => {
    //             console.error(err);
    //         });
    //     }
    // }, [authState, oktaAuth]); // Update if authState changes

    // if (!userInfo) {
    //     return (
    //         <div>
    //             <p>Fetching user info ...</p>
    //         </div>
    //     );
    // }

    console.log(authState)

    const config = {
        headers: { Authorization: `Bearer ${authState.accessToken.accessToken}` }
    };

    // https://fkm9dybl83.execute-api.us-west-2.amazonaws.com/v1/ttccl_user_profile?email=ashik.jerin@fugetroncorp.com
    useEffect(() => {
        axios.get("https://iqvz42dxge.execute-api.us-west-2.amazonaws.com/v1/ttccl_show_user_profile_okta?param1=ashik.jerin@fugetroncorp.com",
            config)
            .then((res) => {
                console.log(res?.data?.data);
                setUserInfo(res?.data?.data?.clientname);

            })
            .catch((Error) => {
                console.log(Error)
            })
    }, [])

    return (
        <div>
            <div>
                <p id="welcome">
                    Welcome, &nbsp;{userInfo}!
                </p>
                <p>You have successfully authenticated against your Okta org, and have been redirected back to this application.</p>
            </div>
        </div>
    );
};

export default Protected;
