// ==========================================================
// GEMINI API
// ==========================================================

export async function askNeuro(message){

    const response = await fetch(

        "http://localhost:3001/chat",

        {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                message

            })

        }

    );

    if(!response.ok){

        throw new Error("Server Error");

    }

    const data = await response.json();

    return data.reply;

}