import { Shop } from "../../types/Shop";
import { ShopModel } from "../models/Shop";
import { transformMongoId } from "../../utils";

export const createShop = async (shop: Shop): Promise<Shop> => {
  const created = await ShopModel.create(shop);
  return created.toObject({ transform: transformMongoId });
}

export const shopFindById =  async (id: string): Promise<Shop | null> => {
  const shop = await ShopModel.findById(id);
  return shop ? shop.toObject({ transform: transformMongoId }) : null;
}

export const shopFindByDomain = async (domain: string): Promise<Shop | null> => {
  const shop = await ShopModel.findOne({ domain });
  return shop ? shop.toObject({ transform: transformMongoId }) : null;
};