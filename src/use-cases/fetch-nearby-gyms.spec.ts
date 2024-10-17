import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { FetchNearByUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymRepository
let sut: FetchNearByUseCase

describe('search gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymRepository()
    sut = new FetchNearByUseCase(gymsRepository)
  })

  it('should be able to search gyms', async () => {
    await gymsRepository.create({
      title: 'Far gym',
      description: null,
      phone: null,
      latitude: -1.6825472,
      longitude: -5.8175488,
    })
    await gymsRepository.create({
      title: 'Near gym',
      description: null,
      phone: null,
      latitude: -4.6825472,
      longitude: -37.8175488,
    })
    const { gyms } = await sut.execute({
      userLatitude: -4.6825472,
      userLongitude: -37.8175488,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near gym' })])
  })
})
