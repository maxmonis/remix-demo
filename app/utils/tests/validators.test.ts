import { isEmail, isUser, isString, isRoute } from "../validators"

describe("isEmail", () => {
  test("returns true for emails", () => {
    expect(isEmail("a@b.c")).toBe(true)
  })

  test("returns false for non-emails", () => {
    for (const nonEmail of [
      null,
      undefined,
      "",
      "a@b.",
      "@b.c",
      "a@.c",
      "email: a@b.c",
    ]) {
      expect(isEmail(nonEmail)).toBe(false)
    }
  })
})

describe("isUser", () => {
  test("returns true for users", () => {
    expect(isUser({ email: "a@b.c" })).toBe(true)
  })

  test("returns false for non-users", () => {
    for (const nonUser of [null, undefined, { email: "not an email" }]) {
      expect(isUser(nonUser)).toBe(false)
    }
  })
})

describe("isString", () => {
  test("returns true for non-empty strings", () => {
    expect(isString("string")).toBe(true)
  })

  test("returns false for empty strings", () => {
    expect(isString("")).toBe(false)
  })

  test("returns false for strings with only spaces", () => {
    expect(isString("    ")).toBe(false)
  })

  test("returns false for non-strings", () => {
    for (const nonString of [
      null,
      undefined,
      1,
      true,
      { string: "string" },
      ["string"],
      () => "string",
    ]) {
      expect(isString(nonString)).toBe(false)
    }
  })

  test("returns true if length reaches or exceeds minimum", () => {
    expect(isString("abcd", 4)).toBe(true)
    expect(isString("abcde", 4)).toBe(true)
    expect(isString("a b c", 4)).toBe(true)
  })

  test("returns false if length is below minimum", () => {
    expect(isString("abc", 4)).toBe(false)
    expect(isString(" abc ", 4)).toBe(false)
  })
})

describe("isRoute", () => {
  test("returns true for route", () => {
    expect(isRoute("/")).toBe(true)
    expect(isRoute("/route")).toBe(true)
  })

  test("returns false for non-route", () => {
    for (const invalidRoute of [null, undefined, "", "route", "//route"]) {
      expect(isRoute(invalidRoute)).toBe(false)
    }
  })
})
