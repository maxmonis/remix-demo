import { safeRedirect } from "../routers"

describe("safeRedirect", () => {
  test("returns route if route is valid", () => {
    expect(safeRedirect("/")).toBe("/")
    expect(safeRedirect("/route")).toBe("/route")
  })

  test("returns default backup if route is invalid", () => {
    expect(safeRedirect(null)).toBe("/")
  })

  test("returns backup if route is invalid and backup is valid", () => {
    expect(safeRedirect(null, "/backup")).toBe("/backup")
  })

  test("returns default backup if route and backup are invalid", () => {
    expect(safeRedirect(null, "//backup")).toBe("/")
  })
})
