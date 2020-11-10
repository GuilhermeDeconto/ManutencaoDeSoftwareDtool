/* eslint-disable no-case-declarations */
/**
 * Aqui fica o estado global da tela de execuções, ou seja,
 * todas as informações que são compartilhadas entre os componentes
 * que participam da execução de atividades.
 */

import { CarouselType, ExecutionStatus } from "../../services/types";

const initialState: CarouselType = {
  selectedCard: undefined,
  selectedCardIndex: 0,
  data: [],
};

export default function execution(action: any, prevState = initialState) {
  switch (action.type) {
    case "ADD_CARD":
      const cards = prevState.data;
      cards.unshift(action.cards[0]);
      return {
        data: cards,
        selectedCard: action.cards[0],
        selectedCardIndex: 0,
      };
    case "UPDATE_ALL_TIMES":
      const dataTime = prevState.data.map((item) => {
        if (item.executionState === ExecutionStatus.Initialized) {
          return { ...item, time: (item?.time || 0) + 1 };
        }
        return item;
      });

      const result = {
        ...prevState,
        data: dataTime,
        selectedCard: dataTime[prevState.selectedCardIndex],
      };

      return result;
    case "REMOVE_CARD":
      const nextCard = prevState.data.length > 0 && action.index === 0 ? 1 : 0;
      return {
        data: prevState.data.filter((item, index) => index !== action.index),
        selectedCard: prevState.data[nextCard],
        selectedCardIndex: 0,
      };
    case "SET_CARD_EXECUTION_STATE":
      const dataExecutionState = prevState.data.map((item, index) => {
        if (index !== action.index) {
          return item;
        }
        return {
          ...item,
          executionState: action.newExecState,
        };
      });

      return {
        data: dataExecutionState,
        selectedCard: dataExecutionState[action.index],
        selectedCardIndex: action.index,
      };
    case "SET_SELECTED_CARD":
      return {
        ...prevState,
        selectedCard: action.card,
        selectedCardIndex: action.index,
      };
    case "UPDATE_FROM_APPSTATE":
      const dataTimeFromAppState = prevState.data.map((item) => {
        if (item.executionState === ExecutionStatus.Initialized) {
          return { ...item, time: (item?.time || 0) + action.seconds };
        }
        return item;
      });

      return {
        ...prevState,
        data: dataTimeFromAppState,
        selectedCard: dataTimeFromAppState[prevState.selectedCardIndex],
      };
    default:
      break;
  }
  return prevState;
}
