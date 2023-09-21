import { Group } from "@semaphore-protocol/group"
import { commitments } from './jurorIdentifier';

const juryForm = document.getElementById('juryForm');
const submittedCaseDiv = document.getElementById('submittedCase');
const nextBtn = document.getElementById('nextBtn');

juryForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const caseName = (document.getElementById('caseName') as any).value
    const caseID = (document.getElementById('caseID') as any).value
    const treeDepth = (document.getElementById('treeDepth') as any).value
    // ... similarly retrieve other form values

    const group = new Group(caseID, Number(treeDepth));
    console.log(group.id, group.depth);
    console.log(group)

    // For demonstration, just display the data without the image
    submittedCaseDiv.innerHTML = ` 
        Case Name: ${caseName}<br>
        Case ID: ${caseID}<br>
        Tree Depth: ${treeDepth}</br>
    `;

    nextBtn.style.display = 'block';  // Show the Next button
});

nextBtn.addEventListener('click', function() {
    location.href = 'jurorIdentifier.html';
});
