import type { NextFunction, Request, Response } from "express";
import appAssert from "../utils/appAssert";
import HttpStatusCode from "../constans/http";
import AppErrorCode from "../constans/appErrorCode";
import { verifyToken } from "../utils/jwt";
import { ScopeConfig, userScopeHandlers } from "src/utils/scopes";
import asyncHandler from "src/utils/asyncHandler";
import { getUser } from "src/services/auth.service";

const authenticate = (scopes?: ScopeConfig) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!scopes) {
      return handleDefaultAuth(req, res, next); // if passed scopes are empty, use default auth
    }

    const authErrors = [];
    let authenticated = false;
    if (scopes.user && scopes.user.length > 0) {
      try {
        await authenticateUserScope(req, scopes.user);
        authenticated = true;
      } catch (error) {
        authErrors.push(error);
      }
    }

    if (!authenticated) {
      if (authErrors.length > 0) {
        throw authErrors[authErrors.length - 1];
      } else {
        appAssert(false, HttpStatusCode.FORBIDDEN, "Not authorized");
      }
    }

    next();
  });

const handleDefaultAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies["accessToken"] as string | undefined;
  appAssert(
    accessToken,
    HttpStatusCode.UNAUTHORIZED,
    "Not authorized",
    AppErrorCode.NoTokenProvided
  );

  const { payload, error } = verifyToken(accessToken);
  appAssert(
    payload,
    HttpStatusCode.UNAUTHORIZED,
    error == "jwt expired" ? "Token expired" : "Invalid toke",
    AppErrorCode.InvalidAccessToken
  );

  req.userId = payload.userId;
  req.sessionId = payload.sessionId;

  next();
};

const authenticateUserScope = async (
  req: Request,
  permissions: ScopeConfig["user"] = []
) => {
  const accessToken = req.cookies["accessToken"] as string | undefined;
  appAssert(
    accessToken,
    HttpStatusCode.UNAUTHORIZED,
    "Not authorized",
    AppErrorCode.NoTokenProvided
  );

  const { payload, error } = verifyToken(accessToken);
  appAssert(
    payload,
    HttpStatusCode.UNAUTHORIZED,
    error == "jwt expired" ? "Token expired" : "Invalid toke",
    AppErrorCode.InvalidAccessToken
  );

  req.userId = payload.userId;
  req.sessionId = payload.sessionId;

  const user = await getUser(payload.userId);
  const handlers = [];
  for (const permission of permissions) {
    const handler = userScopeHandlers[permission];
    appAssert(
      handler,
      HttpStatusCode.INTERNAL_SERVER_ERROR,
      "Invalid scope handler"
    );

    handlers.push(handler(req, { user }));
  }

  await Promise.all(handlers);
};

export default authenticate;
