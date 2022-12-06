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
    const formBody = `userGroup=${encodeURIComponent(
        formStyles.userGroup
      )}&email=${encodeURIComponent(email)}`;

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