import { useState } from "react";


const INIT = "INIT";
const SUBMITTING = "SUBMITTING";
const ERROR = "ERROR";
const SUCCESS = "SUCCESS";
const formStates = [INIT, SUBMITTING, ERROR, SUCCESS] as const;
const formStyles = {
  "id": "clbb6urpz001kjn08serq763n",
  "name": "Default",
  "formStyle": "inline",
  "placeholderText": "you@example.com",
  "formFont": "Inter",
  "formFontColor": "#ffffff",
  "formFontSizePx": 14,
  "buttonText": "Subscribe",
  "buttonFont": "Inter",
  "buttonFontColor": "#000000",
  "buttonColor": "#ffffff",
  "buttonFontSizePx": 14,
  "successMessage": "Thanks! We'll be in touch!",
  "successFont": "Inter",
  "successFontColor": "#067301",
  "successFontSizePx": 14,
  "userGroup": ""
}
const domain = "app.loops.so"

export function addOnlyEmail (email: any) { 
    const formBody = `email=${encodeURIComponent(email)}&eventName=NewsletterWelcome`;

    const send = fetch(`https://${domain}/api/v1/events/send`, {
        method: "POST",
        body: formBody,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": "Bearer 94ad43b06035026114a3f95309474a23"
        },
      })
        .then((res: any) => [res.ok, res.json(), res])
        .then(([ok, dataPromise, res]) => {
            console.log(res)
        })
        .catch((error) => {
        });

    console.log(send)

    return formBody;

}

export function addUserProfile (email: any) { 
    const formBody = `userGroup=PlaidConnected&email=${encodeURIComponent(email)}`;

    fetch(`https://${domain}/api/newsletter-form/${formStyles.id}`, {
        method: "POST",
        body: formBody,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
        .then((res: any) => [res.ok, res.json(), res])
        .then(([ok, dataPromise, res]) => {
        })
        .catch((error) => {
        });

    return formBody;

}