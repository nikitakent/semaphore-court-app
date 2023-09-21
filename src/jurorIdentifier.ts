
import { Identity } from "@semaphore-protocol/identity";

let currentJuror: number = 1;
let totalJurors: number;
let commitments: bigint[] = [];

declare global { 
    interface Window {
    nextStep: (step: number) => void;
    storeSecretMessage: (step: number) => void;
    }
}

function nextStep(step: number): void {
    const step1: HTMLElement | null = document.getElementById('step1');
    const step2: HTMLElement | null = document.getElementById('step2');
    const step3: HTMLElement | null = document.getElementById('step3');
    const step4: HTMLElement | null = document.getElementById('step4');
    const juryCountElem: HTMLInputElement | null = document.getElementById('juryCount') as HTMLInputElement;
    const juryCountDisplay: HTMLElement | null = document.getElementById('juryCountDisplay');

    switch(step) {
        case 2:
            if (step1) step1.style.display = 'none';
            if (step2) step2.style.display = 'block';
            break;
        case 3:
            if (juryCountElem) {
                totalJurors = parseInt(juryCountElem.value, 10);
                if (juryCountDisplay) juryCountDisplay.innerText = juryCountElem.value;
            }
            if (step2) step2.style.display = 'none';
            if (step3) step3.style.display = 'block';
            break;
        case 4:
            if (step3) step3.style.display = 'none';
            if (step4) step4.style.display = 'block';
            break;
    }
}
window.nextStep = nextStep;

function storeSecretMessage(): void {
    const secretMessageElem: HTMLInputElement | null = document.getElementById('secretMessage') as HTMLInputElement;
    const message: string = secretMessageElem ? secretMessageElem.value : '';
    const caseNameElem: HTMLInputElement | null = document.getElementById('caseName') as HTMLInputElement;
    const referenceNumberElem: HTMLInputElement | null = document.getElementById('referenceNumber') as HTMLInputElement;
    const caseName: string = caseNameElem ? caseNameElem.value : '';
    const referenceNumber: string = referenceNumberElem ? referenceNumberElem.value : '';
    
    if (currentJuror < totalJurors) {
        const identity = new Identity(message)
        commitments.push(identity.getCommitment());
        const messageDiv = document.getElementById('message');
        if (messageDiv) {
            messageDiv.textContent = `Your Nullifier is #${identity.getNullifier()}`;
            messageDiv.textContent = `Your Trapdoor is #${identity.getTrapdoor()}`;
            messageDiv.textContent = `Please keep write these values down and keep them secret. <br> 
            Anyone who knows your Nullifier, Trapdoor or Secret Message can act on behalf of you. If you feel
            any of these values are compromised, please contact the Semaphore Court immediately.`;
        }
            currentJuror++;
        if (secretMessageElem) secretMessageElem.value = ''; // Reset the input for the next juror
        alert(`Please let juror #${currentJuror} enter their secret message.`);
    } else {
        const dataToSave = {
            caseName,
            referenceNumber,
            commitments: commitments.map(c => c.toString()) // Convert BigInt values to strings
        };
        localStorage.setItem('caseData', JSON.stringify(dataToSave));
        alert(`All commitments stored successfully under case name #${caseName} and reference number #${referenceNumber}!`);
        location.reload(); // Refresh the page to start over
    }
}

window.storeSecretMessage = storeSecretMessage;
