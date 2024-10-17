import { FetchUserCheckInsHistoryUseCase } from '../fetch-user-check-ins-history'

import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeFetchUserCheckInsHistoryUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const UseCase = new FetchUserCheckInsHistoryUseCase(prismaCheckInsRepository)

  return UseCase
}
