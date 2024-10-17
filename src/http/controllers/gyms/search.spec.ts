import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAuthenticateUser } from '@/utils/test/create-authenticate-user'

describe('create gym', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to search gym', async () => {
    const { token } = await createAuthenticateUser(app, true)
    await request(app.server)
      .post('/create')
      .set('authorization', `Bearer ${token}`)
      .send({
        title: 'javaScript gym',
        description: 'some gym',
        phone: '1112223334',
        latitude: -4.6825472,
        longitude: -37.8175488,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({
        q: 'javaScript',
      })
      .set('authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'javaScript gym',
      }),
    ])
  })
})
