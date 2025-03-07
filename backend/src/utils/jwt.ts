import jwt, { type SignOptions, type VerifyOptions } from "jsonwebtoken";
import type { SessionDocument } from "../models/session.model";
import type { UserDocument } from "../models/user.model";
import { env } from "../constans/env";

export type RefreshTokenPayload = {
  sessionId: SessionDocument["_id"];
};
export type AccessTokenPayload = {
  userId: UserDocument["_id"];
  sessionId: SessionDocument["_id"];
};

type SignTokenOptions = SignOptions & { secret: string };
const defaults: SignOptions = {
  audience: ["user"],
};
const accessTokenDefaults: SignTokenOptions = {
  expiresIn: "15m",
  secret: env.JWT_SECRET,
};
export const refreshTokenDefaults: SignTokenOptions = {
  expiresIn: "30d",
  secret: env.JWT_REFRESH_SECRET,
};

export const signToken = (
  payload: RefreshTokenPayload | AccessTokenPayload,
  options?: SignTokenOptions
) => {
  const { secret, ...restOptions } = options ?? accessTokenDefaults;

  return jwt.sign(payload, secret, { ...defaults, ...restOptions });
};

export const verifyToken = <TPayload extends object = AccessTokenPayload>(
  token: string,
  options?: VerifyOptions & { secret: string }
) => {
  const { secret = env.JWT_SECRET, ...restOptions } = options || {};

  try {
    const payload = jwt.verify(token, secret, {
      ...defaults,
      ...restOptions,
    }) as TPayload;

    return { payload };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
