# Feature Research

**Domain:** Personal finance / cost-of-living tracker (mobile-web, Sri Lanka / LKR)
**Researched:** 2026-04-05
**Confidence:** HIGH (design system component inventory verified via Storybook index; domain patterns drawn from established personal finance app conventions)

---

## Source Context

The Costra design system Storybook (`costra-design-system.vercel.app`) confirmed 9 flows with the following component groups:

- **Splash** — Top Label, Brand Mark, Hero Block, Message Block, Progress Indicator, Progress Block, Footer Note, Screen Assembly
- **Onboarding** — Status Bar, Wordmark, Copy Stack, Feature Card, Illustration Panel, Navigation and Actions, Screen Scaffold
- **Register** — Form Elements, OTP Entry, Choice Groups, Ready Card, Screen Scaffold (account screens: empty, filled, verification, profile, ready)
- **Login** — Phone Card, Screen Assembly
- **Home** — Header Cluster, Hero Budget Card, Spending and Alerts, Lists and Search, Notifications and Details, Actions/Voice/Nav, Place Rows, Add Flow Controls
- **Track** — Expense Controls, Income Controls, Success States
- **Wallet** — Wallet Overview Cluster, Income and Credit, Transactions and Actions, Balance Inputs
- **Insights** — Header and Summary, Category Breakdown, Supporting Cards
- **Profile** — Identity and Setup, Preferences and Automation, Security and Danger

This inventory is the authoritative guide to what Costra renders. Features below are organized by flow and derived from both the component names and personal finance UX conventions.

---

## Feature Landscape by Flow

### Flow 1: Splash

**Purpose:** Brand entry point. Shown while the app initializes or assets load.

#### Table Stakes

| Feature | Why Expected | Complexity | Hardcoded Feasibility | Notes |
|---------|--------------|------------|-----------------------|-------|
| Animated brand mark / logo reveal | Users expect a polished brand moment; blank loading screens feel broken | LOW | Yes — CSS animation | CSS keyframe or Framer Motion fade-in |
| App name / wordmark display | Identifies the product immediately | LOW | Yes | Static text or SVG |
| Progress indicator (loading bar or dots) | Signals the app is working, not frozen | LOW | Yes — fake timer | setTimeout driving a progress bar; no real load event needed |
| Footer note (version / tagline) | Standard splash footer; sets tone | LOW | Yes | Hardcoded string |
| Auto-navigation to Welcome / Home | Splash must exit automatically | LOW | Yes — setTimeout + React Router | After ~2.5s, navigate('/welcome') or navigate('/home') |

#### Differentiators

