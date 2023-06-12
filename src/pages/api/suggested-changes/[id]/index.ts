import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { suggestedChangeValidationSchema } from 'validationSchema/suggested-changes';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.suggested_change
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getSuggestedChangeById();
    case 'PUT':
      return updateSuggestedChangeById();
    case 'DELETE':
      return deleteSuggestedChangeById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getSuggestedChangeById() {
    const data = await prisma.suggested_change.findFirst(convertQueryToPrismaUtil(req.query, 'suggested_change'));
    return res.status(200).json(data);
  }

  async function updateSuggestedChangeById() {
    await suggestedChangeValidationSchema.validate(req.body);
    const data = await prisma.suggested_change.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteSuggestedChangeById() {
    const data = await prisma.suggested_change.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
