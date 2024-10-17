import { expect, describe, it, beforeEach } from 'vitest'

import { CreateGymUseCase } from './create-gym'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'

let gymRepository: InMemoryGymRepository
let sut: CreateGymUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymRepository()
    sut = new CreateGymUseCase(gymRepository)
  })

  it('should to be able create a the gym', async () => {
    const { gym } = await sut.execute({
      title: 'javascription_gym',
      description: null,
      phone: null,
      latitude: -4.6825472,
      longitude: -37.8175488,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
