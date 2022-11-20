import { Link } from "@remix-run/react"

import { useOptionalUser } from "~/utils/hooks"

export default function Index() {
  const user = useOptionalUser()
  return (
    <main className="relative flex h-full w-full">
      <div className="h-full w-full">
        <div className="absolute h-full w-full">
          <img
            className="h-full w-full object-cover"
            src={
              "https://user-images.githubusercontent.com/" +
              "51540371/202918612-e2daf207-d8fc-45db-827e-8b44aff1b07b.jpg"
            }
            alt={`Barbell on the Floor by Leon Ardho from Pexels:
            https://www.pexels.com/photo/barbell-on-the-floor-1552252/`}
          />
          <div className="absolute inset-0 mix-blend-multiply" />
        </div>

        <div className="relative flex h-full w-full flex-col justify-evenly px-4 align-middle">
          <h1 className="text-center text-[12vmin] font-extrabold tracking-tight">
            <span className="block text-yellow-500 drop-shadow-md">
              maxWellness
            </span>
          </h1>

          <div className="mx-auto flex flex-wrap justify-center gap-4">
            {user ? (
              <Link
                to="/workouts"
                className="rounded-md border border-transparent bg-white px-8 py-3 text-center text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50"
              >
                View workouts for {user.email}
              </Link>
            ) : (
              <>
                <Link
                  to="/join"
                  className="rounded-md border border-transparent bg-white px-4 py-1 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8 sm:py-2"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="rounded-md bg-yellow-500 px-4 py-1 font-medium text-white hover:bg-yellow-600 sm:px-8 sm:py-2"
                >
                  Log In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
