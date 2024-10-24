import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findByUserInOnDate(userId: string, date: Date): Promise<CheckIn | null>
  findById(checkInId: string): Promise<CheckIn | null>
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
  save(checkIn: CheckIn): Promise<CheckIn>
  countByUserId(userId: string): Promise<number>
}
