import mongoose from "mongoose";

declare global {
  namespace Express {
    export interface Request {
      userId: mongoose.Types.ObjectId;
      sessionId: mongoose.Types.ObjectId;
    }
  }
}

export {};
