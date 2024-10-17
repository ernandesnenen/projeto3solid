import { SearchGymsUseCase } from '../search-gyms'
import { PrismaGymRepository } from '@/repositories/prisma/prisma-gym-repository'

export function makeSearchGymsUseCase() {
  const prismaGymRepository = new PrismaGymRepository()
  const UseCase = new SearchGymsUseCase(prismaGymRepository)

  return UseCase
}
