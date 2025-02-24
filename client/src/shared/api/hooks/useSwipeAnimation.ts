import { useSpring } from '@react-spring/web';

export const useSwipeAnimation = (onSwipeLeft: () => void, onSwipeRight: () => void) => {
  const [props, api] = useSpring(() => ({
    x: 0,
    opacity: 1,
    rotate: 0,
    config: { mass: 1, tension: 200, friction: 20 },
  }));

  const bind = {
    onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => {
      console.log('Swipe started');
      e.preventDefault();
      const startX = e.clientX;

      const onMouseMove = (moveEvent: MouseEvent) => {
        const deltaX = moveEvent.clientX - startX;
        console.log('Moving:', deltaX);
        api.start({ x: deltaX, rotate: deltaX / 10 }); // Плавное движение
      };

      const onMouseUp = (upEvent: MouseEvent) => {
        const deltaX = upEvent.clientX - startX;
        console.log('Swipe ended:', deltaX);
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        if (deltaX > 100) {
          Promise.all(api.start({ x: 500, opacity: 0, rotate: 15 })).then(() => {
            api.set({ x: 0, rotate: 0 });
            api.start({ opacity: 1, rotate: 0 });
            onSwipeRight();
          });
        } else if (deltaX < -100) {
          Promise.all(api.start({ x: -500, opacity: 0, rotate: -15 })).then(() => {
            api.set({ x: 0, rotate: 0 });
            api.start({ opacity: 1, rotate: 0 });
            onSwipeLeft();
          });
        } else {
          void api.start({ x: 0, opacity: 1, rotate: 0 });
        }
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    },
  };

  return { props, api, bind };
};
