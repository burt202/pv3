const R = require("ramda")
const {projectName, stepFileExtension} = require("./constants")

const DEFAULT_PATH = `test/${projectName}`

module.exports = function(args = {}, config) {
  const basePath = R.pathOr(DEFAULT_PATH, ["basePath"], config)

  const defaultArgs = {
    require: [
      `${basePath}/steps/**/*.${stepFileExtension}`,
      `${basePath}/features/**/*.feature`,
    ],
  }

  const toMerge = {}
  if (args.tags) toMerge.tags = args.tags
  if (config && config.tags) toMerge.tags = config.tags

  const fullArgs = Object.assign(defaultArgs, toMerge)

  if (args.feature)
    fullArgs.require = [defaultArgs.require[0]].concat(args.feature)

  return R.flatten(
    Object.keys(fullArgs).map(k => {
      return [`--${k}`].concat(fullArgs[k])
    }),
  )
}
