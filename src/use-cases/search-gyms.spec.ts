import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGymRepository
let sut: SearchGymsUseCase

describe('search gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search gyms', async () => {
    await gymsRepository.create({
      title: 'javascription gym',
      description: null,
      phone: null,
      latitude: -4.6825472,
      longitude: -37.8175488,
    })
    await gymsRepository.create({
      title: 'typescription gym',
      description: null,
      phone: null,
      latitude: -4.6825472,
      longitude: -37.8175488,
    })
    const { gyms } = await sut.execute({
      query: 'javascription',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'javascription gym' }),
    ])
  })

  it('should be able to fetch paginated search gyms', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `javascription gym ${i}`,
        description: null,
        phone: null,
        latitude: -4.6825472,
        longitude: -37.8175488,
      })
    }

    const { gyms } = await sut.execute({
      query: 'javascription',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'javascription gym 21' }),
      expect.objectContaining({ title: 'javascription gym 22' }),
    ])
  })
})
