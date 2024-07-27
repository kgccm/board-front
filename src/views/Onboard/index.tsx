import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { MAIN_PATH } from 'constant';

export default function Onboard() {
  const navigate = useNavigate();
  const cursorRef = useRef<HTMLDivElement>(null);
  const [clicked, setClicked] = useState(false);

  const onStartButtonClickHandler = () => {
    navigate(MAIN_PATH());
  }

  const onIconAndTitleClickHandler = () => {
    setClicked(!clicked);
  }

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
    <div id="onboarding-wrapper">
      <div className='onboarding-container'>
        <div className={`onboarding-left-box ${clicked ? 'clicked' : ''}`}>
          <div className='onboarding-left-title'>
            <div className='icon-and-title' onClick={onIconAndTitleClickHandler}>
              <div className='icon-box-huge'>
                <div className='icons'></div>
              </div>
              <div className='onboarding-logo-title'>{'How?se'}</div>
            </div>
              <div className='intro'>{'How?se는 자취생들을 \n 위한 종합 클로스 플랫폼'}</div>
          </div>
        </div>

        <div className='onboarding-image-box'>
          <div className='on-image-text'>{'Image Top Text'}</div>
        </div>

        <div className='onboarding-right-box'>
          <div className='onboarding-start-button' onClick={onStartButtonClickHandler}>{'Start'}</div>
        </div>
      </div>
      <div className='cursor' ref={cursorRef}></div>
    </div>
  );
}
