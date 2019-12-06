# PV3

## Usage

### CLI

```
npm run build; node dist/cli.js
npm run build; node dist/cli.js --feature test/pv3/features/test1.feature
npm run build; node dist/cli.js --tags @1
npm run build; node dist/cli.js --tags "not @1"
npm run build; node dist/cli.js --tags "@1 or @2"
npm run build; node dist/cli.js --tags "@2 and @3"
npm run build; node dist/cli.js --tags "@1 and not @2"
npm run build; node dist/cli.js --tags "(@1 or @2) and @3"
npm run build; node dist/cli.js --configPath "test/pv3/pv3.json"
npm run build; node dist/cli.js --configPath "test/pv3/pv3.json" --verbose
```

### Config File

```
{
  "basePath": "test/ui",
  "tags": "@2 and @3",
  "verbose": true
}
```

## Todo

typescript
output formatting
