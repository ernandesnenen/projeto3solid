import { UsersRepository } from '@/repositories/users-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import bcryptjs from 'bcryptjs'
import { User } from '@prisma/client'
interface authenticateUseCaseRequest {
  email: string
  password: string
}

interface authenticateUseCaseReponse {
  user: User
}
export class AuthenticateUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: authenticateUseCaseRequest): Promise<authenticateUseCaseReponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMathes = await bcryptjs.compare(
      password,
      user.password_hash,
    )
    if (!doesPasswordMathes) {
      throw new InvalidCredentialsError()
    }
    return { user }
  }
}
