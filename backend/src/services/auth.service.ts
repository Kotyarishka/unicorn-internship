import { env } from "../constants/env";
import { SessionModel } from "../models/session.model";
import { UserDocument, UserModel } from "../models/user.model";

import jwt from "jsonwebtoken";
import appAssert from "../utils/appAssert";
import HttpStatusCode from "../constants/http";
import {
  refreshTokenDefaults,
  type RefreshTokenPayload,
  signToken,
  verifyToken,
} from "../utils/jwt";
import { daysFromNow, ONE_DAY_MS } from "../utils/date";

export type CreateAccountParams = {
  email: string;
  password: string;
  userAgent?: string;
};

export const createAccount = async ({
  email,
  password,
  userAgent,
}: CreateAccountParams) => {
  const user = await UserModel.exists({
    email,
  });

  appAssert(!user, HttpStatusCode.CONFLICT, "Email already in use");

  const newUser = await UserModel.create({
    email,
    password,
  });
  const userId = newUser._id;

  const session = await SessionModel.create({
    userId,
    userAgent,
  });

  const refreshToken = signToken(
    {
      sessionId: session._id,
    },
    refreshTokenDefaults
  );

  const accessToken = signToken({
    userId,
    sessionId: session._id,
  });

  return {
    user: newUser.omitSensitiveInfo(),
    accessToken,
    refreshToken,
  };
};

export type LoginParams = {
  email: string;
  password: string;
  userAgent?: string;
};

export const loginUser = async ({
  email,
  password,
  userAgent,
}: LoginParams) => {
  const user = await UserModel.findOne({
    email,
  });
  appAssert(user, HttpStatusCode.UNAUTHORIZED, "Invalid credentials");

  const isValid = await user.comparePassword(password);
  appAssert(isValid, HttpStatusCode.UNAUTHORIZED, "Invalid credentials");

  const userId = user._id;

  const session = await SessionModel.create({
    userId,
    userAgent,
  });

  const refreshToken = signToken(
    {
      sessionId: session._id,
    },
    refreshTokenDefaults
  );

  const accessToken = signToken({
    userId,
    sessionId: session._id,
  });

  return {
    user: user.omitSensitiveInfo(),
    accessToken,
    refreshToken,
  };
};

export const refreshUserAccessToken = async (refreshToken: string) => {
  const { payload } = verifyToken<RefreshTokenPayload>(refreshToken, {
    secret: refreshTokenDefaults.secret,
  });
  appAssert(payload, HttpStatusCode.UNAUTHORIZED, "Invalid refresh token");

  const now = Date.now();
  const session = await SessionModel.findById(payload.sessionId);
  appAssert(
    session && session.expiresAt.getTime() > now,
    HttpStatusCode.UNAUTHORIZED,
    "Session expired"
  );

  const shouldRefresh = session.expiresAt.getTime() - now < ONE_DAY_MS;
  if (shouldRefresh) {
    session.expiresAt = daysFromNow(30);
    await session.save();
  }

  const newRefreshToken = shouldRefresh
    ? signToken({ sessionId: session._id }, refreshTokenDefaults)
    : undefined;

  const accessToken = signToken({
    userId: session.userId,
    sessionId: session._id,
  });

  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
};

export const getUser = async (userId: UserDocument["_id"] | string) => {
  const user = await UserModel.findById(userId);
  appAssert(user, HttpStatusCode.NOT_FOUND, "User not found");

  return user.omitSensitiveInfo();
};
