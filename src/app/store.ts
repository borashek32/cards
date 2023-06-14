import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { appReducer } from "app/app.slice"
import {authReducer} from "features/auth/auth.slice"
import {packsReducer} from "features/packs/packs.slice"
import {cardsReducer} from "features/cards/cards.slice"
import {learnReducer} from "features/learn/learn.slice"

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    packs: packsReducer,
    cards: cardsReducer,
    learn: learnReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

//   AppDispatch: Определяет тип для функции диспетчера dispatch в Redux. Он определен как тип, равный типу dispatch
//   из объекта store. То есть, AppDispatch будет иметь тот же тип, что и функция dispatch в хранилище Redux.
//
//   RootState: Определяет тип для корневого состояния (root state) Redux. Он определен как тип возвращаемого значения
//   функции getState из объекта store. То есть, RootState будет иметь тот же тип, что и корневое состояние в хранилище Redux.
//
//   AppThunk: Определяет тип для санки (thunk) в Redux. Санки представляют асинхронные действия, которые могут быть
//   выполнены с помощью функции dispatch. Он определен как тип ThunkAction, который является обобщенным типом с параметром
//   ReturnType, представляющим тип возвращаемого значения санки. ThunkAction принимает четыре параметра: тип возвращаемого
//   значения, тип корневого состояния, тип дополнительных аргументов (в данном случае unknown), и тип действия (Action<string>).
//   То есть, AppThunk будет иметь тот же тип, что и санка в Redux, принимающая параметры ReturnType, RootState, unknown
//   и Action<string>.
