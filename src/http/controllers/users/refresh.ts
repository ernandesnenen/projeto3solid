import { FastifyRequest, FastifyReply } from 'fastify'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true })
  const { role } = request.user
  const token = await reply.jwtSign(
    {
      role,
    },
    {
      sign: {
        sub: request.user.sub,
      },
    },
  )
  const refreshToken = await reply.jwtSign(
    {
      role,
    },
    {
      sign: {
        sub: request.user.sub,
        expiresIn: '7d',
      },
    },
  )
  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/', // a '/' indica que todas as rotas podem acessar o token
      secure: true, // isso faz com que o front end não consiga ler esse cookie
      sameSite: true, // isso faz com que esse cookie só possa ser acessado neste dominio
      httpOnly: true, // isso permite que so o back end tenha acesso ao cookie
    })
    .status(200)
    .send({ token })
}
