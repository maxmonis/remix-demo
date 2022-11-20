import { faker } from "@faker-js/faker"

describe("smoke tests", () => {
  afterEach(() => {
    cy.cleanupUser()
  })

  it("should allow you to register and login", () => {
    const loginForm = {
      email: `${faker.internet.userName()}@example.com`,
      password: faker.internet.password(),
    }

    cy.then(() => ({ email: loginForm.email })).as("user")

    cy.visitAndCheck("/")

    cy.findByRole("link", { name: /sign up/i }).click()

    cy.findByRole("textbox", { name: /email/i }).type(loginForm.email)
    cy.findByLabelText(/password/i).type(loginForm.password)
    cy.findByRole("button", { name: /create account/i }).click()

    cy.findByRole("link", { name: /workouts/i }).click()
    cy.findByRole("button", { name: /logout/i }).click()
    cy.findByRole("link", { name: /log in/i })
  })

  it("should allow you to make a workout", () => {
    const testWorkout = {
      title: faker.lorem.words(1),
      body: faker.lorem.sentences(1),
    }
    cy.login()

    cy.visitAndCheck("/")

    cy.findByRole("link", { name: /workouts/i }).click()
    cy.findByText("No workouts yet")

    cy.findByRole("link", { name: /new one/i }).click()

    cy.findByRole("textbox", { name: /title/i }).type(testWorkout.title)
    cy.findByRole("textbox", { name: /body/i }).type(testWorkout.body)
    cy.findByRole("button", { name: /save/i }).click()

    cy.findByRole("button", { name: /delete/i }).click()

    cy.findByText("No workouts yet")
  })
})
