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
node src/cli.js --configPath "test/pv3/pv3.json"
node src/cli.js --configPath "test/pv3/pv3.json" --verbose
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
