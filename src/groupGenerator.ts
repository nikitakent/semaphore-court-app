// @ts-nocheck
import { Group } from "@semaphore-protocol/group"
import { createStore } from "zustand/vanilla"

const storedData = JSON.parse(localStorage.getItem('caseData') as string);

// Retrieve the values from the parsed object
const caseName = storedData.caseName;
const caseNumber = storedData.referenceNumber;
const totalJurors = storedData.totalJurors;
const commitments = storedData.commitments
// .map((c: string) => BigInt(c));

console.log(caseName, totalJurors, caseNumber, commitments);
const juryForm = document.getElementById('juryForm');
const submittedCaseDiv = document.getElementById('submittedCase');
const nextBtn = document.getElementById('nextBtn');

juryForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const treeDepth = (document.getElementById('treeDepth') as any).value
    // ... similarly retrieve other form values
    console.log(caseNumber, Number(treeDepth), commitments);
    const group = new Group(caseNumber, Number(treeDepth), commitments);
    //test
    console.log(group.id, group.depth);
    console.log(group)
    // save into local storage so can be retrieved in the votingApp.html
    // const group = createStore(() => (
    //     { ... }
    //     ))
    // const { getState, setState, subscribe } = group
    // export default store
    // is there a better way to store the group variable without it being turned into a json?

    // For demonstration, just display the data without the image
    submittedCaseDiv.innerHTML = ` 
        Case Name: ${caseName}<br>
        Case ID: ${caseNumber}<br>
        Tree Depth: ${treeDepth}</br>
    `;
    nextBtn.style.display = 'block';  // Show the Next button
});

nextBtn.addEventListener('click', function() {
    location.href = './votingApp.html';
});

function calculateRecommendedDepth(totalJurors: number): number | null {
    for (let i = 16; i <= 32; i++) {
        if (2 ** i > totalJurors + 100) {
            return i;
        }
    }
    return null;
}

window.onload = function() {
    const recommendedDepth = calculateRecommendedDepth(totalJurors);

    const titleElem = document.getElementById('juryGroupTitle');
    if (titleElem) {
        titleElem.textContent = `Group Generation for ${caseName} (${caseNumber})`;
    }

    const descriptionElem = document.getElementById('juryGroupDescription');
    if (descriptionElem && recommendedDepth !== null) {
        descriptionElem.innerHTML = `Since the group has ${totalJurors} jurors, we recommend setting the tree depth to ${recommendedDepth}. The minimum depth permitted is 16, and the maximum is 32.`;
    } else if (descriptionElem) {
        descriptionElem.innerHTML = `The number of jurors is too large to find a suitable tree depth between 16 and 32.`;
    }
}
