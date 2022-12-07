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

export function newsletterWelcome (email: any) { 


    const formBodyNewsletter = `userGroup=${encodeURIComponent(formStyles.userGroup)}&email=${encodeURIComponent(email)}`;
    // const newsletteradd = fetch(`https://${domain}/api/newsletter-form/${formStyles.id}`, {
    //     method: "POST",
    //     body: formBodyNewsletter,
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded",
    //     },
    //   })
    //     .then((res: any) => [res.ok, res.json(), res])
    //     .then(([ok, dataPromise, res]) => {
    //     })
    //     .catch((error) => {
    //     });

    const newsletteradd = fetch(`https://${domain}/api/v1/contacts/create`, {
        method: "POST",
        body: formBodyNewsletter,
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

    // const newsletterupdate = fetch(`https://${domain}/api/v1/contacts/update`, {
    // method: "PUT",
    // body: formBodyNewsletter,
    // headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //     "Authorization": "Bearer 94ad43b06035026114a3f95309474a23"
    // },
    // })
    // .then((res: any) => [res.ok, res.json(), res])
    // .then(([ok, dataPromise, res]) => {
    //     console.log(res)
    // })
    // .catch((error) => {
    // });


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

export function petitionSigned (body: any) { 
    let parsedBody = JSON.parse(body);
    console.log(parsedBody);
    console.log(body.email)

    const formBodyNewsletter = `userGroup=${encodeURIComponent(formStyles.userGroup)}&email=${encodeURIComponent(parsedBody.email)}`;
    // const newsletteradd = fetch(`https://${domain}/api/v1/contacts/create`, {
    //     method: "POST",
    //     body: formBodyNewsletter,
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded",
    //       "Authorization": "Bearer 94ad43b06035026114a3f95309474a23"
    //     },
    //   })
    //     .then((res: any) => [res.ok, res.json(), res])
    //     .then(([ok, dataPromise, res]) => {
    //         console.log(res)
    //     })
    //     .catch((error) => {
    //     });

    const newsletterupdate = fetch(`https://${domain}/api/v1/contacts/update`, {
    method: "PUT",
    body: formBodyNewsletter,
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

    const formBody = `email=${encodeURIComponent(parsedBody.email)}&lastName=${encodeURIComponent(parsedBody.uid)}&eventName=petitionSigned`;

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

export function userRegistration (body: any) { 
    let parsedBody = JSON.parse(body);
    console.log(parsedBody);
    console.log(body.email)

    const formBodyNewsletter = `userGroup=registered&registered=true&email=${encodeURIComponent(parsedBody.email)}&eventName=Registration`;
    const newsletteradd = fetch(`https://${domain}/api/v1/contacts/create`, {
        method: "POST",
        body: formBodyNewsletter,
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

    // const newsletterupdate = fetch(`https://${domain}/api/v1/contacts/update`, {
    // method: "PUT",
    // body: formBodyNewsletter,
    // headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //     "Authorization": "Bearer 94ad43b06035026114a3f95309474a23"
    // },
    // })
    // .then((res: any) => [res.ok, res.json(), res])
    // .then(([ok, dataPromise, res]) => {
    //     console.log(res)
    // })
    // .catch((error) => {
    // });

    

    return formBodyNewsletter;

}

export function addUserProfile (email: any) { 
    const formBody = `userGroup=PlaidConnected&email=${encodeURIComponent(email)}`;

    const newsletteradd = fetch(`https://${domain}/api/v1/contacts/create`, {
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

    // const newsletterupdate = fetch(`https://${domain}/api/v1/contacts/update`, {
    // method: "PUT",
    // body: formBody,
    // headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //     "Authorization": "Bearer 94ad43b06035026114a3f95309474a23"
    // },
    // })
    // .then((res: any) => [res.ok, res.json(), res])
    // .then(([ok, dataPromise, res]) => {
    //     console.log(res)
    // })
    // .catch((error) => {
    // });

    return formBody;

}