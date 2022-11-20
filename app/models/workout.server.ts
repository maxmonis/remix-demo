import type { User, Workout } from "@prisma/client"

import { prisma } from "~/db.server"

export type { Workout } from "@prisma/client"

export function getWorkout({
  id,
  userId,
}: Pick<Workout, "id"> & {
  userId: User["id"]
}) {
  return prisma.workout.findFirst({
    select: { id: true, body: true, title: true },
    where: { id, userId },
  })
}

export function getWorkoutListItems({ userId }: { userId: User["id"] }) {
  return prisma.workout.findMany({
    where: { userId },
    select: { id: true, title: true },
    orderBy: { updatedAt: "desc" },
  })
}

export function createWorkout({
  body,
  title,
  userId,
}: Pick<Workout, "body" | "title"> & {
  userId: User["id"]
}) {
  return prisma.workout.create({
    data: {
      title,
      body,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  })
}

export function deleteWorkout({
  id,
  userId,
}: Pick<Workout, "id"> & { userId: User["id"] }) {
  return prisma.workout.deleteMany({
    where: { id, userId },
  })
}
