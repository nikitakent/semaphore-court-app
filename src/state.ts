export class State {
    caseName: string = '';
    caseNumber: string = '';
    totalJurors: number= 1;
    commitments: bigint[] = [];
    setCaseData(name: string, number: string, juror: number, commitment: bigint[]) {
        this.caseName = name;
        this.caseNumber = number;
        this.totalJurors = juror;
        this.commitments = commitment
    }
}

export const appState = new State();
