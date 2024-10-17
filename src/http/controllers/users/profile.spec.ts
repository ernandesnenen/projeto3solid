import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAuthenticateUser } from '@/utils/test/create-authenticate-user'

describe('Profile', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to profile', async () => {
    const { token } = await createAuthenticateUser(app)
    const profileResponse = await request(app.server)
      .get('/me')
      .set('authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: 'johnDoe@test.com',
      }),
    )
  })
})
