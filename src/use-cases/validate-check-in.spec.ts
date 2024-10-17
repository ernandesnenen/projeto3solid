import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

import { ValidateCheckInUseCase } from './validate-check-in'
import { ResouceNotFoundError } from './errors/resouce-not-found-error'
import { LateCheckInValidationError } from './errors/late-check-in-validetion-error'

let checkInReposytory: InMemoryCheckInsRepository

let sut: ValidateCheckInUseCase

describe('Validate CheckIn Use Case', () => {
  beforeEach(async () => {
    checkInReposytory = new InMemoryCheckInsRepository()

    sut = new ValidateCheckInUseCase(checkInReposytory)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to Validation check in', async () => {
    const createdcheckIn = await checkInReposytory.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })
    const { checkIn } = await sut.execute({
      checkInId: createdcheckIn.id,
    })

    expect(checkIn.created_at).toEqual(expect.any(Date))
    expect(checkInReposytory.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('should not  be able to Validation an existent check in', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'inexistent-checkIn',
      }),
    ).rejects.toBeInstanceOf(ResouceNotFoundError)
  })

  it('It should not be possible to create a checkin after 20 minutes', async () => {
    vi.setSystemTime(new Date(2024, 9, 29, 10, 40))
    const createdcheckIn = await checkInReposytory.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const twentyOneMinutesInMs = 1000 * 60 * 21
    vi.advanceTimersByTime(twentyOneMinutesInMs)

    expect(() =>
      sut.execute({
        checkInId: createdcheckIn.id,
      }),
    ).rejects.toBeInstanceOf(LateCheckInValidationError)
  })
})
