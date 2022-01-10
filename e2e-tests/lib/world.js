const {
  setWorldConstructor,
  World,
  setDefaultTimeout,
} = require("@cucumber/cucumber");
const { Builder, By } = require("selenium-webdriver");
const chromedriver = require("chromedriver");
const chrome = require("selenium-webdriver/chrome");

class TodoAppWorld extends World {
  constructor(options) {
    super(options);
  }

  async load() {
    setDefaultTimeout(10 * 1000);
    this.appUrl = this.parameters.appUrl;
    const service = new chrome.ServiceBuilder(chromedriver.path);
    let chromeOptions = new chrome.Options();
    if (this.parameters.headless) {
      chromeOptions = chromeOptions.headless();
    }
    this.driver = await new Builder()
      .forBrowser("chrome")
      .setChromeService(service)
      .setChromeOptions(chromeOptions)
      .build();
  }

  async wait() {
    await this.driver.wait(() => {}, 5000);
  }

  async getAddTodoInput() {
    return this.driver.findElement(By.name("addTodoInput"));
  }

  async getAddTodoButton() {
    return this.driver.findElement(By.id("addTodoBtn"));
  }

  async getTodoCountText() {
    return this.driver.findElement(By.id("todoCountText"));
  }

  async getTodoElementByText(text) {
    const todoElement = await this.driver.findElement(By.id("todoList"));
    const todoItemsElements = await todoElement.findElements(By.css("li"));
    for (let todoItem of todoItemsElements) {
      const textEle = await todoItem.findElement(By.id("text"));
      const eleText = await textEle.getText();
      if (eleText === text) {
        const actionBtn = await todoItem.findElement(By.id("actionBtn"));
        const id = await todoItem.getAttribute("id");
        return {
          textElement: todoItem,
          buttonElement: actionBtn,
          status: id === "pendingTodo" ? "pending" : "completed",
        };
      }
    }
  }
}

setWorldConstructor(TodoAppWorld);
