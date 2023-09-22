import { Group } from "@semaphore-protocol/group"
import { Identity } from "@semaphore-protocol/identity";
import { generateProof, verifyProof } from "@semaphore-protocol/proof"

const storedData = JSON.parse(localStorage.getItem('caseData') as string);
const caseName = storedData.caseName;
const caseNumber = storedData.referenceNumber;
const totalJurors = storedData.totalJurors;
const commitments = storedData.commitments.map((c: string) => BigInt(c));

document.getElementById('caseTitle').textContent = caseName;
