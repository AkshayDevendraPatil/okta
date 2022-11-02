import axios from 'axios'
import React, { useState } from 'react'

export default function ForgetPassword() {
    const [userName, setUserName] = useState("")
    const [error, setError] = useState("")


    const checkEmpty = () => {
        return !userName.trim()
    }

    console.log(checkEmpty())

    const handleForgetPassword = (e) => {
        e.preventDefault()

        const split = userName.split("@")
        // console.log(split[1])
        if (checkEmpty() === true) {
            setError("required")
        } else if (!userName
            .trim()
            .match(
                /^[a-zA-Z0-9._-]+@[a-zA-Z_]+\.[a-zA-Z]{1,6}$/
            )) {
            setError("Invalid Email Address")
        } else if (split[1] === "theteamcompanies.com") {
            setError("Pls Contact Admin")
        } else {
            axios.post("https://castandcrew-dev.okta.com/api/v1/authn/recovery/password", {
                username: userName,
                factorType: "EMAIL",
                relayState: "/myapp/some/deep/link/i/want/to/return/to"
            })
                .then((res) => {
                    console.log(res)
                    setUserName("")
                    setError("SUCCESS")
                })
                .catch((err) => console.log(err))
        }
    }

    const handleInput = (e) => {
        setUserName(e.target.value)
        setError("")
    }

    return (
        <div>
            <input
                type="text"
                onChange={handleInput}
                value={userName}
            />
            <button onClick={handleForgetPassword}>Submit</button>
            {error}
        </div>
    )
}
