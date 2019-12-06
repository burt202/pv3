import * as R from "ramda"
import {projectName, stepFileExtension} from "./constants"
import {Config} from "./types"
import {CommandLineOptions} from "command-line-args"

const DEFAULT_PATH = `test/${projectName}`

export default (
  args?: CommandLineOptions,
  config?: Config | null,
): Array<string> => {
  const basePath = R.pathOr(DEFAULT_PATH, ["basePath"], config)

  const defaultArgs = {
    require: [
      `${basePath}/steps/**/*.${stepFileExtension}`,
      `${basePath}/features/**/*.feature`,
    ],
  }

  const toMerge = {} as any
  if (args && args.tags) toMerge.tags = args.tags
  if (config && config.tags) toMerge.tags = config.tags

  const fullArgs = Object.assign(defaultArgs, toMerge)

  if (args && args.feature)
    fullArgs.require = [defaultArgs.require[0]].concat(args.feature)

  return R.flatten(
    Object.keys(fullArgs).map(k => {
      return [`--${k}`].concat(fullArgs[k])
    }),
  )
}
