import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history'

let checkInReposytory: InMemoryCheckInsRepository
let sut: FetchUserCheckInsHistoryUseCase

describe('fetch CheckIn history Use Case', () => {
  beforeEach(async () => {
    checkInReposytory = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInsHistoryUseCase(checkInReposytory)
  })

  it('should be able to fetch check ins history', async () => {
    await checkInReposytory.create({
      gym_id: 'gym_01',
      user_id: 'user_01',
    })
    await checkInReposytory.create({
      gym_id: 'gym_02',
      user_id: 'user_01',
    })
    const { checkIns } = await sut.execute({
      userId: 'user_01',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym_01' }),
      expect.objectContaining({ gym_id: 'gym_02' }),
    ])
  })

  it('should be able to fetch paginated check ins history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInReposytory.create({
        gym_id: `gym_${i}`,
        user_id: 'user_01',
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user_01',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym_21' }),
      expect.objectContaining({ gym_id: 'gym_22' }),
    ])
  })
})
