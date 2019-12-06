const {Given, When, Then} = require("../../../src")

// test 1

Given("I am a user with transactions in different categories", function() {
  console.log("111")
})

When("I go to the transactions overview page", function() {
  console.log("222")
})

Then("I should see {string} as the heading in the nav bar", function(string) {
  console.log("333", string)
})

Then("I should see transactions in the list", function() {
  console.log("444")
})

// test 2

Given("I am a user with {string} current accounts", function(string) {
  console.log("111", string)
})

When("I go to the details of the first current account", function() {
  console.log("222")
})

Then("I should see the balance displayed", function() {
  console.log("333")
})

When("I click edit", function() {
  console.log("444")
})

Then("I should see the edit account form", function() {
  console.log("555")
})

// test 3

Given("I am a new user", function() {
  console.log("111")
})

Given("I navigate to the Add asset page", function() {
  console.log("222")
})

Given("I save the {string} form with", function(string, dataTable) {
  console.log("333", string, dataTable)
})

Then("I should see the asset listed in the accounts list", function() {
  console.log("444")
})
