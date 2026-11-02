# Findings — Phase 2 closeout

Evidence references resolve to [exploratory notes](exploratory-notes.md). No confirmed product defects or vulnerabilities have been established. Scope includes ordinary-browser discovery/detail/category/search and a UI comment gate, plus two API authentication negatives. Valid-token retrieval, identity, pagination and query negatives were subsequently inspected (API-03–07). Headless feasibility remains unresolved.

## Confirmed defects

None confirmed. This does not establish that the product is defect-free.

## Security observations

### SEC-01 — Missing and invalid API credentials rejected

- Classification: positive security observation; severity not applicable.
- Environment/time: Windows, Bun 1.4.4 fetch, 31 October 2026 01:47:55 IST.
- Preconditions: no valid token; safe posts query documented in notes G.
- Steps: POST query without credentials; separately POST same query with intentionally invalid credentials.
- Expected/basis: documented API requires access token; unauthenticated access should not return post data.
- Actual/evidence: API-01/API-02: HTTP 401, data null, invalid_oauth_token; no stack trace or secret observed in these two bodies.
- Reproducibility: once per distinct credential condition, not repeated for stability.
- Impact/next: initial boundary works for these inputs; inspect authenticated query errors and scopes before generalizing. Authentication errors are not standard GraphQL message-shaped errors.

### SEC-02 — Comment control opens sign-in gate

- Classification: positive UI security observation; severity not applicable.
- Environment/time: ordinary Chrome, logged-out UI, approximately 01:46–01:47 IST.
- Preconditions: public product page with Login to comment.
- Steps: open inspected product; click Login to comment; do not submit or select a provider.
- Expected/basis: control explicitly requires login.
- Actual/evidence: WEB-05: Sign up to comment and provider options appeared.
- Reproducibility: one observed attempt; server-side enforcement not evaluated.
- Impact/next: user-facing gate exists; does not prove authorization. Investigate Q-01 separately.

### SEC-04 — Authenticated invalid field and variable requests returned HTTP 200 with errors and no data (API-06/07). No stack trace, credential or internal path observed in these bodies. Classification: positive error-handling observation, no severity. Reproduce using the exact nonsensitive queries in notes; each executed once on 31 October 2026 at 14:38 IST. Expected rejection is based on documented schema field/type rules. Diagnostic type names and echoed nonsensitive input are not vulnerabilities. Next: preserve transport/envelope distinction in later tests.

## Project hygiene

### SEC-03 — Project token handling remains private

- Classification: project hygiene observation; severity not applicable.
- Evidence ENV-01: presence-only check, token initially absent and later configured; .env matches ignore rules. No real credentials, auth state, raw response headers or personal comments retained in submission evidence.
- Limits/next: recheck after user setup and before eventual staging. Ignore rules alone do not guarantee future artifact safety.

## Usability suggestions

None proposed as actionable findings yet; insufficient evidence for a justified recommendation.

## Open questions

### Q-01 — Generic error text appeared alongside comment sign-in gate

- Classification: open question, not confirmed defect; severity undetermined.
- Environment/time: ordinary Chrome, approximately 01:46–01:47 IST; /products/vaani-developer-platfrom.
- Preconditions/steps: logged-out UI; click Login to comment, then inspect resulting state.
- Expected/basis: sign-in gate should explain the required action; source of unrelated error text unknown.
- Actual/evidence: WEB-05 included Sign up to comment and generic Something went wrong below the original comment control.
- Reproducibility: one observation only; no causal or repeatability claim.
- Impact/next: potential confusion; reproduce in approved ordinary browser and inspect relevant sanitized network failure before assigning defect/severity. Do not submit a comment to investigate.

Q-01 follow-up: ordinary Chrome revisit around 14:40 IST was signed in after user token setup. Original logged-out precondition was unavailable; no logout, content submission or write action was performed. Q-01 remains unconfirmed.

Closeout WEB-06: the logged-out precondition was established in a fresh headed session. On one click neither the original generic error nor the sign-up heading was observed in the bounded observation interval. HTTP 403/401 responses were not causally linked. Recurrence unconfirmed.

## Access/environment limitations

### LIM-01 — Ordinary Chrome access does not establish headless access

- Classification: execution limitation, not product vulnerability; severity not assigned.
- Environment: ordinary Chrome succeeded during Phase 2; Phase 1 headless Chromium received HTTP 403 with Just a moment at homepage.
- Evidence: WEB-01–WEB-05 versus prior phase-progress record. HTTP status in ordinary UI was not measured.
- Reproducibility: one separate closeout assessment (WEB-07) returned HTTP 403 with challenge title and no product listings; several distinct ordinary-browser journeys inspected.
- Impact/next: proposed real-web E2E scenarios are blocked for the required execution environment until authorized headless access can be established. Next dependency: an accessible execution environment or clarification from the assignment contact. Hosted CI access remains unverified. No stealth, proxy rotation or clearance-cookie reuse.

### LIM-02 — Valid API token unavailable (resolved)

- Classification: prerequisite limitation; severity not assigned.
- Evidence ENV-01: token absent on initial and follow-up presence checks.
- Impact: successful retrieval, identity/pagination, and authenticated query negatives were blocked initially and completed after token setup (API-03–07).
- Resolution: user configured ignored .env; presence-only check and five successful authenticated exchanges at 14:38 IST resolved this prerequisite. Token value was never displayed.
