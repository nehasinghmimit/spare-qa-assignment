# Phase 2 exploratory notes

**Closeout, 1 November 2026.** Manual website and API charters complete. Seven API candidates ready for implementation. Q-01 unconfirmed. Headless execution blocked (LIM-01).

## Initial session, before token setup

Session: 31 October 2026, approximately 01:44–01:51 IST (+05:30). This first session ended before token setup. The planning timebox excluded waiting. No assignment automation was implemented.

Environment: Windows; existing ordinary Chrome session through browser extension, visible/headed mode, Product Hunt displayed Sign in. Browser version and HTTP navigation status were not exposed by the inspected UI and are unverified. API requests used Bun 1.4.4 native fetch, sequentially, 15-second abort timeout. Headless Playwright's earlier Phase 1 HTTP 403 remains a separate unresolved constraint; no repeated challenge requests, cookie copying or bypass were attempted.

Evidence below consists of deliberately selected text observations from tool snapshots/responses, not full raw dumps. Personal names, profiles, comments, cookies, credentials and headers are omitted. Public product names identify inspected records only and must not become fixed automation data. No screenshots or authentication-state files are retained for this session.

## A — Public discovery

- Objective/risk: visitors can identify available products rather than encounter an empty discovery surface.
- Environment/time: ordinary Chrome, approximately 01:44–01:46 IST; https://www.producthunt.com/.
- Actions: opened homepage once; inspected main listing and public navigation.
- Outcome/evidence WEB-01: title "Product Hunt – The best new products in tech."; heading "Top Products Launching Today"; product link "1. Vaani Developer Platform" and tagline; Search, Best Products and Sign in controls present.
- Questions/limits: HTTP status unmeasured; ranking correctness, all cards and headless accessibility unverified. Single-session observation, not reliability evidence.

## B — Listing to product details

- Objective/risk: selected product identity survives navigation.
- Environment/time: ordinary Chrome, approximately 01:45–01:46 IST.
- Actions: clicked observed listing link; inspected completed navigation.
- Outcome/evidence WEB-02: /products/vaani-developer-platfrom showed H1 "Vaani Developer Platform", matching tagline, Overview/Reviews/Alternatives links and Visit website link. Did not visit third-party destination.
- Questions/limits: observed one product only; product versus API post identity mapping remains unverified. A snapshot immediately after click showed the previous page; a subsequent snapshot established the destination. This supports condition-based waiting, not a navigation defect.

## C — Categories

- Objective/risk: alternative discovery route leads to relevant product collections.
- Environment/time: ordinary Chrome, approximately 01:47–01:48 IST.
- Actions: opened observed /categories?ref=header_nav route; selected AI Presentation Software.
- Outcome/evidence WEB-03: directory H1 "Product Categories"; category destination /categories/ai-presentation-software showed "AI Presentation Software Reviewed & Ranked for 2026", "Top reviewed AI presentation software products", and product links including Gamma.
- Questions/limits: category relevance, filters and ordering were not exhaustively assessed. No fixed count/rank should be asserted.

## D — Search and recovery

- Objective/risk: users find products and recover from no results.
- Environment/time: ordinary Chrome, approximately 01:48–01:50 IST, starting on category page.
- Actions: direct fill of header Search timed out; inspected control, clicked it, then filled the actual modal textbox "Search for products, launches, or people..." with Vaani. Replaced with qa-no-match-752f9af6-20261031; restored Vaani and clicked the matching product launch link.
- Outcome/evidence WEB-04: ordinary query displayed Products and Vaani Developer Platform; no-match query displayed `No results found for "qa-no-match-752f9af6-20261031"`; restored query returned results. Destination /products/vaani-developer-platfrom?launch=vaani-developer-platform showed matching H1/tagline.
- Questions/limits: header input is an entry point into modal search, not a directly fillable target in this interaction. Initial fill failure is an investigation-tool limitation, not a confirmed bug. Search ranking, full-results page and keyboard-only operation remain unverified.

## E — Logged-out boundary

