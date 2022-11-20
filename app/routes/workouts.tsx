import type { LoaderArgs } from "@remix-run/node"
import { json } from "@remix-run/node"
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react"

import { requireUserId } from "~/session.server"
import { useUser } from "~/utils/hooks"
import { getWorkoutListItems } from "~/models/workout.server"

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request)
  const workoutsListItems = await getWorkoutListItems({ userId })
  return json({ workoutsListItems })
}

export default function WorkoutsPage() {
  const data = useLoaderData<typeof loader>()
  const user = useUser()

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <h1 className="text-3xl font-bold">
          <Link to=".">
            <span className="hidden sm:block">maxWellness</span>
            <img
              className="h-10 w-10 rounded-md border object-contain sm:hidden"
              src={
                "https://user-images.githubusercontent.com/" +
                "51540371/202920493-0f9a5a3d-26bc-4f37-94d5-a648091dfe80.png"
              }
              alt="maxWellness Logo"
            />
          </Link>
        </h1>
        <p>{user.email}</p>
        <Form action="/logout" method="post">
          <button
            type="submit"
            className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
          >
            Logout
          </button>
        </Form>
      </header>

      <main className="flex h-full bg-white">
        <div className="h-full w-40 border-r bg-gray-50">
          <Link to="new" className="block p-4 text-xl text-blue-500">
            + New Workout
          </Link>

          <hr />

          {data.workoutsListItems.length === 0 ? (
            <p className="p-4">No workouts yet</p>
          ) : (
            <ol>
              {data.workoutsListItems.map((workout) => (
                <li key={workout.id}>
                  <NavLink
                    className={({ isActive }) =>
                      `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
                    }
                    to={workout.id}
                  >
                    📝 {workout.title}
                  </NavLink>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
