import { useReducer } from "react";

// 定义状态类型
interface State {
  [key: string]: any;
}

// 定义动作类型
interface Action {
  type: string;
  payload: { key: string; value: any };
}

// 定义 reducer 函数
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "UPDATE_STATE":
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    default:
      return state;
  }
};

// 自定义 Hook
const useCustomReducer = (
  initialState: State
): [State, (key: string, value: any) => void] => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // 封装 dispatch，使其更方便使用
  const customDispatch = (key: string, value: any) => {
    dispatch({ type: "UPDATE_STATE", payload: { key, value } });
  };

  return [state, customDispatch];
};

export default useCustomReducer;
