# Assignment checklist

Source: complete two-page Spare QA Engineering Assignment.docx.pdf supplied by the user. Pending means not yet fulfilled; foundation checks are not assignment coverage.

[nehasingh97/spare-qa-assignment](https://github.com/nehasingh97/spare-qa-assignment) is public. On 3 November 2026 (IST), hosted static checks passed. The initial API job stopped before running tests because its token was unavailable. After the repository secret was configured, the API-only rerun passed all seven tests (0 failed, 0 skipped). The hosted E2E preflight received HTTP 403 before any scenario started. [Hosted static job](https://github.com/nehasingh97/spare-qa-assignment/actions/runs/41516390920/job/125520919415) · [Initial API job](https://github.com/nehasingh97/spare-qa-assignment/actions/runs/41516390920/job/125520920009) · [Hosted API rerun](https://github.com/nehasingh97/spare-qa-assignment/actions/runs/41516390920/job/125533822686) · [Hosted E2E job](https://github.com/nehasingh97/spare-qa-assignment/actions/runs/41516390920/job/125520919829)

## Explicit assignment requirements

| ID  | Requirement                                                           | Planned deliverable                 | Validation                                        | Status                                                                                         |
| --- | --------------------------------------------------------------------- | ----------------------------------- | ------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| A01 | Markdown strategy, maximum one page, sole-QA priorities and rationale | docs/test-strategy.md, Phase 1      | Content review and rendered-page check            | Complete; one-page render verified                                                             |
| A02 | Explore Product Hunt website and API                                  | Exploration notes, Phase 2          | Timestamped reproducible evidence                 | Complete for manual and API exploration (WEB-01–07, API-01–09)                                 |
| A03 | Ethical security assessment and engineering-quality findings          | Findings, Phase 2                   | Evidence, impact, classification and scope review | Complete for bounded ethical assessment. Q-01 unconfirmed.                                     |
| A04 | 5–8 priority Playwright scenarios against web app                     | E2E specs, Phase 4                  | Scenario count and real execution                 | Seven discovered. Headless execution blocked. E2E-02 mapping and E2E-07 selection provisional. |
| A05 | CI-ready, headless E2E without flaky waits                            | Config, tests, workflow             | Headless repeat runs and workflow review          | Partial. Headless access blocked (LIM-01), reliability unverified.                             |
| A06 | 5–8 typed, isolated, structured GraphQL API tests                     | API specs, Phase 3                  | Counts, runtime assertions and execution          | Complete. Seven passed locally and in the hosted API rerun.                                    |
| A07 | Bun, TypeScript, Playwright and TS HTTP client                        | Foundation plus native fetch client | Tool versions, typecheck, actual suite runs       | Stack verified. Live headless behavior is assessed separately under A04/A05.                   |
| A08 | Public GitHub repository and clear structure                          | Public assignment repository        | Public repository inspection                      | Verified public on main.                                                                       |
| A09 | README setup, suite execution, findings, decisions, future work       | README, finalized Phase 5           | Clean setup and completeness review               | Complete locally. Setup, commands, findings, limitations and future work reviewed.             |
| A10 | Explain, demo and extend submitted code at interview                  | Interview notes and practice        | User walkthrough/live extension                   | Notes delivered. User practice pending.                                                        |

The 4–6 hour effort is guidance, not a coverage target. AI use is allowed with understanding of submitted code.

## Supporting engineering choices and user constraints

| ID  | Requirement/choice                                 | Deliverable                       | Validation                                | Status                                                         |
| --- | -------------------------------------------------- | --------------------------------- | ----------------------------------------- | -------------------------------------------------------------- |
| E01 | Initial local-only development (historical)        | Dedicated folder and Git metadata | Git inspection                            | Verified                                                       |
| E02 | Strict types and one lint/format toolchain         | TypeScript and Biome              | CLI checks                                | Verified                                                       |
| E03 | Independent runners with bounded discovery         | bunfig and Playwright config      | Config inspection and populated discovery | Verified. Each runner discovers only its own seven cases.      |
| E04 | Exact dependencies and compatible lock             | package.json, bun.lock            | Frozen installation                       | Verified                                                       |
| E05 | Credential/config boundaries                       | API getter and browser validation | Positive/negative configuration probes    | Verified                                                       |
| E06 | Headless Chromium availability                     | Local browser installation        | Launch/close smoke probe                  | Verified                                                       |
| E07 | Ignore secrets, auth state and artifacts           | .gitignore                        | git check-ignore                          | Verified representative paths                                  |
| E08 | Native fetch, runtime assertions, bounded requests | Phase 3 client and tests          | Implementation and real executions        | Verified; nine bounded requests per full suite                 |
| E09 | Local CI workflow, separate jobs                   | Phase 5 workflow                  | Review; hosted run separately             | Hosted static and API passed. Hosted E2E blocked at preflight. |

## Optional future improvements

| ID  | Improvement                               | Deliverable             | Validation                              | Status   |
| --- | ----------------------------------------- | ----------------------- | --------------------------------------- | -------- |
| O01 | Additional browsers/devices               | Expanded projects       | Cross-browser runs                      | Deferred |
| O02 | Controlled data and production monitoring | Future operational plan | Design review in authorized environment | Deferred |
