import HttpStatusCode from "../constants/http";
import { TokenModel } from "../models/token.model";
import { UserModel } from "../models/user.model";
import appAssert from "../utils/appAssert";
import asyncHandler from "../utils/asyncHandler";
import { daysFromNow } from "../utils/date";
import { z } from "zod";

import { v4 as uuidv4 } from "uuid";

export const createTokenHandler = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.userId);
  appAssert(user, HttpStatusCode.NOT_FOUND, "User not found");

  const tokenData = z
    .object({
      description: z.string().optional(),
      expiresIn: z.number().optional(),
    })
    .parse(req.body);
  const tokenValue = uuidv4();

  const token = await TokenModel.create({
    userId: req.userId,
    token: tokenValue,
    description: tokenData.description,

    expiresAt: daysFromNow(tokenData.expiresIn || 30),
  });

  return res
    .status(HttpStatusCode.CREATED)
    .json({ token: token.token, message: "Token created successfully" });
});

export const getTokensHandler = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.userId);
  appAssert(user, HttpStatusCode.NOT_FOUND, "User not found");

  const tokens = await TokenModel.find({ userId: req.userId });

  return res.status(HttpStatusCode.OK).json({
    tokens: tokens.map((token) => token.omitSensitiveInfo()),
    count: tokens.length,
  });
});

export const deleteTokenHandler = asyncHandler(async (req, res) => {
  const tokenId = z.string().parse(req.params.tokenId);

  const token = await TokenModel.findOneAndDelete({
    _id: tokenId,
    userId: req.userId,
  });

  appAssert(token, HttpStatusCode.NOT_FOUND, "Token not found");

  return res
    .status(HttpStatusCode.OK)
    .json({ message: "Token deleted successfully" });
});
