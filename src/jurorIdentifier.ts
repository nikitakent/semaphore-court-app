
import { Identity } from "@semaphore-protocol/identity";

let currentJuror: number = 1;
export let totalJurors: number;
export let commitments: bigint[] = [];
export let caseName: string;
export let caseNumber: string;

declare global { 
    interface Window {
    nextStep: (step: number) => void;
    clearMessage: (step: number) => void;
    generateSecretKeys: (step: number) => void;
    }
}

function nextStep(step: number): void {
    const step1: HTMLElement | null = document.getElementById('step1');
    const step2: HTMLElement | null = document.getElementById('step2');
    const step3: HTMLElement | null = document.getElementById('step3');
    const step4: HTMLElement | null = document.getElementById('step4');
    const caseNameElem: HTMLInputElement | null = document.getElementById('caseName') as HTMLInputElement;
    const caseRefElem: HTMLInputElement | null = document.getElementById('referenceNumber') as HTMLInputElement;
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
                caseNumber = caseRefElem.value;
                caseName = caseNameElem.value;
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

function generateSecretKeys (): void {
    const secretMessageElem: HTMLInputElement | null = document.getElementById('secretMessage') as HTMLInputElement;
    const message: string = secretMessageElem ? secretMessageElem.value : '';
    const caseNameElem: HTMLInputElement | null = document.getElementById('caseName') as HTMLInputElement;
    const referenceNumberElem: HTMLInputElement | null = document.getElementById('referenceNumber') as HTMLInputElement;
    const caseName: string = caseNameElem ? caseNameElem.value : '';
    const referenceNumber: string = referenceNumberElem ? referenceNumberElem.value : '';

    if (currentJuror <= totalJurors) {
        const identity = new Identity(message)
        commitments.push(identity.getCommitment());
        const messageDiv = document.getElementById('secretkeys');
        if (messageDiv) {
            messageDiv.innerHTML = 
            `Your Nullifier # is #${identity.getNullifier()}<br><br>` +
            `Your Trapdoor # is #${identity.getTrapdoor()}<br><br>` +
            `Please store these values and keep them secret. <br><br>` +
            `Anyone who knows your Nullifier, Trapdoor, or Secret Message can act on behalf of you. <br>` +
            `If you feel any of these values are compromised, please contact the Semaphore Court immediately.`;
        }
        const button = document.getElementById('clearMessageButton');
            if (currentJuror < totalJurors){
                if (button) {
                    button.style.display = 'block';
                }
            }
            if (currentJuror === totalJurors){
                if (button) {
                    button.style.display = 'none';
                }
                const buttonfinal = document.getElementById('final');
                if (buttonfinal) {
                    buttonfinal.style.display = 'block';
                }
                const dataToSave = {
                    caseName,
                    referenceNumber,
                    totalJurors,
                    commitments: commitments.map(c => c.toString()) // Convert BigInt values to strings
                };  
                localStorage.setItem('caseData', JSON.stringify(dataToSave));
            }
    } else {
    }
}

window.generateSecretKeys = generateSecretKeys;

function clearMessage(): void {
    const secretMessageElem: HTMLInputElement | null = document.getElementById('secretMessage') as HTMLInputElement;

    if (currentJuror < totalJurors) {
        if (secretMessageElem) secretMessageElem.value = ''; // Reset the input for the next juror
            currentJuror++; 
            const messageDiv = document.getElementById('secretkeys');
            if (messageDiv) {
                messageDiv.innerHTML = "" // Clear secret key message from previous user
            }
            alert(`Please let juror #${currentJuror} enter their secret message.`);
            const button = document.getElementById('clearMessageButton');
            if (button) {
                button.style.display = 'none';
            }
    } else {
        alert(`All commitments stored successfully! Please proceed to Group Creation!`);
        location.href = 'jurorGroupGeneration.html';
    }; 
}

window.clearMessage = clearMessage;