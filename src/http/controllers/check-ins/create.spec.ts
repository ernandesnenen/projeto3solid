import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAuthenticateUser } from '@/utils/test/create-authenticate-user'
import { prisma } from '@/lib/primas'

describe('create gym', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to create check-in', async () => {
    const { token } = await createAuthenticateUser(app)

    const gym = await prisma.gym.create({
      data: {
        title: 'javascrip gym',
        latitude: -4.6825472,
        longitude: -37.8175488,
      },
    })
    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('authorization', `Bearer ${token}`)
      .send({
        latitude: -4.6825472,
        longitude: -37.8175488,
      })

    expect(response.statusCode).toEqual(201)
  })
})
