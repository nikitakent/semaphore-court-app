# Purpose

This application was designed for Privacy Scaling Explorations [core program](https://pse.dev/en/programs) (2023 Asia ZK Cohort).

The issue was to show a way of using the Semaphore library without using dependencies or blockchain - this would enable developers and students to learn the basics of cryptographic identification management without the added complexities of full-stack development and blockchain protocols.

This project has been built with pure Typescript, Javascript, HTML and CSS. We use the Zustand library for state management of the Merkle Trees, though we are currently working to remove this dependency.

As of writing, there is no merkle tree compatible local state management tool for plain Javascript/Typescript web applications. 

# Jury Member identities and Jury Groups

Semaphore is an open-source identity management library mantained by Privacy Scaling Solutions. We use Semaphore identities (an Edwards-curve Digital Signature Algorithm key-pair) to create the private and public identities of "jury members". Public identities are also referred to as public "commitments" in the Semaphore protocol.

Each jury member is part of a Semaphore group, AKA, A jury group. Groups are created using the commitments of each member of said group. For example:

```
import { Group } from "@semaphore-protocol/group"

const members = [identity1.commitment, identity2.commitment]

const group = new Group(members)
```

**Voting in the Semaphore Jury Voting application**

This toy example allows certain jury groups to be assigned to legal cases. Jury members vote for or against each charge for a case.

While this Jury Voting example is completely hypothetical, one could imagine a potential use-case where jury members do not have to publicly display their votes, and this may be useful in high-security-threat or high-profile cases.

# Usage

1. The Court registers a court case, including a title, summary, and thumbnail picture.
2. The Court then registers a the number of jury members assigned to the court case.
3. One-by-one, each jury member provides a secret phrase (private key) and a commitment is generated from that secret phrase.
4. After the last jury member has provided their secret phrase, and the last commitment has been generated, the group has been created.
5. Ansychronously, each jury member can vote "For" or "Against" per charge pertaining to the case they have been assigned to. Each member must generate a proof that they are a member of the permitted voting group using their identity keys.
6. The case verdict for each charge is reached once all jury members have voted "For" or "Against". The verdict is reached with a majority voting mechanism.

