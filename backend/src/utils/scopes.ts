import { Request } from "express";
import { UserDocument } from "src/models/user.model";
import appAssert from "./appAssert";
import HttpStatusCode from "src/constans/http";
import AppErrorCode from "src/constans/appErrorCode";
import { verifyToken } from "./jwt";
import AppError from "./appError";

type UserPayload = {
  user: Omit<UserDocument, "password">;
};
type TokenPayload = {
  token: string;
};

type PermissionHandler<TPayload> = (
  req: Request,
  payload: TPayload
) => boolean | Promise<boolean>;

const createUserScopeHandlers = <
  T extends Record<string, PermissionHandler<UserPayload>>
>(
  handlers: T
): T => handlers;
const createTokenScopeHandlers = <
  T extends Record<string, PermissionHandler<TokenPayload>>
>(
  handlers: T
): T => handlers;

export const userScopeHandlers = createUserScopeHandlers({
  hasMagic: async (req, payload) => req.query.magic === "magic",
});
export type UserScope = keyof typeof userScopeHandlers;

export const tokenScopeHandlers = createTokenScopeHandlers({
  isAccessToken: async (req, payload) => true,
  isRefreshToken: async (req, payload) => true,
});
export type TokenScope = keyof typeof tokenScopeHandlers;

export interface ScopeConfig {
  user?: UserScope[];
  token?: TokenScope[];
}
