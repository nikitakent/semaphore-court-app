import { Group } from "@semaphore-protocol/group"
import { Identity } from "@semaphore-protocol/identity";
import { generateProof, verifyProof } from "@semaphore-protocol/proof"

/* the following code is reading in dummy variables for demo purposes only. */
let inputElement = document.getElementById('hiddenInput') as HTMLInputElement;
let myString = inputElement.value;
const storedData = JSON.parse(localStorage.getItem('caseData') as string);
const commitments = storedData.commitments.map((c: string) => BigInt(c));

type GroupData = {
    id: string;
    members: BigInt[];
    treedepth: number;
};

let jsonData: any = null;

fetch('./data/dummyData.json')
  .then(response => response.json())
  .then(data => {
    jsonData = data;
    init();  // This function initializes or triggers other operations that depend on jsonData
  })
  .catch(error => console.error('Error fetching JSON:', error));

function init() {
    extractCaseData(myString); 
  }

function extractCaseData(myString: string): GroupData | null {
    if (!jsonData) {
        console.error("JSON data has not been loaded.");
        return null;
    }
    const caseObj = jsonData.Cases[myString];
    if (caseObj) {
        return {
            id: caseObj.id,
            members: caseObj.members.map((c: string) => BigInt(c)),
            treedepth: caseObj.treedepth,
        };
    }
    return null;
}

const caseData = extractCaseData(myString);  // Replace "someCaseString" with your desired case string.
const charges = document.querySelectorAll('.charge');

charges.forEach((charge) => {
    const chargeId = charge.id; 
    const guiltyBtn = charge.querySelector('.guilty') as HTMLButtonElement;
    const notGuiltyBtn = charge.querySelector('.not-guilty') as HTMLButtonElement;
    const messageTextarea = charge.querySelector('.message-field') as HTMLTextAreaElement;

    if (guiltyBtn && notGuiltyBtn) {
        guiltyBtn.addEventListener('click', () => {
            console.log("Guilty was pressed");
            const signal = 1;
            const userMessage = messageTextarea.value;
            const identity = new Identity(userMessage);
            genProof(identity, signal, chargeId);
            // vote(1);  // Assuming you have a vote function that accepts the signal
        });

        notGuiltyBtn.addEventListener('click', () => {
            const signal = 0;
            const userMessage = messageTextarea.value;
            const identity = new Identity(userMessage);
            genProof(identity, signal, chargeId);
            // vote(0);  // Calling the vote function with the signal
        });
    }
});


async function genProof(identity:any, signal: number, chargeId: string) {
    if (caseData) {
        const group = new Group(caseData.id, caseData.treedepth, caseData.members as any);
        const externalNullifier = group.root; // change later to the charge id
        const fullProof = await generateProof(identity, group, externalNullifier, signal)
        if (fullProof){
            alert("Ready to submit");
            const isVerified = await verifyProof(fullProof, 16);
            if (isVerified) {
                vote(chargeId, signal);
            } else {
                console.error("Verification failed. Cannot proceed with voting.");
            }
        }
    } else {
        alert("Could not extract case data or data is missing.");
    }
}

function vote(chargeId: string, signal: number) {
    // You can add more logic here to store votes or handle behavior
    console.log(`Charge ${chargeId} voted: ${signal === 1 ? 'GUILTY' : 'NOT GUILTY'}`);
}

const generateResultBtn = document.getElementById('generateResult');
generateResultBtn.addEventListener('click', () => {
    // For demonstration, I'm just randomizing the bar width
    const guiltyBar = document.getElementById('guiltyBar') as HTMLElement;
    const notGuiltyBar = document.getElementById('notGuiltyBar') as HTMLElement;
    
    if (guiltyBar && notGuiltyBar) {
        guiltyBar.style.width = `${Math.random() * 100}%`;
        notGuiltyBar.style.width = `${Math.random() * 100}%`;
    }
});



