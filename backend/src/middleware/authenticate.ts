import type { NextFunction, Request, Response } from "express";
import appAssert from "../utils/appAssert";
import HttpStatusCode from "../constans/http";
import AppErrorCode from "../constans/appErrorCode";
import { verifyToken } from "../utils/jwt";
import {
  ScopeConfig,
  tokenScopeHandlers,
  userScopeHandlers,
} from "../utils/scopes";
import asyncHandler from "../utils/asyncHandler";
import { getUser } from "../services/auth.service";
import { TokenModel } from "../models/token.model";

const authenticate = (scopes?: ScopeConfig) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!scopes) {
      return handleDefaultAuth(req, res, next); // if passed scopes are empty, use default auth
    }

    const authErrors = [];
    let authenticated = false;

    if (scopes.user && scopes.user.length === 0) {
      scopes.user.push("default");
    }
    if (scopes.token && scopes.token.length === 0) {
      scopes.token.push("default");
    }

    if (scopes.user && scopes.user.length > 0) {
      try {
        await authenticateUserScope(req, scopes.user);
        authenticated = true;
      } catch (error) {
        authErrors.push(error);
      }
    }

    if (scopes.token && scopes.token.length > 0) {
      // if user scope is not authenticated, try token scope
      try {
        await authenticateTokenScope(req, scopes.token);
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
    AppErrorCode.InvalidAccessToken
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
    AppErrorCode.InvalidAccessToken
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

const authenticateTokenScope = async (
  req: Request,
  permissions: ScopeConfig["token"] = []
) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  appAssert(
    token,
    HttpStatusCode.UNAUTHORIZED,
    "Not authorized",
    AppErrorCode.InvalidAccessToken
  );

  const tokenData = await TokenModel.findOne({
    token,
  });
  appAssert(tokenData, HttpStatusCode.UNAUTHORIZED, "Invalid token");

  const handlers = [];
  for (const permission of permissions) {
    const handler = tokenScopeHandlers[permission];
    appAssert(
      handler,
      HttpStatusCode.INTERNAL_SERVER_ERROR,
      "Invalid scope handler"
    );

    handlers.push(
      handler(req, {
        token: tokenData,
      })
    );
  }

  await Promise.all(handlers);
};

export default authenticate;
