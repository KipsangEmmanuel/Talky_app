import http from "k6/http";

import {sleep, check } from "k6";

export const options = {
    vus: 100,
    duration: '10s',
};

export default function () {

    const body = JSON.stringify({
        username: "Sanny",
        email: "emmanuel@gmail.com",
        password: "@Emmanuel123",
        fullname: "Emmanuel Kipsang",
        confirmpassword: "@Emmanuel123"    
    });

    const params = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    http.post("http://localhost:5000/user/register", body, params);
    sleep(1)

}