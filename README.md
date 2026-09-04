# create-polteq-bdd-ts

Scaffolds a Polteq BDD TypeScript test project: [Playwright](https://playwright.dev) + [playwright-bdd](https://github.com/vitalets/playwright-bdd) (Cucumber-style Gherkin) with a page-object structure, preconfigured and ready to run.

## Installation

No install step is needed — `npm init` fetches and runs the latest published version ([`create-polteq-bdd-ts`](https://www.npmjs.com/package/create-polteq-bdd-ts)) on demand:

```bash
npm init polteq-bdd-ts@latest my-project
```

If you'd rather install the CLI explicitly first, `npx` works the same way:

```bash
npx create-polteq-bdd-ts@latest my-project
```

## Usage

```bash
npm init polteq-bdd-ts@latest my-project
cd my-project
npm install
npx playwright install
npm test
```

Or scaffold into the current directory:

```bash
mkdir my-project && cd my-project
npm init polteq-bdd-ts@latest .
```

The target directory must be empty (or not yet exist). You'll be prompted for a project name, used as the `name` field in the generated `package.json`.

## What gets created

```
my-project/
├── .gitignore
├── .vscode/
│   ├── extensions.json      # recommended Cucumber + Playwright extensions
│   └── settings.json        # cucumber.features / cucumber.glue paths
├── features/                # your .feature files go here (empty on init)
├── providedtestcode/
│   └── AddProductToCartConfirmationTest.spec.ts   # example linear Playwright test
├── src/
│   ├── fixtures/
│   │   └── fixtures.ts      # playwright-bdd test/fixture wiring (Given/When/Then/Before/After)
│   ├── pages/
│   │   ├── base.page.ts
│   │   ├── home.page.ts
│   │   ├── my-account.page.ts
│   │   └── contact.page.ts
│   └── steps/
│       ├── hooks.ts         # Before/After hooks (viewport, failure screenshots)
│       └── step-definitions.ts
├── package.json
├── playwright.config.ts
└── tsconfig.json
```

## Scripts in the generated project

| Script | Description |
|---|---|
| `npm test` | Generate BDD tests from `.feature` files, then run Playwright |
| `npm run test:smoke` | Same, filtered to `@smoke` tagged scenarios |
| `npm run test:mail` | Same, filtered to `@mail` tagged scenarios |
| `npm run bddgen` | Regenerate Playwright specs from `.feature` files only |
| `npm run report` | Open the last HTML Playwright report |
| `npm run install:browsers` | Install Playwright browser binaries |
| `npm run watch` | Watch `.feature`/`.ts` changes and re-run bddgen + Playwright UI in parallel |

## Writing scenarios

Add `.feature` files under `features/`, add matching step definitions under `src/steps/`, and add page objects under `src/pages/` (extend `BasePage`). Wire new page objects into `src/fixtures/fixtures.ts` so they're injectable into steps.

## Publishing changes to this scaffolder

```bash
npm version patch   # or minor/major
npm publish --access public
```

Template files live in `templates/default/`. Two files get special handling at scaffold time:

- `_gitignore` → renamed to `.gitignore` (npm strips real `.gitignore` files from published tarballs)
- `package.json.template` → renamed to `package.json`, with `__PROJECT_NAME__` replaced by the prompted project name
