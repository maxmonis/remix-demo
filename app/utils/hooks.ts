import { useMatches } from "@remix-run/react"
import { useMemo } from "react"

import { isUser } from "./validators"

/**
 * This base hook is used in other hooks to quickly search for specific
 * data across all loader data using useMatches.
 * @param id The route id
 * @return The router data or undefined if not found
 */
function useMatchesData(id: string) {
  const matchingRoutes = useMatches()
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id],
  )
  return route?.data
}

export function useOptionalUser() {
  const data = useMatchesData("root")
  if (data && isUser(data.user)) {
    return data.user
  }
}

export function useUser() {
  const user = useOptionalUser()
  if (!user) {
    throw new Error(
      `No user found in root loader, but user is required by useUser.
        If user is optional, try useOptionalUser instead.`,
    )
  }
  return user
}
