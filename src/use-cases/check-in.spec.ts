import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'

import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOfCheckinsError } from './errors/max-number-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'

let checkInReposytory: InMemoryCheckInsRepository
let gymReposytory: InMemoryGymRepository
let sut: CheckInUseCase

describe('CheckIn Use Case', () => {
  beforeEach(async () => {
    checkInReposytory = new InMemoryCheckInsRepository()
    gymReposytory = new InMemoryGymRepository()
    sut = new CheckInUseCase(checkInReposytory, gymReposytory)

    vi.useFakeTimers()

    await gymReposytory.create({
      id: 'gym_01',
      title: 'javascrypt_gym',
      description: '',
      phone: '',
      latitude: -4.6825472,
      longitude: -37.8175488,
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    vi.setSystemTime(new Date(2024, 0, 10, 0, 0, 0))
    const { checkIn } = await sut.execute({
      gymId: 'gym_01',
      userId: 'user_01',
      userLatitude: -4.6825472,
      userLongitude: -37.8175488,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('must not be able to check in twice on the same day', async () => {
    vi.setSystemTime(new Date(2024, 8, 10, 8, 0, 0))
    await sut.execute({
      gymId: 'gym_01',
      userId: 'user_01',
      userLatitude: -4.6825472,
      userLongitude: -37.8175488,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym_01',
        userId: 'user_01',
        userLatitude: -4.6825472,
        userLongitude: -37.8175488,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckinsError)
  })

  it('must not be able to check in twice on the different day', async () => {
    vi.setSystemTime(new Date(2024, 8, 10, 8, 0, 0))
    await sut.execute({
      gymId: 'gym_01',
      userId: 'user_01',
      userLatitude: -4.6825472,
      userLongitude: -37.8175488,
    })

    vi.setSystemTime(new Date(2024, 8, 13, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym_01',
      userId: 'user_01',
      userLatitude: -4.6825472,
      userLongitude: -37.8175488,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('must not be able to check in twice on the different day', async () => {
    gymReposytory.items.push({
      id: 'gym_02',
      title: 'java_gym',
      description: '',
      phone: '',
      latitude: new Decimal(-4.2126606),
      longitude: new Decimal(-38.4205358),
      // -4.2126606,-38.4205358
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym_02',
        userId: 'user_01',
        userLatitude: -4.6825472,
        userLongitude: -37.8175488,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
