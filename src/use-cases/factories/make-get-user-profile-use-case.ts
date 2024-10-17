import { PrimasUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserProfileUseCase } from '../get-user-profile'

export function makeGetUserProfileUseCase() {
  const prismaUserRepository = new PrimasUserRepository()
  const UseCase = new GetUserProfileUseCase(prismaUserRepository)

  return UseCase
}
