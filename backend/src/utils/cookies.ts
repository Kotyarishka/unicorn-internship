import type { CookieOptions, Response } from "express";
import { env } from "../constants/env";
import { daysFromNow, minutesFromNow } from "./date";

const defaults: CookieOptions = {
  sameSite: "strict",
  httpOnly: true,
  secure: env.NODE_ENV !== "development",
};
export const refreshPath = "/auth/refresh";

export const getAccessTokenCookieOptions = (): CookieOptions => ({
  ...defaults,
  expires: minutesFromNow(15),
});
export const getRefreshTokenCookieOptions = (): CookieOptions => ({
  ...defaults,
  expires: daysFromNow(30),
  path: refreshPath,
});

export const setAuthCookies = (
  res: Response,
  { accessToken, refreshToken }: { accessToken: string; refreshToken: string }
) =>
  res
    .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
    .cookie("refreshToken", refreshToken, getRefreshTokenCookieOptions());

export const clearAuthCookies = (res: Response) =>
  res.clearCookie("accessToken").clearCookie("refreshToken", {
    path: refreshPath,
  });
