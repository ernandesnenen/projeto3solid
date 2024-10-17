import { PrismaGymRepository } from '@/repositories/prisma/prisma-gym-repository'

import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { CheckInUseCase } from '../check-in'

export function makeCheckInUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const prismagymsRepository = new PrismaGymRepository()
  const UseCase = new CheckInUseCase(
    prismaCheckInsRepository,
    prismagymsRepository,
  )

  return UseCase
}
