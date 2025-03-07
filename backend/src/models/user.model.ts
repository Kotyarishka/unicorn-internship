import mongoose from "mongoose";
import { compareValue, hashValue } from "../utils/bcrypt";

export interface UserDocument
  extends mongoose.Document<mongoose.Types.ObjectId> {
  email: string;
  password: string;

  createdAt: Date;
  updatedAt: Date;

  comparePassword: (password: string) => Promise<boolean>;
  omitSensitiveInfo: () => Omit<UserDocument, "password">;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await hashValue(this.password);

  next();
});

userSchema.methods.comparePassword = async function (password: string) {
  return compareValue(password, this.password);
};
userSchema.methods.omitSensitiveInfo = function () {
  const user = this.toObject();

  delete user.password;

  return user;
};

export const UserModel = mongoose.model<UserDocument>("User", userSchema);
