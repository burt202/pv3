const fs = require("fs")
const path = require("path")

const Cucumber = require("cucumber")
const commandLineArgs = require("command-line-args")

const constructCucumberArgs = require("./construct-cucumber-args")
const {projectName} = require("./constants")

const optionDefinitions = [
  {name: "tags", type: String},
  {name: "feature", type: String},
  {name: "configPath", type: String},
]

const parsedArgs = commandLineArgs(optionDefinitions, {partial: true})

function getConfigPath(args) {
  if (args.configPath && fs.existsSync(args.configPath)) return args.configPath

  const defaultPath = path.join(process.cwd(), `/${projectName}.json`)
  if (fs.existsSync(defaultPath)) return defaultPath

  return null
}

function getConfig(path) {
  const contents = fs.readFileSync(path, "utf8")
  return parseAndValidateJSON(contents, path)
}

function parseAndValidateJSON(config, path) {
  try {
    return JSON.parse(config)
  } catch (err) {
    throw new Error(path + " does not include a valid JSON object.\n")
  }
}

const configPath = getConfigPath(parsedArgs)
const config = configPath ? getConfig(parsedArgs) : null

const cucumberArgs = process.argv
  .slice(0, 2)
  .concat(constructCucumberArgs(parsedArgs, config))

console.log("process.argv", process.argv)
console.log("parsedArgs", parsedArgs)
console.log("configPath", configPath)
console.log("config", config)
console.log("cucumberArgs", cucumberArgs)

const result = new Cucumber.Cli({
  argv: cucumberArgs,
  cwd: process.cwd(),
  stdout: process.stdout,
}).run()

console.log("result", result)
