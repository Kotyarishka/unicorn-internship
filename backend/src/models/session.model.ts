import mongoose from "mongoose";
import { daysFromNow } from "../utils/date";

export interface SessionDocument
  extends mongoose.Document<mongoose.Types.ObjectId> {
  userId: mongoose.Types.ObjectId;
  userAgent?: string;
  createdAt: Date;
  expiresAt: Date;
}

const sessionSchema = new mongoose.Schema<SessionDocument>({
  userId: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId,
    index: true,
  },
  userAgent: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  expiresAt: {
    type: Date,
    default: () => daysFromNow(30),
  },
});

export const SessionModel = mongoose.model<SessionDocument>(
  "Session",
  sessionSchema
);