- Objective/risk: protected comments require sign-in without accidental public writes.
- Environment/time: ordinary Chrome, approximately 01:46–01:47 IST; product detail route above.
- Actions: selected "Login to comment" without typing a comment or selecting an identity provider.
- Outcome/evidence WEB-05: heading "Sign up to comment" and provider sign-in buttons appeared. A later snapshot also contained generic "Something went wrong." beneath the comment control. No comment was submitted.
- Questions/limits: UI gate observed, server-side authorization not proven. Generic error not reproduced or causally diagnosed; retained as Q-01 rather than defect. Authentication providers and authenticated actions were not tested.

## F — API retrieval, identity and pagination

- Objective/risk: integrations receive usable public records and stable identity across pages/detail lookups.
- Environment/time: documentation review around 01:47 IST; authenticated execution was initially blocked.
- Actions: reviewed official [overview](https://api.producthunt.com/v2/docs), [posts](https://api-v2-docs.producthunt.com/query/posts/) and [post](https://api-v2-docs.producthunt.com/query/post/) references before requests. Previously reviewed Post/PostConnection schema remains relevant.
- Evidence DOC-01: posts supports first (Int), after (String), and returns nodes/pageInfo; post accepts id or slug; id/name/slug are documented non-null. Overview requires access token. These are documentation facts, not executed API contracts.
- Evidence ENV-01: presence-only Bun check returned PH_API_TOKEN configured: false; git check-ignore .env returned .env. No environment values printed. User asked to configure token privately in ignored local .env.
- Questions/limits: valid retrieval, token scope, post/detail identity and pagination were unverified at this point.

## G — Authentication negatives and disclosure

- Objective/risk: missing/invalid credentials cannot retrieve protected API responses; errors avoid sensitive disclosure.
- Environment/time: Bun native fetch; 2026-10-31 01:47:55 IST. Endpoint https://api.producthunt.com/v2/api/graphql.
- Actions: two sequential POSTs, identical safe query `{ posts(first: 1) { nodes { id name } } }`; first omitted credentials, second used a deliberately invalid non-secret credential. No real token was used. No retries or concurrent requests.
- Evidence API-01 (missing, 20:17:55.606Z) and API-02 (invalid, 20:17:55.913Z): HTTP 401; application/json; `data: null`; one errors entry with `error: "invalid_oauth_token"` and description requesting a valid token/scopes. No stack trace or credential appeared in these inspected bodies.
- Questions/limits: auth errors use error/error_description rather than a GraphQL message field. Future negative assertions must respect that observed envelope. Invalid field/variable probes were deferred until valid authentication allows query validation; otherwise authentication rejection would mask their intended behavior. No claim about all errors or authorization paths.

## Handoff recorded before token setup (historical)

Continue Phase 2 after private token setup: valid small collection and by-ID lookup, bounded pagination, one invalid field and one invalid variable type, review error disclosure, investigate Q-01, and assess an authorized path to headless execution. No confirmed defects established by this initial session. Exploration and security assessment were partial at that handoff.

## Resumed F/G — authenticated API checks

31 October 2026, 14:38:29–14:38:40 IST; Windows/Bun 1.4.4; official GraphQL endpoint. Presence-only check confirmed token available and `.env` still ignored. Rechecked official posts/post and [PageInfo](https://api-v2-docs.producthunt.com/object/pageinfo/) documentation. Five sequential read-only POSTs, 15-second timeout each; no retries or writes. Credentials read only from environment, never recorded. Exact-token redaction applied before response display; reviewed evidence contains public record identifiers and error metadata only.

| Evidence              | Request                                                                                                                                      | Actual result                                                                                                                                       |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| API-03, 09:08:29.455Z | `{ posts(first: 2) { nodes { id name slug } pageInfo { endCursor hasNextPage } } }`                                                          | HTTP 200; nodes: 1298527 / Ilo Orb / ilo-orb and 1295031 / Uptown Funk AI / uptown-funk-ai; endCursor Mg, hasNextPage true; no errors               |
| API-04, 09:08:39.059Z | `query($id: ID!) { post(id: $id) { id name slug } }`, id discovered in API-03                                                                | HTTP 200; first discovered ID/name/slug matched exactly; no errors                                                                                  |
| API-05, 09:08:39.402Z | `query($after: String) { posts(first: 2, after: $after) { nodes { id name slug } pageInfo { endCursor hasNextPage } } }`, cursor from API-03 | HTTP 200; two different IDs 1264260 and 1296205; endCursor NA, hasNextPage true; no errors                                                          |
| API-06, 09:08:39.666Z | `{ posts(first: 1) { nodes { id qaNonexistentField } } }`                                                                                    | HTTP 200; errors array, no data; field does not exist on Post; extensions.code undefinedField; fieldName qaNonexistentField; location/path metadata |
| API-07, 09:08:39.928Z | `query($count: Int!) { posts(first: $count) { nodes { id } } }`, count = string not-an-integer                                               | HTTP 200; errors array, no data; Int! variable invalid value; extensions describes failed coercion and echoes nonsensitive supplied input           |

Runtime inspection confirmed arrays, string identities/names/slugs and boolean hasNextPage for these samples. No stack trace, secret or internal filesystem path appeared in inspected errors. Schema names, query locations and supplied invalid input are diagnostic metadata, not demonstrated vulnerabilities. IDs/cursors above are evidence only; future tests must discover their own. Changing live order means pagination assertions need stable ordering/data windows; one disjoint sample does not establish snapshot consistency.

API prerequisite resolved: seven exploratory API calls across both sessions, zero assignment tests. Ordinary Chrome revisit around 14:40 IST displayed a signed-in account. No provider/account/write controls were used. Q-01 cannot be reproduced under its original logged-out precondition in this session; left open without changing user login state. Browser HTTP status/version remain unmeasured. Headless block remains historical and unresolved, not repeatedly retried.


## Closeout observations, 1 November 2026 (IST)

**API-08/09.** At 17:13:52 IST two sequential authenticated POSTs used identical filters: posts(first: 2, order: NEWEST), postedAfter 2026-10-01T00:00:00Z and postedBefore 2026-10-08T00:00:00Z. Requested edges { cursor node { id } } and pageInfo { startCursor endCursor hasNextPage }. The second request passed the first endCursor unchanged as after. Both returned HTTP 200, zero errors, two edges, hasNextPage true, and start/end cursors equal to their respective first/last edge cursors. The second endCursor differed from the first. Observed page IDs were 1270302/1271732 and 1272368/1272366. Treat IDs as sample evidence only. The API documents NEWEST as descending creation date, but offers no snapshot guarantee here. Verify continuation and cursor coherence without decoding cursors or requiring disjoint IDs. [posts query](https://api-v2-docs.producthunt.com/query/posts/) · [PostsOrder](https://api-v2-docs.producthunt.com/enum/postsorder/)

**WEB-06, Q-01.** The bundled headed Chromium launcher failed locally before navigation (uv_spawn EUNKNOWN). A fresh headed Chrome 156.0.8078.76 context reached the public product detail page at 17:14:08 IST, HTTP 200. Login to comment was visible. Clicked once without entering text. The sign-up heading was not observed within five seconds, nor the generic error within the following three seconds. HTTP 403 and 401 responses were observed during the page session; status-only evidence cannot identify a causal request. The earlier message did not recur in this attempt. Q-01 stays unconfirmed. The existing signed-in session was untouched.

**WEB-07, LIM-01.** At 17:13:59 IST one standard headless Playwright Chromium 156.0.8078.4 navigation requested https://www.producthunt.com/ and finished at the same URL with HTTP 403 and title “Just a moment...”. The expected listing heading did not become visible in five seconds. Actual listing content did not load. No retry. Manual Chrome and hosted CI are distinct environments; hosted CI access is unverified.

Closeout comprised two API reads, one headless homepage request, and one headed product navigation with one gate click. Active probes were observed around 17:13–17:14 IST, separate from documentation and validation time. No full 45–60 minute effort claim. Nine API exploration calls cumulatively. No assignment tests executed.
