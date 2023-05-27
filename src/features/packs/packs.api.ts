import {instance} from "common/api"
import {
  ArgCreatePackType, CreatePackResponseType, FetchPacksResponseType, GetPacksParamsType,
  PackType, RemovePackResponseType, UpdatePackResponseType,
} from "./packs.types"


export const packsApi = {
  getPacks: (params?: GetPacksParamsType) => {
    return instance.get<FetchPacksResponseType>("cards/pack", {params: params});
  },
  createPack: (cardsPack: ArgCreatePackType) => {
    return instance.post<CreatePackResponseType>("cards/pack", {cardsPack});
  },
  removePack: (id: string) => {
    return instance.delete<RemovePackResponseType>(`cards/pack?id=${id}`);
  },
  updatePack: (cardsPack: PackType) => {
    return instance.put<UpdatePackResponseType>("cards/pack", {cardsPack});
  },
};

