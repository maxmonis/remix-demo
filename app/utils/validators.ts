import type { User } from "~/models/user.server"

export function isUser(user: unknown): user is User {
  return isEmail((user as User)?.email)
}

export function isEmail(
  email: unknown,
): email is `${string}@${string}.${string}` {
  return typeof email === "string" && /^\S+@\S+\.\S+$/.test(email)
}

/**
 * Checks if a value is a string which includes characters other than spaces,
 * optionally with a minimum length for the trimmed value
 */
export function isString(string: unknown, minLength = 1): string is string {
  return typeof string === "string" && string.trim().length >= minLength
}

export function isRoute(route: unknown): route is `/${string}` {
  return (
    typeof route === "string" &&
    route.startsWith("/") &&
    !route.startsWith("//")
  )
}
