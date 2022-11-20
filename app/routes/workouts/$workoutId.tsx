import type { ActionArgs, LoaderArgs } from "@remix-run/node"
import { json, redirect } from "@remix-run/node"
import { Form, useCatch, useLoaderData } from "@remix-run/react"
import invariant from "tiny-invariant"

import { deleteWorkout, getWorkout } from "~/models/workout.server"
import { requireUserId } from "~/session.server"

export async function loader({ request, params }: LoaderArgs) {
  const userId = await requireUserId(request)
  invariant(params.workoutId, "workoutId not found")
  const [category, subcategory, timeframe] = params.workoutId.split("_")
  console.info({ category, subcategory, timeframe })

  const workout = await getWorkout({ userId, id: params.workoutId })
  if (!workout) {
    throw new Response("Not Found", { status: 404 })
  }
  return json({ workout, params })
}

export async function action({ request, params }: ActionArgs) {
  const userId = await requireUserId(request)
  invariant(params.workoutId, "workoutId not found")

  await deleteWorkout({ userId, id: params.workoutId })

  return redirect("/workouts")
}

export default function WorkoutDetailsPage() {
  const data = useLoaderData<typeof loader>()

  return <h1>Hello</h1>

  // return (
  //   <div>
  //     <h3 className="text-2xl font-bold">{data.workout.title}</h3>
  //     <p className="py-6">{data.workout.body}</p>
  //     <hr className="my-4" />
  //     <Form method="post">
  //       <button
  //         type="submit"
  //         className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
  //       >
  //         Delete
  //       </button>
  //     </Form>
  //   </div>
  // )
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error)

  return <div>An unexpected error occurred: {error.message}</div>
}

export function CatchBoundary() {
  const caught = useCatch()

  if (caught.status === 404) {
    return <div>Workout not found</div>
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`)
}
