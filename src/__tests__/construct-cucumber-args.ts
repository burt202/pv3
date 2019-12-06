/* eslint-disable max-nested-callbacks */

import {expect} from "chai"
import constructCucumberArgs from "../construct-cucumber-args"

describe("constructCucumberArgs", () => {
  context("when no config file is present", () => {
    context("when no arguments are passed", () => {
      it("should return correct response", () => {
        const config = constructCucumberArgs()

        expect(config).to.eql([
          "--require",
          "test/pv3/steps/**/*.js",
          "test/pv3/features/**/*.feature",
        ])
      })
    })

    context("when --tags is passed", () => {
      it("should return correct response", () => {
        const config = constructCucumberArgs({tags: "@wip"})

        expect(config).to.eql([
          "--require",
          "test/pv3/steps/**/*.js",
          "test/pv3/features/**/*.feature",
          "--tags",
          "@wip",
        ])
      })
    })

    context("when --feature is passed", () => {
      it("should return correct response", () => {
        const config = constructCucumberArgs({
          feature: "test/pv3/features/test1.feature",
        })

        expect(config).to.eql([
          "--require",
          "test/pv3/steps/**/*.js",
          "test/pv3/features/test1.feature",
        ])
      })
    })
  })

  context("when a config file is present", () => {
    context("when basePath is set", () => {
      it("should return correct response", () => {
        const config = constructCucumberArgs({}, {basePath: "test/ui"})

        expect(config).to.eql([
          "--require",
          "test/ui/steps/**/*.js",
          "test/ui/features/**/*.feature",
        ])
      })
    })

    context("when tags is set with single value", () => {
      it("should return correct response", () => {
        const config = constructCucumberArgs({}, {tags: "@wip"})

        expect(config).to.eql([
          "--require",
          "test/pv3/steps/**/*.js",
          "test/pv3/features/**/*.feature",
          "--tags",
          "@wip",
        ])
      })
    })
  })
})
