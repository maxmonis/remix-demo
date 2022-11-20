import { Link } from "@remix-run/react"

export default function WorkoutIndexPage() {
  return (
    <p>
      Select a workout on the left or{" "}
      <Link to="new" className="whitespace-nowrap text-blue-500 underline">
        create a new one
      </Link>
    </p>
  )
}
