import asyncHandler from "../utils/asyncHandler";

import {
  createAccount,
  loginUser,
  refreshUserAccessToken,
} from "../services/auth.service";
import {
  clearAuthCookies,
  getAccessTokenCookieOptions,
  getRefreshTokenCookieOptions,
  setAuthCookies,
} from "../utils/cookies";
import HttpStatusCode from "../constants/http";

import { loginSchema, registerSchema } from "./auth.schemas";
import { verifyToken } from "../utils/jwt";
import { SessionModel } from "../models/session.model";
import appAssert from "../utils/appAssert";

export const registerHandler = asyncHandler(async (req, res) => {
  const data = registerSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { user, accessToken, refreshToken } = await createAccount(data);

  return setAuthCookies(res, { accessToken, refreshToken })
    .status(HttpStatusCode.CREATED)
    .json({ user });
});

export const loginHandler = asyncHandler(async (req, res) => {
  const data = loginSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { accessToken, refreshToken } = await loginUser(data);

  return setAuthCookies(res, { accessToken, refreshToken })
    .status(HttpStatusCode.OK)
    .json({
      message: "Logged in successfully",
    });
});

export const logoutHandler = asyncHandler(async (req, res) => {
  const accessToken = req.cookies["accessToken"] as string | undefined;

  const { payload } = verifyToken(accessToken || "");

  if (payload) {
    await SessionModel.findByIdAndDelete(payload.sessionId);
  }

  return clearAuthCookies(res).status(HttpStatusCode.OK).json({
    message: "Logged out successfully",
  });
});

export const refreshHandler = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies["refreshToken"] as string | undefined;
  appAssert(refreshToken, HttpStatusCode.UNAUTHORIZED, "Missing refresh token");

  const { accessToken, refreshToken: newRefreshToken } =
    await refreshUserAccessToken(refreshToken);

  if (newRefreshToken) {
    res.cookie("refreshToken", newRefreshToken, getRefreshTokenCookieOptions());
  }

  return res
    .status(HttpStatusCode.OK)
    .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
    .json({
      message: "Access token refreshed",
    });
});
