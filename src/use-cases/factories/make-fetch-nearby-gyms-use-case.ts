import { FetchNearByUseCase } from '../fetch-nearby-gyms'

import { PrismaGymRepository } from '@/repositories/prisma/prisma-gym-repository'

export function makeFetchNearByUseCase() {
  const prismaGymRepository = new PrismaGymRepository()
  const UseCase = new FetchNearByUseCase(prismaGymRepository)

  return UseCase
}