| Feature | Value Proposition | Complexity | Hardcoded Feasibility | Notes |
|---------|-------------------|------------|-----------------------|-------|
| Sri Lankan visual motif in hero block | Signals the app is made for this market; builds immediate trust | LOW | Yes | Illustration or pattern asset |
| Lime-green brand color (#c8ff00) used boldly | Costra has a distinctive brand accent; commit to it on the first screen | LOW | Yes | Tailwind config token |

#### Anti-Features

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Video splash / Lottie animation > 3s | "Feels premium" | Delays entry; frustrates return users; mobile data cost in LK is real | Short CSS animation ≤ 2s; no video |
| Skip button on splash | "User control" | Splash is already ≤ 3s; a skip button adds clutter to a transient screen | Just make the splash short |

---

### Flow 2: Welcome

**Purpose:** First screen after splash for a new/returning user. Presents the product value proposition and primary CTAs (Register / Login).

#### Table Stakes

| Feature | Why Expected | Complexity | Hardcoded Feasibility | Notes |
|---------|--------------|------------|-----------------------|-------|
| Product value headline | Users need to understand "what is this" in one line | LOW | Yes | Static copy |
| Supporting subtext / tagline | Reinforces the headline; sets context (Sri Lanka, LKR) | LOW | Yes | Static copy |
| "Get Started" / Register CTA | Primary action for new users | LOW | Yes — navigation | navigate('/register') |
| "Log In" CTA | Returning users must reach login directly | LOW | Yes — navigation | navigate('/login') |
| Hero illustration or image | Establishes visual language; empty welcome screens feel unfinished | LOW | Yes — asset | DS provides Illustration Panel |

#### Differentiators

| Feature | Value Proposition | Complexity | Hardcoded Feasibility | Notes |
|---------|-------------------|------------|-----------------------|-------|
| Sri Lankan cost-of-living framing in copy | "Track your spending in LKR" vs generic "manage money" — specificity builds credibility | LOW | Yes | Copywriting decision |
| Social proof element (subtle, e.g. "Join X users tracking LKR") | Reduces signup hesitation | LOW | Yes — hardcoded number | Mock number like "5,000+ users" |

#### Anti-Features

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Carousel / multi-slide welcome | "Show all value props" | Splits focus; users swipe past without reading; delays reaching CTA | Single clear headline + one differentiating subline |
| Guest / demo mode on welcome screen | "Lower barrier to entry" | Bypasses onboarding context; users miss feature education | Move demo to post-onboarding if needed |

---

### Flow 3: Onboarding

**Purpose:** Feature education for new users (4 screens based on DS). Teaches the app's core value before account creation.

#### Table Stakes

| Feature | Why Expected | Complexity | Hardcoded Feasibility | Notes |
|---------|--------------|------------|-----------------------|-------|
| 3–4 feature education cards | Standard onboarding length; industry norm | LOW | Yes — static content | DS confirms 4 onboarding screens |
| Progress dots / indicator | Shows "how many steps left"; reduces abandonment | LOW | Yes | DS provides Progress Indicator component |
| Illustration per slide | Visual anchor for each value prop | LOW | Yes — assets | DS provides Illustration Panel |
| Feature card headline + body | Clear, minimal copy per screen | LOW | Yes | Static strings |
| "Next" / "Skip" navigation | Users expect both; Skip for returning users who landed here | LOW | Yes — navigation | DS provides Navigation and Actions component |
| Final CTA to Register | Onboarding must terminate at register or login | LOW | Yes | navigate('/register') on last slide |

#### Differentiators

| Feature | Value Proposition | Complexity | Hardcoded Feasibility | Notes |
|---------|-------------------|------------|-----------------------|-------|
| LKR / Sri Lanka-specific copy in value props | "Track your monthly kottu money" not "track your groceries" — localized examples feel real | LOW | Yes | Copywriting; use realistic LKR spending examples |
| Value props ordered by user pain: Track → Understand → Improve | Maps to the Costra product arc; users grasp the journey | LOW | Yes | Content ordering decision |

#### Anti-Features

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| 6+ onboarding slides | "More education = better retention" | Drop-off increases sharply after slide 3; users are not ready to read | 3–4 slides max; move detail to in-app tooltips |
| Permission prompts during onboarding | "Best time to ask" | Notifications / location during onboarding have low grant rates and cause distrust | Ask permissions contextually when first needed (e.g., when user sets up alerts) |

---

### Flow 4: Register

**Purpose:** Account creation. DS shows 5 screens: empty form, filled form, OTP verification, profile setup, ready state.

#### Table Stakes

| Feature | Why Expected | Complexity | Hardcoded Feasibility | Notes |
|---------|--------------|------------|-----------------------|-------|
| Phone number entry | Sri Lanka market: phone-first auth is dominant; email is secondary | LOW | Yes — input UI | DS: Phone Card / Form Elements; no real submission |
| OTP verification screen | Standard step after phone entry; users expect SMS verification | LOW | Yes — UI only | DS: OTP Entry; hardcode a "correct" OTP or auto-advance |
| Name / profile field | Personalization starts at registration | LOW | Yes | Form Elements |
| Choice groups (e.g., income bracket, goals) | Personalizes initial data; matches DS "Choice Groups" component | MEDIUM | Yes | DS: Choice Groups; hardcoded options only |
| "Ready" / success state | Confirms registration complete; sets positive tone | LOW | Yes | DS: Ready Card |
| Progress indicator across steps | Multi-step form needs progress context | LOW | Yes | Step count or dots |
| Navigation to Login | Users who already have accounts need a route back | LOW | Yes | navigate('/login') link |

#### Differentiators

| Feature | Value Proposition | Complexity | Hardcoded Feasibility | Notes |
|---------|-------------------|------------|-----------------------|-------|
| Income bracket / spending profile selection during registration | Pre-seeds the app with context so home screen feels personalized from day one | MEDIUM | Yes | Hardcoded options; mock data layer uses selected value |
| "Your app is ready" celebratory ready card | Emotional confirmation; reduces post-signup regret | LOW | Yes | DS: Ready Card with animation |

#### Anti-Features

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Email + password auth | "More secure / familiar" | Email auth is friction in SL market; phone-first is the norm (Dialog, Mobitel, Sampath etc. all use OTP) | Phone + OTP only for v1 |
| Real-time field validation with server calls | "Better UX" | No backend in v1; fake validation creates inconsistency | Client-side format validation only (phone length, OTP digit count) |
| Social login (Google, Facebook) | "Reduce friction" | OAuth setup needs backend; out of scope for frontend-only | Defer to v2 with backend |

---

### Flow 5: Login

**Purpose:** Returning user entry. DS shows 2 screens: phone entry and OTP/verification. Simple flow.

#### Table Stakes

| Feature | Why Expected | Complexity | Hardcoded Feasibility | Notes |
|---------|--------------|------------|-----------------------|-------|
| Phone number input | Matches registration method | LOW | Yes — input UI | DS: Phone Card |
| OTP entry | Completing the login flow | LOW | Yes — UI only | Accept any valid-format OTP, navigate to home |
| Navigation to Register | "Don't have an account?" link | LOW | Yes | navigate('/register') |
| "Forgot" / resend OTP | Users expect a retry path | LOW | Yes — UI only | Resend button; no real SMS; show a toast/feedback |

#### Differentiators

| Feature | Value Proposition | Complexity | Hardcoded Feasibility | Notes |
|---------|-------------------|------------|-----------------------|-------|
| Auto-advance on OTP complete | When all 6 digits entered, auto-submit without tapping "Verify" | LOW | Yes | Input logic; onComplete callback |

#### Anti-Features

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Biometric login (Face ID / fingerprint) | "Modern auth" | Requires native browser APIs with inconsistent mobile support; no session to protect in frontend-only | Defer to post-backend; handle at PWA / native layer |
| Remember me / persistent session | "Convenience" | No real session management in v1; fake persistence misleads testing | Navigate straight to home on any valid OTP input |

---

### Flow 6: Home

**Purpose:** Main dashboard. The DS shows 7+ screens: dashboard, transactions list, voice entry, and flow variants. Component groups: Header Cluster, Hero Budget Card, Spending and Alerts, Lists and Search, Notifications and Details, Actions/Voice/Nav, Place Rows, Add Flow Controls.

#### Table Stakes

| Feature | Why Expected | Complexity | Hardcoded Feasibility | Notes |
|---------|--------------|------------|-----------------------|-------|
| Monthly budget summary card (Hero Budget Card) | Users come to the home screen to see "how am I doing?" at a glance | LOW | Yes | Hardcoded: budget amount, spent amount, remaining in LKR |
| Spending progress / burn rate indicator | Visual showing % of budget used | LOW | Yes | Progress bar with hardcoded values |
| Recent transactions list | The most-checked item in any finance app | LOW | Yes | Hardcoded array of mock transactions with date, category, amount |
| Category spending breakdown (Spending and Alerts) | Quick view of where money went | MEDIUM | Yes | Hardcoded category totals |
| Budget alert / warning state | "You're near your limit" nudge | LOW | Yes | Conditional render based on hardcoded threshold |
| FAB / Add Expense button | Primary action; users need to log expenses from home | LOW | Yes | navigate('/track') or open modal |
| Bottom navigation bar | Standard mobile nav; all major apps have this | LOW | Yes | DS: Actions/Voice/Nav |
| Greeting with user name | Personalization; "Good morning, Kasun" | LOW | Yes | Hardcoded name from mock user |
| Date / period selector (current month) | Users need to know which period they're viewing | LOW | Yes | Hardcoded "April 2026" label |

#### Differentiators

| Feature | Value Proposition | Complexity | Hardcoded Feasibility | Notes |
|---------|-------------------|------------|-----------------------|-------|
| Voice entry shortcut (DS: Actions Voice and Nav) | Fastest way to log an expense — tap mic, say "200 rupees kottu" | MEDIUM | Yes — UI only | Voice input screen navigates to pre-filled Track form; no real speech-to-text needed for frontend-only |
| Place/merchant rows (DS: Place Rows) | Shows where you spent, not just how much — anchors expenses to real locations (Keells, Cargills, etc.) | MEDIUM | Yes | Hardcoded place names in mock data |
| Spending alert with actionable nudge | "You've spent 80% of food budget — see breakdown" with a link to Insights | LOW | Yes | Hardcoded alert + navigate('/insights') |
| Notification / detail panel (DS: Notifications and Details) | In-app notification surface for budget warnings without push | LOW | Yes | Hardcoded notification items |
| Search transactions (DS: Lists and Search) | Find a specific expense instantly | MEDIUM | Yes — client-side filter | Filter over hardcoded array by text match |

#### Anti-Features

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Widget-style customizable home | "Personalization" | High implementation cost; confusing for first-time users; no clear default state | Fixed, well-designed home layout; customization deferred to v2 |
| Live exchange rates / multi-currency home | "Power user" | LKR-only is the v1 constraint; adding FX creates display complexity without Sri Lankan use case | LKR only; multi-currency in v2 |
| News / market feed on home | "Contextual financial data" | Not a budgeting feature; distracts from core loop; loads slowly | Budget-only focus; no feed |

---

### Flow 7: Track

**Purpose:** Log expenses and income. DS shows 3 components: Expense Controls, Income Controls, Success States. 4 full screens in the screen flow.

#### Table Stakes

| Feature | Why Expected | Complexity | Hardcoded Feasibility | Notes |
|---------|--------------|------------|-----------------------|-------|
| Amount entry (numpad / keyboard) | Primary input; must be fast and thumb-friendly | LOW | Yes | LKR amount input; large digits |
| Category picker | Every expense needs a category; users expect a visual grid | LOW | Yes | Hardcoded categories with icons |
| Date picker (defaults to today) | Logging past expenses is common | LOW | Yes | Hardcoded "today"; UI picker optional |
| Note / description field | "Lunch with team" vs just "Food" | LOW | Yes | Optional text input |
| Income entry variant | Separate flow for logging income; symmetrical with expense | LOW | Yes | DS: Income Controls |
| Success / confirmation state | "Expense logged!" confirmation before returning home | LOW | Yes | DS: Success States |
| Category icons (visual) | Icon grid is the standard mobile finance pattern | LOW | Yes | DS: Iconography |
| Back / cancel action | Users change their mind mid-entry | LOW | Yes | navigate(-1) |

#### Differentiators

| Feature | Value Proposition | Complexity | Hardcoded Feasibility | Notes |
|---------|-------------------|------------|-----------------------|-------|
| Sri Lankan category taxonomy | Categories match real LKR spending: Transport (tuk-tuk, bus, Uber), Food (kottu, rice & curry, café), Utilities (CEB, LECO, SLT), Mobile (Dialog, Hutch top-up), etc. | LOW | Yes | Hardcoded category list with LK-relevant names |
| Voice-to-expense pre-fill (from Home voice shortcut) | Arriving from voice entry, amount + category pre-populated | MEDIUM | Yes — mock pre-fill | navigate to Track with state params; no real STT |
| Quick-add recent / frequent expenses | "You often spend Rs. 250 on bus" one-tap re-log | MEDIUM | Yes | Hardcoded recents array; one-tap fills form |
| Wallet assignment per expense | Which wallet / account did this come from? Links to Wallet flow | LOW | Yes | Dropdown with hardcoded wallet names |

#### Anti-Features

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Camera receipt OCR | "Auto-capture expenses" | Requires camera + ML API; zero backend in v1; complex edge cases | Manual entry only; receipt capture deferred to v2 with backend |
| Bank SMS auto-import | "Automatic tracking" | Requires SMS read permissions (Android only), bank API or SMS parsing; out of scope | Manual entry; import feature in roadmap for v2 |
| Split expenses / group tracking | "Splitwise-like" | Different product; adds participant model complexity | Single-user tracking only in v1 |

---

### Flow 8: Wallet

**Purpose:** View and manage wallets / accounts (cash, bank accounts, credit). DS: Wallet Overview Cluster, Income and Credit, Transactions and Actions, Balance Inputs. 3 full screens.

#### Table Stakes

| Feature | Why Expected | Complexity | Hardcoded Feasibility | Notes |
|---------|--------------|------------|-----------------------|-------|
| Wallet / account list with balances | Users need to see all their money sources | LOW | Yes | Hardcoded array: Cash, Commercial Bank, People's Bank, credit card |
| Total balance display (sum across wallets) | "How much do I have in total?" | LOW | Yes | Sum of hardcoded wallet balances in LKR |
| Per-wallet transaction history | Drill into a wallet to see its transactions | MEDIUM | Yes | Filtered view of hardcoded transaction array |
| Income tracking per wallet | Which wallet received income | LOW | Yes | DS: Income and Credit |
| Credit / loan entry | Sri Lankan users carry informal loans; credit card tracking | MEDIUM | Yes | DS: Income and Credit |
| Balance input / edit | Manually set or correct a wallet balance | LOW | Yes — form UI | DS: Balance Inputs; no real persistence needed |
| Transfer between wallets (UI) | "Moved Rs 5000 from bank to cash" | MEDIUM | Yes — UI only | Form with source + destination wallet selectors |

#### Differentiators

| Feature | Value Proposition | Complexity | Hardcoded Feasibility | Notes |
|---------|-------------------|------------|-----------------------|-------|
| Sri Lankan wallet taxonomy | Cash (most users are primarily cash-based), Sampath / HNB / Commercial / People's Bank, bKash-style mobile money, credit card | LOW | Yes | Hardcoded wallet types with relevant Sri Lankan bank names |
| Credit utilization indicator | Visual showing credit card used vs limit | LOW | Yes | Hardcoded limit + used amount |
| Wallet-level spending breakdown | Which wallet you spend most from | MEDIUM | Yes | Aggregated from hardcoded mock data |

#### Anti-Features

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Real bank account sync / Open Banking | "Automatic balance updates" | No Open Banking API exists for Sri Lanka in 2026; no backend in v1 | Manual balance entry; bank sync deferred to v2 with backend + bank partnerships |
| Investment account tracking (stocks, unit trusts) | "Wealth management" | Different product category; CSE / unit trust complexity; not cost-of-living | Scope to cash + bank + credit only in v1 |
| Crypto wallet support | "Web3 users want this" | Volatile, complex; not relevant to Sri Lankan cost-of-living tracking | Out of scope entirely |

---

### Flow 9: Insights

**Purpose:** Spending analytics. DS: Header and Summary, Category Breakdown, Supporting Cards. 2 full screens.

#### Table Stakes

| Feature | Why Expected | Complexity | Hardcoded Feasibility | Notes |
|---------|--------------|------------|-----------------------|-------|
| Monthly spending total | Top-level number: how much did I spend this month? | LOW | Yes | Hardcoded aggregate |
| Category breakdown chart (donut / bar) | Visual split of spending by category | MEDIUM | Yes | Recharts or Chart.js with hardcoded category totals |
| Top categories ranked | "Food 45%, Transport 20%, Utilities 15%" | LOW | Yes | Sorted hardcoded array |
| Period selector (month navigation) | Users want to compare past months | LOW | Yes — UI only | Hardcoded months with different mock values per period |
| vs previous period comparison | "You spent Rs 2,000 more than last month" | LOW | Yes | Two hardcoded period values; delta computed |
| Supporting insight cards | Bite-sized observations below the chart | LOW | Yes | DS: Supporting Cards; hardcoded insight strings |

#### Differentiators

| Feature | Value Proposition | Complexity | Hardcoded Feasibility | Notes |
|---------|-------------------|------------|-----------------------|-------|
| LKR inflation context annotation | "Food prices rose ~8% this month vs last year — your food spending adjusted for this" | HIGH value, HIGH complexity | Partial — show static annotation | Hardcoded annotation text; real calculation needs CPI data feed (v2) |
| Cost-of-living index framing | Frame spending relative to Sri Lankan averages ("You spent less than 60% of similar users on transport") | HIGH value | Yes — hardcoded benchmark | Hardcoded benchmark figures per category |
| Spending trend line (3-month view) | Shows trajectory, not just snapshot | MEDIUM | Yes | Hardcoded 3-month arrays for a line chart |
| Budget performance score | "Great month! You stayed within budget in 4/5 categories" | LOW | Yes | Computed from hardcoded budget vs actual |

#### Anti-Features

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| AI-powered spending predictions | "Smart insights" | Requires ML model, historical data volume, backend; meaningless with mock data | Hardcoded "insight card" with rule-based copy ("At this rate, you'll overspend food by Rs 3,000") |
| Export to PDF / CSV | "I want my data" | No real data to export; file generation adds complexity | Defer to v2 with real data |
| Net worth dashboard | "Full financial picture" | Different product scope; needs investment + liability tracking | Scope to spending/income only in v1 |

---

### Flow 10: Profile

**Purpose:** Account identity, preferences, automation, security. DS: Identity and Setup, Preferences and Automation, Security and Danger. 2 full screens.

#### Table Stakes

| Feature | Why Expected | Complexity | Hardcoded Feasibility | Notes |
|---------|--------------|------------|-----------------------|-------|
| User name and phone display | "Who is logged in?" — basic identity confirmation | LOW | Yes | Hardcoded mock user object |
| Avatar / profile photo placeholder | Standard profile visual; users expect it even if photo upload isn't v1 | LOW | Yes | Initials-based avatar (e.g., "KP" circle) |
| Monthly budget setting | The budget is the anchor of the whole app; must be editable | LOW | Yes — form UI | Input that updates hardcoded budget in mock data |
| Category customization (add / rename) | Power users want their own categories (e.g., "Tuition fees", "Poya day spending") | MEDIUM | Yes — list UI | Hardcoded list with edit UI; changes don't persist but UI must render |
| Currency display setting | Confirm LKR; format preference (Rs vs LKR prefix) | LOW | Yes | Static setting; LKR hardcoded |
| Notification preferences (UI only) | Toggle alerts for budget warnings | LOW | Yes — toggle UI | Preference toggles; no real push notifications |
| DS: Preferences and Automation | Recurring expense setup, automation rules (UI) | MEDIUM | Yes — form UI | Hardcoded recurrings list with add UI |
| DS: Security and Danger | App lock, logout, delete account (UI) | LOW | Yes — UI only | Logout navigates to Welcome; delete shows confirmation modal |

#### Differentiators

| Feature | Value Proposition | Complexity | Hardcoded Feasibility | Notes |
|---------|-------------------|------------|-----------------------|-------|
| Recurring expense setup | Pre-log predictable monthly bills (CEB, SLT, rent, school fees) — reduces manual logging burden | MEDIUM | Yes — form UI | Hardcoded recurrings rendered as a list; add UI renders without persisting |
| Budget by category (envelope budgeting) | Set individual budgets per category, not just a total | MEDIUM | Yes | Per-category budget inputs; hardcoded defaults per Sri Lankan spending norms |
| App lock / PIN screen | Sensitive financial data; users in shared-device households (common in LK) expect this | MEDIUM | Yes — UI only | PIN entry screen renders; no real lock mechanism needed for frontend-only |

#### Anti-Features

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Multiple user profiles / family plan | "Share with spouse" | Requires backend multi-user model; session management complexity | Single user in v1; family/shared mode in v2 |
| Data backup / sync across devices | "Don't lose my data" | Requires backend + auth + storage; out of scope | Clearly message this is in-device for v1; backend sync in v2 |
| In-app subscription / premium upsell UI | "Monetization" | No payment backend; creates trust issues if CTAs lead nowhere | Defer all monetization UI to v2 |

---

## Feature Dependencies

```
[Register Flow]
    └──requires──> [Onboarding Flow] (new users see onboarding before register)
    └──requires──> [Welcome Flow] (entry point for new users)

[Home Flow]
    └──requires──> [Login OR Register] (must have a user context to personalize)
    └──enhances──> [Track Flow] (FAB on home navigates to Track)
    └──enhances──> [Wallet Flow] (wallet summary on home links to Wallet)
    └──enhances──> [Insights Flow] (spending alert on home links to Insights)

[Track Flow]
    └──requires──> [Wallet Flow context] (wallet assignment per expense requires wallet list)
    └──enhances──> [Home Flow] (newly tracked expense appears in recent transactions)
    └──enhances──> [Insights Flow] (tracked expense contributes to category totals)

[Insights Flow]
    └──requires──> [Track Flow data] (insights are meaningless without transactions)
    └──enhances──> [Home Flow] (insight cards can surface on home screen alerts)

[Wallet Flow]
    └──enhances──> [Track Flow] (wallet selector in expense form)
    └──enhances──> [Insights Flow] (per-wallet breakdown)

[Profile Flow]
    └──enhances──> [Home Flow] (budget set in Profile drives Hero Budget Card)
    └──enhances──> [Insights Flow] (budget targets set here appear in category breakdown)

[Voice Entry shortcut — Home]
    └──requires──> [Track Flow] (voice pre-fills Track form fields)

[Splash]
    └──requires──> [Welcome OR Home] (must navigate to one on completion)
```

### Dependency Notes

- **Track requires Wallet context:** The wallet assignment dropdown in Track needs the wallet list from the Wallet mock data. Both must use the same hardcoded data source.
- **Insights requires Track data:** The category breakdown chart sums transaction amounts by category. Mock data must include a minimum of 10–15 realistic transactions across 5+ categories to make Insights feel meaningful.
- **Profile budget drives Home:** The Hero Budget Card on Home shows the budget set in Profile. Both screens must read from the same mock `user.monthlyBudget` value.
- **Voice Entry enhances Track:** Home has a voice shortcut (DS: Actions Voice and Nav). This navigates to Track with pre-filled state. The Track form must accept navigation state params to support this flow.
- **Splash navigates to Welcome (new user) or Home (returning user):** For hardcoded frontend, a simple flag in mock state controls which path Splash exits to.

---

## MVP Definition

### Launch With (v1 — this milestone)

All features marked "Table Stakes" across all 9 flows, plus the following high-value, low-cost differentiators:

- [ ] All Splash features — establishes brand identity on first impression
- [ ] Welcome screen with product framing in Sri Lankan context
- [ ] 4-slide Onboarding with LKR-specific copy and illustrations
- [ ] Register: phone entry, OTP UI, choice groups for profile, ready card
- [ ] Login: phone entry, OTP UI, auto-advance on complete digits
- [ ] Home: Hero Budget Card, recent transactions, spending alerts, bottom nav, FAB, greeting
- [ ] Home search (client-side filter over hardcoded array)
- [ ] Track: amount numpad, Sri Lankan category grid, income variant, success state
- [ ] Wallet: multi-wallet list, total balance, per-wallet transactions, balance input
- [ ] Insights: spending total, category donut chart, period selector, vs-previous comparison
- [ ] Insights: cost-of-living benchmark cards (hardcoded)
- [ ] Profile: budget setting form, category list, recurring expenses list, app lock UI, logout
- [ ] Bottom navigation wired between Home, Track, Wallet, Insights, Profile

### Add After Validation (v1.x — post-design confirmation)

- [ ] Voice entry screen (navigate from home mic shortcut; pre-fills Track) — adds delight but depends on design assets
- [ ] Place/merchant rows on home — depends on whether hi-fi designs include location labels
- [ ] Spending trend line (3-month chart) in Insights — adds analytical depth; needs more mock data
- [ ] Quick-add recent expenses in Track — reduces friction for power users
- [ ] Budget by category (envelope model) in Profile — high value but higher implementation cost

### Future Consideration (v2+ — requires backend)

- [ ] Real phone/OTP authentication — backend required
- [ ] Data persistence across sessions — backend required
- [ ] Bank SMS import / Open Banking — no LK banking API exists today
- [ ] Receipt OCR — ML backend required
- [ ] AI spending predictions — ML + historical data required
- [ ] Multi-currency / FX tracking — out of scope for LKR-only v1
- [ ] Family / shared accounts — requires multi-user model
- [ ] PDF / CSV export — real data required
- [ ] Push notifications — backend + device registration required

---

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Hero Budget Card (Home) | HIGH | LOW | P1 |
| Recent transactions list (Home) | HIGH | LOW | P1 |
| Expense entry with categories (Track) | HIGH | LOW | P1 |
| Category breakdown chart (Insights) | HIGH | MEDIUM | P1 |
| Multi-wallet list + totals (Wallet) | HIGH | LOW | P1 |
| Bottom navigation (all flows) | HIGH | LOW | P1 |
| Onboarding 4-slide flow | HIGH | LOW | P1 |
| Register OTP flow (UI only) | HIGH | LOW | P1 |
| Sri Lankan category taxonomy (Track) | HIGH | LOW | P1 |
| Monthly budget setting (Profile) | HIGH | LOW | P1 |
| Spending alerts / budget warnings (Home) | HIGH | LOW | P1 |
| Period selector in Insights | MEDIUM | LOW | P1 |
| vs-previous-period comparison (Insights) | MEDIUM | LOW | P2 |
| Voice entry shortcut (Home → Track) | MEDIUM | MEDIUM | P2 |
| Search transactions (Home) | MEDIUM | LOW | P2 |
| Place/merchant rows (Home) | MEDIUM | MEDIUM | P2 |
| Recurring expense setup (Profile) | MEDIUM | MEDIUM | P2 |
| Cost-of-living benchmark cards (Insights) | HIGH | LOW | P2 |
| Credit utilization indicator (Wallet) | MEDIUM | LOW | P2 |
| Budget by category / envelope (Profile) | HIGH | MEDIUM | P2 |
| App lock PIN screen (Profile) | MEDIUM | MEDIUM | P2 |
| Spending trend line 3-month (Insights) | MEDIUM | MEDIUM | P3 |
| Quick-add recents (Track) | MEDIUM | MEDIUM | P3 |
| Wallet transfer UI | LOW | MEDIUM | P3 |

---

## Sri Lanka / LKR Context Notes

These inform hardcoded mock data construction and copy choices:

**Category taxonomy relevant to Sri Lankan daily spending:**
- Food & Dining: Rice & curry, kottu, short eats, café, supermarket (Keells, Cargills, Arpico), street food
- Transport: CTB bus, private bus, tuk-tuk (PickMe, Uber), train, fuel (petrol stations)
- Utilities: CEB electricity, LECO, SLT broadband, water bill
- Mobile: Dialog top-up, Hutch, Mobitel, Airtel prepaid recharge
- Groceries: Weekly market, supermarket
- Health: Private consultation, National Hospital, pharmacy (Osusala)
- Education: School fees, tuition classes, stationery
- Entertainment: Cinema (Liberty, Majestic), streaming, eating out
- Rent & Housing: Monthly rent, maintenance
- Savings: Fixed deposit, seettu (informal savings group)

**Realistic LKR amounts for mock data (2026 price levels):**
- CTB bus: Rs 30–100 per trip
- Tuk-tuk short trip: Rs 150–350
- Kottu: Rs 350–700
- Rice & curry plate: Rs 150–400
- Keells weekly groceries: Rs 3,000–8,000
- CEB electricity monthly: Rs 2,000–8,000
- Dialog prepaid top-up: Rs 100–500
- Café coffee: Rs 350–700
- Monthly rent (Colombo): Rs 25,000–80,000

**Wallet taxonomy relevant to Sri Lankan users:**
- Cash (most transactions are still cash-based outside Colombo)
- Commercial Bank / HNB / People's Bank / Sampath Bank / BOC
- Credit card (Visa/MC on local bank)
- Mobile wallet (not yet dominant, but growing — frAppe, etc.)

---

## Competitor Feature Analysis

| Feature | Spendee | Money Manager | Costra Approach |
|---------|---------|---------------|-----------------|
| Expense categories | Generic global categories | Generic; some localization | Sri Lankan taxonomy hardcoded from v1 |
| Currency | Multi-currency | Multi-currency | LKR-only, single currency, clean display |
| Onboarding | 3–5 slides, generic | Minimal | 4 slides with LK-specific copy and illustrations |
| Voice entry | Some apps have it | Absent | DS-designed voice shortcut; UI-only in v1 |
| Home dashboard | Budget + recent txns | Ledger list | Hero budget card + spending alerts + places |
| Insights | Category pie + time series | Basic bar chart | Donut + LK cost-of-living benchmarks |
| Wallet support | Multiple accounts | Multiple accounts | Multi-wallet with Sri Lankan bank names |
| Design quality | Medium | Low | High — pixel-faithful to Costra design system |

---

## Sources

- Costra Design System Storybook index (`costra-design-system.vercel.app/index.json`) — HIGH confidence; authoritative component inventory
- Costra PROJECT.md — HIGH confidence; confirmed scope, constraints, and out-of-scope items
- Personal finance app domain knowledge (Spendee, Wallet by BudgetBakers, Money Manager, YNAB patterns) — MEDIUM confidence; based on established app conventions
- Sri Lankan market context (currency, bank names, spending categories, price levels) — MEDIUM confidence; knowledge cutoff August 2025; verify 2026 price levels against current data when real mock data is constructed

---

*Feature research for: Costra — Sri Lankan cost-of-living tracker (mobile-web, frontend-only)*
*Researched: 2026-04-05*
