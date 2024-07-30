import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { MAIN_PATH } from 'constant';

export default function Onboard() {
  const navigate = useNavigate();
  const cursorRef = useRef<HTMLDivElement>(null);
  const [clicked, setClicked] = useState(false);
  const [currentImage, setCurrentImage] = useState<'living-room' | 'kitchen' | 'tradeimage' | 'groupbuy'>('living-room');

  const onStartButtonClickHandler = () => {
    navigate(MAIN_PATH());
  }

  const onIconAndTitleClickHandler = () => {
    setClicked(!clicked);
  }
  const imageSequence: Array<'living-room' | 'kitchen' | 'tradeimage' | 'groupbuy'> = ['living-room', 'kitchen', 'tradeimage', 'groupbuy'];

  const textConfig: { [key in 'living-room' | 'kitchen' | 'tradeimage' | 'groupbuy']: { top: string; bottom: string } } = {
    'living-room': { top: '요모조모', bottom: '다양한 팁을 나눠요' },
    'kitchen': { top: '레시피', bottom: '서로의 레시피를 공유해요' },
    'tradeimage': { top: '중고거래', bottom: '내 주변 자취러들과 함께해요' },
    'groupbuy': { top: '공동구매', bottom: '내 주변 자취러들과 함께해요' }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((prevImage) => {
        const currentIndex = imageSequence.indexOf(prevImage);
        const nextIndex = (currentIndex + 1) % imageSequence.length;
        return imageSequence[nextIndex];
      });
    }, 2300); // 2초마다 이미지 전환

    return () => clearInterval(intervalId);
  }, []);
  //          effect: 이미지 이펙트          //
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setCurrentImage(prevImage => {
  //       const currentIndex = imageSequence.indexOf(prevImage);
  //       const nextIndex = (currentIndex + 1) % imageSequence.length;
  //       return imageSequence[nextIndex];
  //     });
  //   }, 2000); // 2초마다 이미지 전환

  //   return () => clearInterval(intervalId);
  // }, []);

  useEffect(() => {
    const cursor = cursorRef.current;

    const moveCursor = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      if (cursor) {
        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;
      }
    };

    const showCursor = () => {
      if (cursor) {
        cursor.style.visibility = 'visible';
      }
    };

    const hideCursor = () => {
      if (cursor) {
        cursor.style.visibility = 'hidden';
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseout', hideCursor);
    document.addEventListener('mouseover', showCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseout', hideCursor);
      document.removeEventListener('mouseover', showCursor);
    };
  }, []);

  return (
    <div id="onboarding-wrapper" className={`bg-${currentImage}`}>
      <div className='onboarding-container'>
        <div className={`onboarding-left-box ${clicked ? 'clicked' : ''}`}>
          <div className='onboarding-left-title'>
            <div className='icon-and-title' onClick={onIconAndTitleClickHandler}>
              <div className='icon-box-huge'>
                <div className='icons'></div>
              </div>
              <div className='onboarding-logo-title'>{'How?se'}</div>
            </div>
            <div className='intro'>{'What is How?se\n\nHowSe는 자취생들을 위한 \n 종합 플랫폼입니다.'}</div>
          </div>
        </div>

        <div className={`onboarding-image-box ${currentImage}`}>
          <div className={`onboarding-image ${currentImage === 'living-room' ? 'fade-in' : 'fade-out'}`} id="living-room-image"></div>
          <div className={`onboarding-image ${currentImage === 'kitchen' ? 'fade-in' : 'fade-out'}`} id="kitchen-image"></div>
          <div className={`onboarding-image ${currentImage === 'tradeimage' ? 'fade-in' : 'fade-out'}`} id="trade-image"></div>
          <div className={`onboarding-image ${currentImage === 'groupbuy' ? 'fade-in' : 'fade-out'}`} id="groupbuy-image"></div>
          <div className='on-image-top-text'>{textConfig[currentImage].top}</div>
          <div className='on-image-bottom-text'>{textConfig[currentImage].bottom}</div>
        </div>

        <div className='onboarding-right-box'>
          <div className='onboarding-start-button' onClick={onStartButtonClickHandler}>{'Start'}</div>
        </div>
      </div>
      <div className='cursor' ref={cursorRef}></div>
    </div>
  );
}
