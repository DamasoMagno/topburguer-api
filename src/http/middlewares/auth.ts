import { type FastifyReply, type FastifyRequest } from "fastify";

export const authMiddleware = async (
  request: FastifyRequest,
  response: FastifyReply,
) => {
  try {
    const user = request.user as any;

    await request.jwtVerify();
  } catch (error) {
    return response.status(401).send({ message: "Unauthorized" });
  }
};
