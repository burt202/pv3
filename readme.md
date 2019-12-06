# PV3

## Usage

### CLI

```
node src/cli.js --feature test/pv3/features/test1.feature
node src/cli.js --tags @1
node src/cli.js --tags "not @1"
node src/cli.js --tags "@1 or @2"
node src/cli.js --tags "@2 and @3"
node src/cli.js --tags "@1 and not @2"
node src/cli.js --tags "(@1 or @2) and @3"
node src/cli.js --configPath "test/pv3.json"
```

### Config File

```
{
  "basePath": "test/ui",
  "tags": "@2 and @3"
}
```

## Todo

verbose mode
typescript
output formatting
