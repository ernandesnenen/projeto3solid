import { prisma } from '@/lib/primas'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'
export async function createAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johnDoe@test.com',
      password_hash: await hash('123456', 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const authresponse = await request(app.server).post('/sessions').send({
    email: 'johnDoe@test.com',
    password: '123456',
  })

  const { token } = authresponse.body

  return {
    token,
  }
}
