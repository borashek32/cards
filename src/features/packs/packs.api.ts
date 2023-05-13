import { instance } from "common/api/common.api"
import {
  ArgCreatePackType,
  ArgDeletePackType,
  ArgGetPacksType,
  ArgUpdatePackType,
  ResGetPacksType
} from "common/types/types"


export const packsApi = {
  getPacks: (arg: ArgGetPacksType) => {
    return instance.get<ResGetPacksType>("cards/pack", { params: arg })
  },
  createPack: (arg: ArgCreatePackType) => {
    return instance.post<ResGetPacksType>("cards/pack", arg)
  },
  updatePack: (arg: ArgUpdatePackType) => {
    return instance.put<ResGetPacksType>("cards/pack", arg)
  },
  deletePack: (arg: ArgDeletePackType) => {
    const id = arg.id
    return instance.delete<ResGetPacksType>(`cards/pack?id=${id}`)
  }
}

