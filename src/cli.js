const fs = require("fs")
const path = require("path")

const Cucumber = require("cucumber")
const commandLineArgs = require("command-line-args")

const constructCucumberArgs = require("./construct-cucumber-args")
const {projectName} = require("./constants")

function getConfigPath(args) {
  if (args.configPath && fs.existsSync(args.configPath)) return args.configPath

  const defaultPath = path.join(process.cwd(), `/${projectName}.json`)
  if (fs.existsSync(defaultPath)) return defaultPath

  return null
}

function getConfig(args) {
  const path = getConfigPath(args)

  if (!path) {
    if (isVerbose(args)) {
      console.log("No configuration path specified")
    }
    return null
  }

  const contents = fs.readFileSync(path, "utf8")

  try {
    const parsed = JSON.parse(contents)

    if (isVerbose(args, parsed)) {
      console.log(`Configuration loaded from ${path}`)
    }

    return parsed
  } catch (err) {
    throw new Error(`${path} does not include a valid JSON object`)
  }
}

function isVerbose(args, config = {}) {
  if (args.verbose) return args.verbose && args.verbose !== "false"
  return !!config.verbose
}

const optionDefinitions = [
  {name: "tags", type: String},
  {name: "feature", type: String},
  {name: "configPath", type: String},
  {name: "verbose", type: Boolean},
]

const parsedArgs = commandLineArgs(optionDefinitions, {partial: true})

const cucumberArgs = process.argv
  .slice(0, 2)
  .concat(constructCucumberArgs(parsedArgs, getConfig(parsedArgs)))

new Cucumber.Cli({
  argv: cucumberArgs,
  cwd: process.cwd(),
  stdout: process.stdout,
})
  .run()
  .then(success => {
    console.log("success", success)
    process.exit(success ? 0 : 1)
  })
