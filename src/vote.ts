// @ts-nocheck
// import { Group } from "@semaphore-protocol/group"
// import { Identity } from "@semaphore-protocol/identity";
// import { generateProof, verifyProof } from "@semaphore-protocol/proof"

// const storedData = JSON.parse(localStorage.getItem('caseData') as string);
// const caseName = storedData.caseName;
// const caseNumber = storedData.referenceNumber;
// const totalJurors = storedData.totalJurors;
// const commitments = storedData.commitments.map((c: string) => BigInt(c));

// document.getElementById('caseTitle').textContent = caseName;

// function createSignal(){
//     const messageTextarea = document.querySelector('.message-field') as HTMLTextAreaElement;

//     if (guiltyBtn && notGuiltyBtn) {
//         guiltyBtn.addEventListener('click', () => {
//             console.log("Guilty was pressed");
//             const signal = 1;
//             const userMessage = messageTextarea.value;
//             const identity = new Identity(userMessage);
//             genProof(identity, signal, chargeId);
//             // vote(1);  // Assuming you have a vote function that accepts the signal
//         });

//         notGuiltyBtn.addEventListener('click', () => {
//             const signal = 0;
//             const userMessage = messageTextarea.value;
//             const identity = new Identity(userMessage);
//             genProof(identity, signal, chargeId);
//             // vote(0);  // Calling the vote function with the signal
//         });
//     }
// }


// async function genProof(identity:any, signal: number, chargeId: string) {
//     if (caseData) {
//         const group = new Group(caseData.id, caseData.treedepth, caseData.members as any);
//         const externalNullifier = group.root; // change later to the charge id
//         const fullProof = await generateProof(identity, group, externalNullifier, signal)
//         if (fullProof){
//             alert("Ready to submit");
//             const isVerified = await verifyProof(fullProof, 16);
//             if (isVerified) {
//                 vote(chargeId, signal);
//             } else {
//                 console.error("Verification failed. Cannot proceed with voting.");
//             }
//         }
//     } else {
//         alert("Could not extract case data or data is missing.");
//     }
// }
