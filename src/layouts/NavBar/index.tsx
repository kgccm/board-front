import React from 'react';
import './style.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { MAIN_PATH, RECIPE_PATH, TRADE_PATH } from 'constant';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 경로가 요모조모, 레시피 페이지인지 확인
  const isCommunityPage = location.pathname === MAIN_PATH();
  const isRecipePage = location.pathname === RECIPE_PATH();
  const isTradePage = location.pathname === TRADE_PATH();

  const handleCommunityClick = () => {
    navigate(MAIN_PATH());
  };

  const handleRecipeClick = () => {
    navigate(RECIPE_PATH());
  };
  const handleTradeClick = () => {
    navigate(TRADE_PATH());
  };
  // const handleGroupbuyClick = () => {
  //   navigate(TRADE_PATH());
  // };
  return (
    <div className='navbar-wrapper'>
      <div className='navbar-container'>
        {/* 요모조모 페이지인 경우 클래스 추가 */}
        <div className={`community ${isCommunityPage ? 'active' : ''}`} onClick={handleCommunityClick}>
          {'요모조모'}
        </div>
        {/* 레시피 페이지인 경우 클래스 추가 */}
        <div className={`recipe ${isRecipePage ? 'active' : ''}`} onClick={handleRecipeClick}>{'레시피'}</div>
        <div className={`recipe ${isTradePage ? 'active' : ''}`} onClick={handleTradeClick}>{'중고거래'}</div>
        <div className='group-buy'>{'공동구매'}</div>
      </div>
    </div>
  );
}
