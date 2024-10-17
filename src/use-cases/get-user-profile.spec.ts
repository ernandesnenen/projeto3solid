import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'

import { GetUserProfileUseCase } from './get-user-profile'
import { ResouceNotFoundError } from './errors/resouce-not-found-error'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able to finde user and return profile', async () => {
    const createUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createUser.id,
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('John Doe')
  })

  it('not should be able find user and return profile', async () => {
    expect(() =>
      sut.execute({
        userId: 'not-user-exists',
      }),
    ).rejects.toBeInstanceOf(ResouceNotFoundError)
  })
})
