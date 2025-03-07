import assert from "node:assert";

import AppErrorCode from "../constans/appErrorCode";
import HttpStatusCode from "../constans/http";

import AppError from "./appError";

type AppAssert = (
  condition: any,
  httpStatusCode: HttpStatusCode,
  message: string,
  appErrorCode?: AppErrorCode
) => asserts condition;

/**
 * Asserts a condition and throws an error if it is falsy.
 */
const appAssert: AppAssert = (
  condition,
  httpStatusCode,
  message,
  appErrorCode
) => assert(condition, new AppError(httpStatusCode, message, appErrorCode));

export default appAssert;
