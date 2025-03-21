import { z } from "zod";
import HttpStatusCode from "../constants/http";
import { SessionModel } from "../models/session.model";
import asyncHandler from "../utils/asyncHandler";
import appAssert from "../utils/appAssert";

export const getSessionsHandler = asyncHandler(async (req, res) => {
  const sessions = await SessionModel.find(
    {
      userId: req.userId,
      expiresAt: { $gt: new Date() },
    },
    {
      _id: true,
      userAgent: true,
      createdAt: true,
    },
    {
      sort: {
        createdAt: -1,
      },
    }
  );

  return res.status(HttpStatusCode.OK).json(
    sessions.map((session) => ({
      ...session.toObject(),
      ...(session.id === req.sessionId && { isCurrent: true }),
    }))
  );
});

export const deleteSessionHandler = asyncHandler(async (req, res) => {
  const sessionId = z.string().parse(req.params.sessionId);

  const deleted = await SessionModel.findOneAndDelete({
    _id: sessionId,
    userId: req.userId,
  });
  appAssert(deleted, HttpStatusCode.NOT_FOUND, "Session not found");

  return res.status(HttpStatusCode.OK).json({
    message: "Session deleted successfully",
  });
});
