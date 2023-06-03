import {instance} from "common/api"
import {
  ArgCreateCardType, ArgUpdateCardType,
  DeleteCardResponseType,
  FetchCardsResponseType,
  GetCardsParamsType
} from "./cards.types"


export const cardsApi = {
  getCards: (params?: GetCardsParamsType) => {
    return instance.get<FetchCardsResponseType>("cards/card", { params });
  },
  createCard: (card: ArgCreateCardType) => {
    return instance.post("cards/card", { card });
  },
  removeCard: (_id: string) => {
    return instance.delete<DeleteCardResponseType>(`cards/card?id=${_id}`);
  },
  updateCard: (card: ArgUpdateCardType) => {
    return instance.put("cards/card", { card: card, id: card._id });
  },
};

