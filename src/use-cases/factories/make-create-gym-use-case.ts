import { CreateGymUseCase } from '../create-gym'

import { PrismaGymRepository } from '@/repositories/prisma/prisma-gym-repository'

export function makeCreateGymUseCase() {
  const prismaGymRepository = new PrismaGymRepository()
  const UseCase = new CreateGymUseCase(prismaGymRepository)

  return UseCase
}
