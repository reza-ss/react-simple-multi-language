import { LanguageContextType } from "./types";

const createStore = <TState extends unknown>(initialState: TState) => {
  type Listener = (state: TState, prevState: TState) => void;
  let state: TState = initialState;
  const listeners: Set<Listener> = new Set();

  const setState = (partial: TState) => {
    const nextState =
      typeof partial === "function"
        ? (partial as (state: TState) => TState)(state)
        : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };

  const getState = (): TState => state;

  const subscribe = (listener: Listener) => {
    listeners.add(listener);

    return () => listeners.delete(listener);
  };

  return { setState, getState, subscribe };
};

export const languageStore = createStore<{
  currentLanguage: string;
  translations: LanguageContextType;
}>({ translations: {}, currentLanguage: "" });
