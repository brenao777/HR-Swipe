import { useSpring } from 'react-spring';

export const useSwipeAnimation = (onSwipeLeft: () => void, onSwipeRight: () => void) => {
  const [props, api] = useSpring(() => ({
    x: 0,
    rotate: 0,
    config: { mass: 1, tension: 200, friction: 30 },
  }));

  const bind = {
    onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      const startX = e.clientX;

      const onMouseMove = (moveEvent: MouseEvent) => {
        const deltaX = moveEvent.clientX - startX;
        void api.start({ x: deltaX, rotate: deltaX / 10 }); // Используем void для промежуточных анимаций
      };

      const onMouseUp = async (upEvent: MouseEvent) => {
        const deltaX = upEvent.clientX - startX;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        if (deltaX > 100) {
          // Ждём завершения анимации перед вызовом onSwipeRight
          await Promise.all(
            api.start({
              x: 500,
              rotate: 15,
            }),
          );
          onSwipeRight();
        } else if (deltaX < -100) {
          // Ждём завершения анимации перед вызовом onSwipeLeft
          await Promise.all(
            api.start({
              x: -500,
              rotate: -15,
            }),
          );
          onSwipeLeft();
        } else {
          void api.start({ x: 0, rotate: 0 }); // Возврат в центр, результат не важен
        }
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    },
  };

  return { props, bind };
};
