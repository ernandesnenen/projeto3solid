import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Refresh', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to refresh', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johnDoe@test.com',
      password: '123456',
    })

    const authresponse = await request(app.server).post('/sessions').send({
      email: 'johnDoe@test.com',
      password: '123456',
    })

    const cookies = authresponse.get('Set-Cookie')

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
