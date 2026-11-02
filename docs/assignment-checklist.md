# Assignment checklist

Source: complete two-page Spare QA Engineering Assignment.docx.pdf supplied by the user. Pending means not yet fulfilled; foundation checks are not assignment coverage.

## Explicit assignment requirements

| ID  | Requirement                                                           | Planned deliverable                                 | Validation                                        | Status                                                                                         |
| --- | --------------------------------------------------------------------- | --------------------------------------------------- | ------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| A01 | Markdown strategy, maximum one page, sole-QA priorities and rationale | docs/test-strategy.md, Phase 1                      | Content review and rendered-page check            | Complete; one-page render verified                                                             |
| A02 | Explore Product Hunt website and API                                  | Exploration notes, Phase 2                          | Timestamped reproducible evidence                 | Complete for manual and API exploration (WEB-01–07, API-01–09)                                 |
| A03 | Ethical security assessment and engineering-quality findings          | Findings, Phase 2                                   | Evidence, impact, classification and scope review | Complete for bounded ethical assessment. Q-01 unconfirmed.                                     |
| A04 | 5–8 priority Playwright scenarios against web app                     | E2E specs, Phase 4                                  | Scenario count and real execution                 | Seven discovered. Headless execution blocked. E2E-02 mapping and E2E-07 selection provisional. |
| A05 | CI-ready, headless E2E without flaky waits                            | Config, tests, workflow                             | Headless repeat runs and workflow review          | Partial. Headless access blocked (LIM-01), reliability unverified.                             |
| A06 | 5–8 typed, isolated, structured GraphQL API tests                     | API specs, Phase 3                                  | Counts, runtime assertions and execution          | Complete; seven passed as a suite and individually                                             |
| A07 | Bun, TypeScript, Playwright and TS HTTP client                        | Foundation plus native fetch client                 | Tool versions, typecheck, actual suite runs       | Partial. API verified, Playwright discovery verified, live E2E blocked.                        |
| A08 | Public GitHub repository and clear structure                          | Local project then separately authorized submission | Public repository inspection                      | Pending; publishing prohibited in current scope                                                |
| A09 | README setup, suite execution, findings, decisions, future work       | README, finalized Phase 5                           | Clean setup and completeness review               | Complete locally. Setup, commands, findings, limitations and future work reviewed.             |
| A10 | Explain, demo and extend submitted code at interview                  | Interview notes and practice                        | User walkthrough/live extension                   | Notes delivered. User practice pending.                                                        |

The 4–6 hour effort is guidance, not a coverage target. AI use is allowed with understanding of submitted code.

## Supporting engineering choices and user constraints

| ID  | Requirement/choice                                 | Deliverable                       | Validation                                | Status                                                      |
| --- | -------------------------------------------------- | --------------------------------- | ----------------------------------------- | ----------------------------------------------------------- |
| E01 | Local repository, no remote/staging/commits        | Dedicated folder and Git metadata | Git inspection                            | Verified                                                    |
| E02 | Strict types and one lint/format toolchain         | TypeScript and Biome              | CLI checks                                | Verified                                                    |
| E03 | Independent runners with bounded discovery         | bunfig and Playwright config      | Config inspection and populated discovery | Verified. Each runner discovers only its own seven cases.   |
| E04 | Exact dependencies and compatible lock             | package.json, bun.lock            | Frozen installation                       | Verified                                                    |
| E05 | Credential/config boundaries                       | API getter and browser validation | Positive/negative configuration probes    | Verified                                                    |
| E06 | Headless Chromium availability                     | Local browser installation        | Launch/close smoke probe                  | Verified                                                    |
| E07 | Ignore secrets, auth state and artifacts           | .gitignore                        | git check-ignore                          | Verified representative paths                               |
| E08 | Native fetch, runtime assertions, bounded requests | Phase 3 client and tests          | Implementation and real executions        | Verified; nine bounded requests per full suite              |
| E09 | Local CI workflow, separate jobs                   | Phase 5 workflow                  | Review; hosted run separately             | Authored and locally reviewed. Hosted execution unverified. |

## Optional future improvements

| ID  | Improvement                               | Deliverable             | Validation                              | Status   |
| --- | ----------------------------------------- | ----------------------- | --------------------------------------- | -------- |
| O01 | Additional browsers/devices               | Expanded projects       | Cross-browser runs                      | Deferred |
| O02 | Controlled data and production monitoring | Future operational plan | Design review in authorized environment | Deferred |
