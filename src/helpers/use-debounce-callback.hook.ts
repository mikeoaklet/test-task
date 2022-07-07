import { useCallback } from 'react';

export const useDebounceCallback = (
  callback: Function,
  dependencies: any[],
  timeout: number,
) => {
  let timer: ReturnType<typeof setTimeout>;
  return useCallback((...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), timeout);
  }, dependencies);
};
