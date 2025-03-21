import { Request } from "express";
import { TokenDocument } from "../models/token.model";
import { UserDocument, UserModel } from "../models/user.model";
import appAssert from "./appAssert";
import HttpStatusCode from "../constans/http";

type UserPayload = {
  user: Omit<UserDocument, "password">;
};
type TokenPayload = {
  token: TokenDocument;
};

type PermissionHandler<TPayload> = (req: Request, payload: TPayload) => any;

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
  default: async (req, payload) => true, // default handler, this will always be executed if there empty array of scopes
  hasMagic: async (req, payload) =>
    appAssert(
      req.query.magic === "magic",
      HttpStatusCode.BAD_REQUEST,
      "Magic is not correct"
    ),
});
export type UserScope = keyof typeof userScopeHandlers;

export const tokenScopeHandlers = createTokenScopeHandlers({
  default: async (req, { token }) => {
    const user = await UserModel.findById(token.userId);
    appAssert(
      user,
      HttpStatusCode.NOT_FOUND,
      "User that owns the token not found"
    );

    // check if token is expired
    appAssert(
      token.expiresAt.getTime() > Date.now(),
      HttpStatusCode.UNAUTHORIZED,
      "Token expired"
    );
  },
});
export type TokenScope = keyof typeof tokenScopeHandlers;

export interface ScopeConfig {
  user?: UserScope[];
  token?: TokenScope[];
}
