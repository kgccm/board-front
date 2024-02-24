import React from 'react'
import './style.css';

//          Component: Top 3 List Item 컴포넌트          //
export default function Top3Item() {
// ∙
    //          render: Top 3 List Item 컴포넌트 렌더링          //
  return (
    <div className='top-3-list-item'>
        <div className='top-3-list-item-main-box'>
            <div className='top-3-list-item-top'>
                <div className='top-3-list-item-profile-box'>
                    <div className='top-3-list-item-profile-image' style={{backgroundImage: `url()`}}></div>
                </div>
                <div className='top-3-list-item-write-box'>
                    <div className='top-3-list-item-nickname'>{'나는 개보지'}</div>
                    <div className='top-3-list-item-write-date'>{'2024. 02. 25'}</div>
                </div>
            </div>
            <div className='top-3-list-item-middle'>
                <div className='top-3-list-item-title'>{'노무현노무현노무현노무현노무현노무현노무현노무현노무현노무현노무현노무현노무현노무현노무현노무현...'}</div>
                <div className='top-3-list-item-content'>{'노무현노무현노무현노무현노무현노무현노무현노무현노무현노무현노무현노무현노무현노무현노무현...'}</div>
            </div>
            <div className='top-3-list-item-bottom'>
                <div className='top-3-list-item-counts'>
                    {`댓글 0 ∙ 좋아요 0 ∙ 조회수 0`}
                </div>
            </div>
        </div>

    </div>
  )
}
