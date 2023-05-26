import {instance} from "common/api"
import {
  ArgCreateCardType,
  CardType,
  DeleteCardResponseType,
  FetchCardsResponseType,
  GetCardsParamsType
} from "./cards.types"


export const cardsApi = {
  getCards: (params: GetCardsParamsType) => {
    return instance.get<FetchCardsResponseType>("cards/card", {params});
  },
  createCard: (card: ArgCreateCardType) => {
    return instance.post("cards/card", {card});
  },
  removeCard: (_id: string) => {
    return instance.delete<DeleteCardResponseType>(`cards/card?id=${_id}`);
  },
  updatePack: (card: CardType) => {
    return instance.put("cards/card", { card });
  },
};

