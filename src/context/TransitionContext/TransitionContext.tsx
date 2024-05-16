import { ReactNode, createContext, useMemo, useState } from "react";

const TransitionContext = createContext<{
  completed: boolean;
  toggleCompleted?: (value: any) => void;
}>({
  completed: false,
});

export interface TransitionProviderProps {
  children: ReactNode;
}

export const TransitionProvider = ({ children }: TransitionProviderProps) => {
  const [completed, setCompleted] = useState(false);

  const toggleCompleted = (value: any) => {
    setCompleted(value);
  };

  const value = useMemo(
    () => ({
      toggleCompleted,
      completed,
    }),
    [completed]
  );

  return (
    <TransitionContext.Provider value={value}>
      {children}
    </TransitionContext.Provider>
  );
};

export default TransitionContext;
