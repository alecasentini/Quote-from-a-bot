// Api Key: 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

// Variabili

const API_URL = "https://api.openai.com/v1/completions";
const MODEL = "gpt-3.5-turbo";
const API_KEY = "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";

const loader = document.querySelector(".loading-hidden");

const modal = document.querySelector(".modal")
const modalContent = document.querySelector('.modal-content')
const modalClose = document.querySelector('.modal-close');



// Functions

async function playCharacter (nameCharacter){
    loader.classList.remove("loading-hidden");

    const action = "Saluta nel tuo modo più iconico";
    const temperature = 0.7;

    const response = await fetch(API_URL,{
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: MODEL,
            messages: [
                {
                    role: "user",
                    content: `Sei ${nameCharacter} e ${action} con un massimo di 100 caretteri senza mai uscire dal tuo personaggio`

                }
            ],
            temperature: temperature
        })
    })

    const data = await response.json();

    const message = data.choices[0].message.content;

    modalContent.innerHTML = `<h2>${nameCharacter}</h2>
    <p>${message}</p>
    <code>Character: ${nameCharacter}, action: ${action}, temperature: ${temperature}</code>`;

    loader.classList.add("loading-hidden");
    modal.classList.remove("modal-hidden");
}


// Init

const characters = document.querySelectorAll(".character");

characters.forEach(function(element){
    element.addEventListener("click", function(){
        playCharacter(element.dataset.character)
    })
});

modalClose.addEventListener("click", function() {
    modal.classList.add("modal-hidden");
});