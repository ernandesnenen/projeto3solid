import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'

interface FetchUserCheckInsHistoryUseCaseRequest {
  userId: string
  page: number
}

interface FetchUserCheckInsHistoryUseCaseReponse {
  checkIns: CheckIn[]
}
export class FetchUserCheckInsHistoryUseCase {
  constructor(private checkinsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInsHistoryUseCaseRequest): Promise<FetchUserCheckInsHistoryUseCaseReponse> {
    const checkIns = await this.checkinsRepository.findManyByUserId(
      userId,
      page,
    )
    return {
      checkIns,
    }
  }
}
