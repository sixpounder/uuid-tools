import { isFunction, isNumber } from "lodash-es";
import { useEffect, useState } from "react";

type DelayableFunc = () => void;

const noop: DelayableFunc = () => {};

export function useDelay<F extends DelayableFunc>(
    tailFunction: F,
): DelayableFunc;
export function useDelay<F extends DelayableFunc>(
    tailFunction: F,
    wait: number,
): DelayableFunc;
export function useDelay<F extends DelayableFunc>(
  tailFunction: F,
  headFunction: F | number,
  wait: number
): DelayableFunc;
export function useDelay<F extends DelayableFunc>(
  tailFunction: F,
  headFunction: F | number = noop as F,
  wait: number = 0,
): DelayableFunc {
  const [delayTimeout, setDelayTimeout] = useState<number | undefined>();
  const hf = isFunction(headFunction) ? headFunction : noop;
  const waitMs = isNumber(headFunction) ? headFunction : wait;

  const delayed = () => {
    hf();

    if (delayTimeout) {
      clearTimeout(delayTimeout);
    }

    setDelayTimeout(setTimeout(tailFunction, waitMs));
  };

  useEffect(() => {
    return () => {
      if (delayTimeout) {
        clearTimeout(delayTimeout);
      }
    };
  }, [delayTimeout]);

  return delayed;
}
