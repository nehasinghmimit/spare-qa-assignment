# Submission readiness — 3 November 2026

The strategy, exploration report, API suite, seven browser scenarios across two spec files, GitHub Actions workflow, README and interview notes are available for review. Seven API tests passed in the recorded live run. Seven E2E scenarios are implemented and discoverable. The headless preflight returned HTTP 403 before any scenario started, and zero E2E scenarios have executed successfully. Reliability, E2E-02 identity mapping and E2E-07 eligibility remain unverified. The repository is public under [nehasingh97/spare-qa-assignment](https://github.com/nehasingh97/spare-qa-assignment). A04/A05 and personal interview practice remain open. [Checklist](assignment-checklist.md) · [Setup and suite commands](../README.md)

| Date                       | Verification evidence                                                                                                                                                                                                                                                                                            |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 31 October 2026            | The strategy rendered on one A4 page. Ordinary Chrome exploration covered discovery, details, categories, search, recovery and the comment gate.                                                                                                                                                                 |
| 31 October–1 November 2026 | Bounded read-only API exploration established authentication, identity, pagination and validation behavior. No confirmed defects or vulnerabilities emerged. Q-01, a generic error near the comment control, remains unconfirmed.                                                                                |
| 1 November 2026 · Phase 3  | Full live API run: 7 passed, 0 failed, 0 skipped in 4.14 seconds. Each passed independently. With no token the rejection cases passed and a positive case failed before fetch as intended.                                                                                                                       |
| 1 November 2026 · Phase 4  | Two edited API cases passed a targeted run. Playwright listed seven scenarios. At 11:57:19 UTC the standard headless Chromium 156.0.8078.4 preflight returned HTTP 403 at the homepage with title “Just a moment...”. Exit 1, one setup error, zero scenario starts. This is historical evidence.                |
| 1 November 2026 · Phase 5  | In a focused headed E2E-07 run the listing loaded, then the first candidate detail navigation failed with 403 before the gate could be assessed. A credential-free local copy passed frozen installation, typecheck, lint, formatting and discovery. A loopback 403 verified preflight failure diagnostics only. |

On 3 November 2026 (IST), hosted static checks passed. The initial API job stopped before running tests because its token was unavailable. After the repository secret was configured, the API-only rerun passed all seven tests (0 failed, 0 skipped). The hosted E2E preflight received HTTP 403 before any scenario started. [Hosted static job](https://github.com/nehasingh97/spare-qa-assignment/actions/runs/41516390920/job/125520919415) · [Initial API job](https://github.com/nehasingh97/spare-qa-assignment/actions/runs/41516390920/job/125520920009) · [Hosted API rerun](https://github.com/nehasingh97/spare-qa-assignment/actions/runs/41516390920/job/125533822686) · [Hosted E2E job](https://github.com/nehasingh97/spare-qa-assignment/actions/runs/41516390920/job/125520919829)

[Phase evidence](phase-progress.md) · [Exploratory notes](exploratory-notes.md) · [Findings](findings.md)

## What still needs a live browser

- **E2E-01 and E2E-03:** Verify a usable homepage listing and category-to-collection navigation. Current category landmarks, link labels and product collection locators need confirmation.
- **E2E-02:** The destination path must match the selected link. The H1 comparison uses the listing label with only its rank removed. Equality is provisional: a versioned launch label was observed, but its detail navigation was challenged. Capture both public labels and the destination on an accessible run before deciding whether a mismatch is a product issue or a naming assumption.
- **E2E-04–06:** Verify matching-result navigation, the explicit empty state and recovery together with each scenario's independently discovered data. A manual observation of one search term cannot establish repeatability.
- **E2E-07:** Inspect up to three current listing links, deduplicating their destinations. On a successfully loaded detail page with the expected path and a visible H1, the visibility check returns immediately when “Login to comment” appears. Its 2.5-second bound can miss a control rendered later. A timeout permits trying another candidate; exhausting the sample fails the prerequisite. A challenge or unexpected navigation fails immediately. Dynamic eligibility and scenario readiness remain provisional. The check retains its current bound until timing evidence from an accessible runner supports a change.

## Run after approved headless access is available

From the project root with Bun 1.4.4, use an assignment-approved environment that can reach both listing and detail routes. Public E2E tests need no API token. On Linux:

```sh
bun install --frozen-lockfile
bun --bun x playwright install --with-deps chromium
bun run test:e2e --list
bun run test:e2e
```

On Windows, substitute `bun --bun x playwright install chromium` for the Linux browser installation command.

1. Record time, environment, browser version, exit status, scenario starts and outcomes. If preflight fails, inspect the runner output and `test-results/access-preflight.json` when produced. Record LIM-01 and stop until access changes. For a detail-page challenge, record the affected route and access status separately from scenario assertion failures.
2. For a scenario failure on accessible content, preserve its ignored screenshot and trace before the next run. Check the selected data, navigation, locator and expected behavior. Reproduce just that case, e.g. `bun run test:e2e --grep E2E-02` or `bun run test:e2e --grep E2E-07`. Review and redact artifacts before sharing.
3. After any justified correction, run `bun run test:e2e` for all seven. After a successful full run, run that same command once more in a fresh process with the existing single worker and zero retries. Record both sets of results, including any failure on the second run. Two successful runs provide initial repeatability evidence.

## Hosted CI and publication

The published workflow uses the documented major tags [actions/checkout@v7](https://github.com/actions/checkout/blob/v7/action.yml), [oven-sh/setup-bun@v2](https://github.com/oven-sh/setup-bun/blob/v2/action.yml) and [actions/upload-artifact@v7](https://github.com/actions/upload-artifact/blob/v7/action.yml). Bun itself is pinned to 1.4.4. The YAML and its events, branch filters, permissions, conditional steps and timeouts were reviewed against [GitHub workflow syntax](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax).

Pull requests run only the two credential-rejection API cases. The trusted main rerun verified all seven. Browser acceptance depends on approved access to listing and detail routes or a documented decision from the assignment contact. Rehearse the strategy, demo and extension exercise using the [interview notes](interview-notes.md).
