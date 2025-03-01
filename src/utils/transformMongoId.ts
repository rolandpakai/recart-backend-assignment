import { HydratedDocument } from "mongoose";

const transformMongoId = (document: HydratedDocument<unknown>, ret: Record<string, unknown>) => {
  if (ret._id) {
      ret.id = ret._id.toString();
      delete ret._id;
  }
  return ret;
};

export default transformMongoId;