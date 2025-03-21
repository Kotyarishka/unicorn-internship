import mongoose from "mongoose";
import { daysFromNow } from "../utils/date";

export interface TokenDocument
  extends mongoose.Document<mongoose.Types.ObjectId> {
  userId: mongoose.Types.ObjectId;
  token: string;
  description?: string;
  createdAt: Date;
  expiresAt: Date;

  omitSensitiveInfo: () => Omit<TokenDocument, "password">;
}

const tokenSchema = new mongoose.Schema<TokenDocument>({
  userId: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  description: {
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

tokenSchema.methods.omitSensitiveInfo = function () {
  const token = this.toObject();

  delete token.token;

  return token;
};

export const TokenModel = mongoose.model<TokenDocument>("Token", tokenSchema);
