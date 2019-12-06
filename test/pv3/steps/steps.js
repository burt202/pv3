import {Given, When, Then} from "../../../dist"

// test 1

Given("I am a user with transactions in different categories", () => {
  console.log("111")
})

When("I go to the transactions overview page", () => {
  console.log("222")
})

Then("I should see {string} as the heading in the nav bar", function(string) {
  console.log("333", string)
})

Then("I should see transactions in the list", () => {
  console.log("444")
})

// test 2

Given("I am a user with {string} current accounts", function(string) {
  console.log("111", string)
})

When("I go to the details of the first current account", () => {
  console.log("222")
})

Then("I should see the balance displayed", () => {
  console.log("333")
})

When("I click edit", () => {
  console.log("444")
})

Then("I should see the edit account form", () => {
  console.log("555")
})

// test 3

Given("I am a new user", () => {
  console.log("111")
})

Given("I navigate to the Add asset page", () => {
  console.log("222")
})

Given("I save the {string} form with", function(string, dataTable) {
  console.log("333", string, dataTable)
})

Then("I should see the asset listed in the accounts list", () => {
  console.log("444")
})
