import React from 'react'
import './style.css';
import defaultProfileImage from 'assets/image/default-profile-image.png';
import { BoardListItem } from 'types/interface';
import { useNavigate } from 'react-router-dom';
import { BOARD_DETAIL_PATH, BOARD_PATH } from 'constant';
import grayimage from 'assets/image/gray-image.png';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// Day.js에 플러그인 추가
dayjs.extend(utc);
dayjs.extend(timezone);
interface Props {
    top3ListItem: BoardListItem
}

//          Component: Top 3 List Item 컴포넌트          //
export default function Top3Item({ top3ListItem }: Props) {

    //          properties          //
    const { boardNumber, title, content, boardTitleImage } = top3ListItem;
    const { favoriteCount, commentCount, viewCount } = top3ListItem;
    const { writeDatetime, writerNickname, writerProfileImage } = top3ListItem;

    //          function : navigate 함수          //
    const navigate = useNavigate();

    //          event Handler: 게시물 아이템 클릭 이벤트 처리 함수          //
    const onClickHandler = () => {
        navigate(BOARD_PATH() + '/' + BOARD_DETAIL_PATH(boardNumber));
    }
    const formattedWriteDatetime = dayjs(writeDatetime).tz('Asia/Seoul').format('YYYY-MM-DD HH:mm');
    //          render: Top 3 List Item 컴포넌트 렌더링          //
    return (
        <div>
            <div className='top-3-list-item' onClick={onClickHandler}>
                <div className='top-3-list-item-image-box'>
                    {boardTitleImage ? (
                        <img className='top-3-list-item-image' src={`${boardTitleImage}`} alt={'none-image'} />
                    ) :
                        (
                            <div className='top-3-list-item-none-image' style={{ backgroundImage: `url(${grayimage})` }}>
                                <div className='top-3-list-item-none-image-description'>{'이미지가 등록되지 않은 게시물입니다.'}</div>
                            </div>
                        )}
                </div>
                <div className='top-3-list-item-main-box'>
                    <div className='top-3-list-item-top'>
                        <div className='top-3-list-item-profile-box'>
                            <div className='top-3-list-item-profile-image' style={{ backgroundImage: `url(${writerProfileImage ? writerProfileImage : defaultProfileImage})` }}></div>
                        </div>
                        <div className='top-3-list-item-write-box'>
                            <div className='top-3-list-item-nickname'>{writerNickname}</div>
                            <div className='top-3-list-item-write-date'>{formattedWriteDatetime}</div>
                        </div>
                    </div>
                    <div className='top-3-list-item-info'>
                        <div className='top-3-list-item-title'>{title}</div>
                        <div className='top-3-list-item-content'>{content}</div>
                    </div>
                    <div className='top-3-list-item-bottom'>
                        <div className='top-3-list-item-counts'>
                            {`댓글 ${commentCount} ∙ 좋아요 ${favoriteCount} ∙ 조회수 ${viewCount}`}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
