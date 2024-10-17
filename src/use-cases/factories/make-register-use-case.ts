import { PrimasUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
  const prismaUserRepository = new PrimasUserRepository()
  const registerUsecase = new RegisterUseCase(prismaUserRepository)
  return registerUsecase
}
