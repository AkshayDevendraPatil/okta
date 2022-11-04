import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import axios from 'axios';
import { DummyApi, NewDummyApi } from './apiConfig';
import AWS from "aws-sdk";

const Protected = () => {
    <h3 id="protected">Protected</h3>
    const { authState, oktaAuth } = useOktaAuth();
    const [userInfo, setUserInfo] = useState(null);

    const [files, setFiles] = useState("")

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
        headers: { Authorization: `Bearer ${authState.idToken.idToken}` }
    };

    useEffect(() => {
        axios.get(DummyApi,
            config)
            .then((res) => {
                console.log(res?.data?.data);
                setUserInfo(res?.data?.data?.clientname);

            })
            .catch((Error) => {
                console.log(Error)
            })
    }, [])

    const handleUpload = async () => {
        // setIsLoading(true);
        // setError("")
        var creds = new AWS.CognitoIdentityCredentials({
            //Aws creds
            IdentityPoolId: "us-west-2:2a7722cf-56de-4100-b5e1-fa9a64e12b31",
            Logins: {
                // Dev
                ["cognito-idp." + "us-west-2" + ".amazonaws.com/" + "us-west-2_qXvFZJCOs"]:
                    authState?.idToken?.idToken, // authentication tooke(that we get in response using Auth.currentSession() )
            },
        });
        AWS.config.credentials = creds; //pasing the creds
        AWS.config.region = "us-west-2"; // assing the region
        var s3 = new AWS.S3();
        s3.upload(
            {
                Key: 'profile/pictures/' + files.name,
                Body: files,
                Bucket: "ttccl-clearance-dev-landing",
                Tagging: `emailaddress=ashik.jerin@fugetroncorp.com&extension=${files.name.split(".").pop()}`,
            },
            (err, data) => {
                if (err) {
                    alert(err);
                    // setIsLoading(false)
                }
                if (data) {
                    // setIsLoading(false);
                    console.log(data)
                    handleUpload(data.key)
                }
            }
        );
    };

    const handleImage = (e) => {
        setFiles(e.target.files[0])
    }

    // console.log(files.name)
    return (
        <div>
            <div>
                <p id="welcome">
                    Welcome, &nbsp;{userInfo}!
                </p>
                <p>You have successfully authenticated against your Okta org, and have been redirected back to this application.</p>
            </div>
            <input type="file" onChange={handleImage} />
            <button onClick={handleUpload}>Submit</button>
        </div>
    );
};

export default Protected;
