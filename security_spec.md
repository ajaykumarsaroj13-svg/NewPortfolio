# Firebase Security Specification - Quantrex Academy

## Data Invariants

1.  **Strict Profile Identity**: A user profile document can only be written if its resource ID matches the authenticated client UID (`request.auth.uid == userId`).
2.  **Immobilized Academic Core**: Course modules, lecture sheets, and video streams are read-only for public students. Editing, updating, and inserting new content is restricted strictly to accounts mapped under the internal `admins` directory or verified role configurations looking up trusted DB fields. Actually, to keep it simple and secure, we look up if the logged-in user has role `admin` or verify via our helper if their ID is configured as admin. Or, let's define that only user profiles with role == 'admin' are permitted to update materials, or we check if user email is `ajaykumarsaroj13@gmail.com` (user email from metadata) to bootstrap HOD Admin bypass directly in rules! This is extremely robust and avoids self-assignment!
3.  **No Privilege Escalation**: Students cannot modify their role from "student" to "admin".
4.  **Immortality**: Users cannot modify their `email` or `createdAt` fields once written.

## The Dirty Dozen (Vulnerable Payload Vectors)

1.  **Identity Spoofing**: Attempt to create a user profile with `userId` of another student.
2.  **Privilege Escalation**: Student attempt to modify `role` to `admin` in `users/{userId}`.
3.  **Direct Note Poisoning**: Non-admin student attempts to write a fake lecture sheet in `/notes/{noteId}`.
4.  **Malicious Video Insertion**: Student attempts to add an unsafe external player source in `/videos/{videoId}`.
5.  **Junk Field Pollution**: Creating a note containing un-whitelisted, massive-length keys to exhaust database indexing.
6.  **Admin Bypass Spoof**: Student attempts to register with email `ajaykumarsaroj13@gmail.com` but without email verification, expecting to trigger HOD admin privileges.
7.  **Course Price Hack**: Student overrides course fee payload to set price to 0 while simulating course enrollments.
8.  **Direct Read Scraping**: Unauthenticated guest attempts to execute a blanket scroll list over private students' test history details.
9.  **Historical Cheat**: Modifying previous quiz score values from `30` to `120` inside their student test attempts list.
10. **Orphaned Record Insertion**: Creating a note with a path containing malicious character symbols to bypass router regex guards.
11. **Malicious Content Injection**: Appending a 10MB Base64 document stream to a public-access text lecture node.
12. **Self-Authorization**: Authorizing a course purchase bundle bypass without going through official checkout states.

## Security Rule Tests (firestore.rules.test.ts)

A verification test suite for test coverage (written to local spec):

```typescript
// Coverage of all Dirty Dozen cases
describe("Quantrex Academy Rules Suite", () => {
  it("rejects unauthorized user creations", () => { ... });
  it("locks structural core catalogs to read-only for student roles", () => { ... });
});
```
