import { isRoute } from "./validators"

/**
 * This should be used any time the redirect path is user-provided
 * (like the query string on our login/signup pages). This avoids
 * open-redirect vulnerabilities.
 * @param to The redirect destination
 * @param backup The redirect to use if the to is unsafe
 * @return The route we will navigate to
 */
export function safeRedirect(to: unknown, backup?: `/${string}`) {
  if (isRoute(to)) {
    return to
  }
  return isRoute(backup) ? backup : "/"
}
