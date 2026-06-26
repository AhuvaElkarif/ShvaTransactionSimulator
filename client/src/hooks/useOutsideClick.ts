import { useEffect } from 'react';
import type { RefObject } from 'react';

/** Invokes `handler` when a pointer event occurs outside the referenced element. */
export const useOutsideClick = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: () => void,
): void => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (!ref.current || (target && ref.current.contains(target))) {
        return;
      }
      handler();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};
