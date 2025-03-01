import { Session } from "../../types/Session";
import { SessionModel } from "../models/Session";
import { transformMongoId } from "../../utils";

export const createSession = async (session: Session): Promise<Session> => {
  const created = await SessionModel.create(session); 
  return created.toObject({ transform: transformMongoId });
}

export const sessionFindById =  async (id: string): Promise<Session | null> => {
  const session = await SessionModel.findById(id);
  return session ? session.toObject({ transform: transformMongoId }) : null;
}

export const sessionFindByShopId =  async (shopId: string): Promise<Session | null> => {
  const session = await SessionModel.findOne({ shopId });
  return session ? session.toObject({ transform: transformMongoId }) : null;
}

export const sessionFindByShopifyCartId =  async (shopifyCartId: string): Promise<Session | null> => {
  const session = await SessionModel.findOne({ shopifyCartId });
  return session ? session.toObject({ transform: transformMongoId }) : null;
}

export const updateSession = async (id: string, updates: Partial<Session>): Promise<Session | null> => {
  const updatedSession = await SessionModel.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
  return updatedSession ? updatedSession.toObject({ transform: transformMongoId }) : null;
};

export const getAllSessions = async (): Promise<Session[]> => {
    return await SessionModel.find().lean();
};