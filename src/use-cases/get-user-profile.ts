import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { ResouceNotFoundError } from './errors/resouce-not-found-error'

interface getUserProfileUseCaseRequest {
  userId: string
}

interface getUserProfileUseCaseReponse {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    userId,
  }: getUserProfileUseCaseRequest): Promise<getUserProfileUseCaseReponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new ResouceNotFoundError()
    }

    return { user }
  }
}
