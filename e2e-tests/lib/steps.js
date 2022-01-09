const { Given, When, Then, After } = require("@cucumber/cucumber");
const assert = require("assert/strict");
const { By, until } = require("selenium-webdriver");

Given("I load the TodoApp", async function () {
  await this.load();
  await this.driver.get(this.appUrl);
  await this.driver.wait(until.elementLocated(By.id("header")));
});

When("I add new todo called {string}", async function (todoText) {
  const input = await this.getAddTodoInput();
  await input.sendKeys(todoText);
  const btn = await this.getAddTodoButton();
  await btn.click();
});

When("I mark {string} as {string}", async function (todoText, status) {
  let elementData = await this.getTodoElementByText(todoText);
  if (!elementData) throw new Error(`Could not find a Todo called ${todoText}`);
  if (elementData.status === status)
    throw new Error(`${todoText} is already in ${status} state`);
  await elementData.buttonElement.click();
});

Then(
  "I should see a {string} todo called {string}",
  async function (status, todoText) {
    let elementData = await this.getTodoElementByText(todoText);
    if (!elementData)
      throw new Error(`Could not find a Todo called ${todoText}`);
    assert.equal(elementData.status, status);
  }
);

Then(
  "I should not see a {string} todo called {string}",
  async function (status, todoText) {
    let elementData = await this.getTodoElementByText(todoText);
    if (!elementData)
      throw new Error(`Could not find a Todo called ${todoText}`);
    assert.notEqual(elementData.status, status);
  }
);

Then("I should see {int} todos", async function (count) {
  const textEle = await this.getTodoCountText();
  const text = await textEle.getText();
  assert.equal(text, `You have ${count} items`);
});

After(async function () {
  await this.driver.quit();
});
