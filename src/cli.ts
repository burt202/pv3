import * as fs from "fs"
import * as path from "path"

import * as Cucumber from "cucumber"
import * as commandLineArgs from "command-line-args"
import {CommandLineOptions} from "command-line-args"

import {Config} from "./types"
import constructCucumberArgs from "./construct-cucumber-args"
import {projectName} from "./constants"

function getConfigPath(args: CommandLineOptions): string | null {
  if (args.configPath && fs.existsSync(args.configPath)) return args.configPath

  const defaultPath = path.join(process.cwd(), `/${projectName}.json`)
  if (fs.existsSync(defaultPath)) return defaultPath

  return null
}

function isVerbose(args: CommandLineOptions, config?: Config): boolean {
  if (args.verbose) return args.verbose && args.verbose !== "false"
  if (!config) return false
  return !!config.verbose
}

function getConfig(args: CommandLineOptions): Config | null {
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

// @ts-ignore
new Cucumber.Cli({
  argv: cucumberArgs,
  cwd: process.cwd(),
  stdout: process.stdout,
})
  .run()
  .then((success: any) => {
    console.log("success", success)
    process.exit(success ? 0 : 1)
  })
