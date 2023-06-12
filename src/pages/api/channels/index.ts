import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { channelValidationSchema } from 'validationSchema/channels';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getChannels();
    case 'POST':
      return createChannel();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getChannels() {
    const data = await prisma.channel
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'channel'));
    return res.status(200).json(data);
  }

  async function createChannel() {
    await channelValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.suggested_change?.length > 0) {
      const create_suggested_change = body.suggested_change;
      body.suggested_change = {
        create: create_suggested_change,
      };
    } else {
      delete body.suggested_change;
    }
    const data = await prisma.channel.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
