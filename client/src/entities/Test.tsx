import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import styles from './Test.module.scss';

export default function Test(): React.JSX.Element {
  const [isSwiped, setIsSwiped] = useState(false); // Состояние для отслеживания свайпа

  const [swipeProps, swipeApi] = useSpring(() => ({
    from: { x: 0, opacity: 1 },
    config: { mass: 1, tension: 200, friction: 20 },
  }));

  const handleSwipeStart = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const startX = e.clientX;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      void swipeApi.start({ x: deltaX, immediate: true });
    };

    const onMouseUp = (upEvent: MouseEvent) => {
      const deltaX = upEvent.clientX - startX;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (Math.abs(deltaX) > 100) {
        // Исчезновение старого квадрата
        Promise.all(
          swipeApi.start({
            x: deltaX > 0 ? 300 : -300,
            opacity: 0,
          }),
        ).then(() => {
          // Сброс позиции и смена состояния
          swipeApi.set({ x: 0 }); // Сразу устанавливаем x: 0
          setIsSwiped(true); // Переключаем на новый квадрат
          swipeApi.start({ opacity: 1 }); // Плавное появление
        });
      } else {
        void swipeApi.start({ x: 0, opacity: 1 });
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div className={styles.container}>
      <h1>Тест свайпа с исчезновением</h1>
      {!isSwiped ? (
        <animated.div
          className={styles.swipeBox}
          style={{
            transform: swipeProps.x.to((x) => `translateX(${x}px)`),
            opacity: swipeProps.opacity,
          }}
          onMouseDown={handleSwipeStart}
        >
          Перетащи меня
        </animated.div>
      ) : (
        <animated.div
          className={styles.swipeBox}
          style={{
            transform: swipeProps.x.to((x) => `translateX(${x}px)`),
            opacity: swipeProps.opacity,
          }}
          onMouseDown={handleSwipeStart}
        >
          Новый квадрат
        </animated.div>
      )}
    </div>
  );
}
