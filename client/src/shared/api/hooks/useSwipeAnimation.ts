// useSwipeAnimation.ts
import { useSpring } from '@react-spring/web';

export const useSwipeAnimation = (onSwipeLeft: () => void, onSwipeRight: () => void) => {
  const [props, api] = useSpring(() => ({
    x: 0,
    opacity: 1,
    rotate: 0,
    config: { mass: 1, tension: 200, friction: 20 },
  }));

  const [backgroundStyle, backgroundApi] = useSpring(() => ({
    backgroundColor: 'rgba(0, 0, 0, 0)',
  }));

  const bind = {
    onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      const startX = e.clientX;

      const onMouseMove = (moveEvent: MouseEvent) => {
        const deltaX = moveEvent.clientX - startX;
        api.start({
          x: deltaX,
          rotate: deltaX / 50,
        });

        // Обновляем фон через backgroundApi
        const opacity = Math.min(Math.abs(deltaX) / 200, 0.5);
        backgroundApi.start({
          backgroundColor:
            deltaX < 0 ? `rgba(111, 214, 111, ${opacity})` : `rgba(216, 140, 140, ${opacity})`,
        });
      };

      const onMouseUp = (upEvent: MouseEvent) => {
        const deltaX = upEvent.clientX - startX;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        if (deltaX > 100) {
          Promise.all(api.start({ x: 500, opacity: 0, rotate: 10 }))
            .then(() => {
              api.set({ x: 0, rotate: 0 });
              api.start({ opacity: 1, rotate: 0 });
              backgroundApi.start({ backgroundColor: 'rgba(0, 0, 0, 0)' });
              onSwipeRight();
            })
            .catch((error) => console.error);
        } else if (deltaX < -100) {
          Promise.all(api.start({ x: -500, opacity: 0, rotate: -10 }))
            .then(() => {
              api.set({ x: 0, rotate: 0 });
              api.start({ opacity: 1, rotate: 0 });
              backgroundApi.start({ backgroundColor: 'rgba(0, 0, 0, 0)' });
              onSwipeLeft();
            })
            .catch((error) => console.error);
        } else {
          api.start({ x: 0, opacity: 1, rotate: 0 });
          backgroundApi.start({ backgroundColor: 'rgba(0, 0, 0, 0)' });
        }
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    },
  };

  return { props, api, bind, backgroundStyle, backgroundApi };
};
