import React from 'react'
import './style.css';
import { CommentListItem } from 'types/interface';
import defaultProfileImage from 'assets/image/default-profile-image.png';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
interface Props {
    commentListItem: CommentListItem;
}

//          component: Comment List Item 컴포넌트          //
export default function CommentItem({ commentListItem }: Props) {

    //          state: properties         //
    const { nickname, profileImage, writeDatetime, content } = commentListItem;

    //          function: 작성일 경과시간 함수          //
    const getElapsedTime = () => {
        const now = dayjs().tz('Asia/Seoul');  // 현재 시간을 한국 시간으로 계산
        const writeTime = dayjs(writeDatetime).tz('Asia/Seoul');  // 작성 시간을 한국 시간으로 변환
        
        const gap = now.diff(writeTime, 's');  // 초 단위 차이 계산
        if (gap < 60) return `${gap}초 전`;
        if (gap < 3600) return `${Math.floor(gap / 60)}분 전`;
        if (gap < 86400) return `${Math.floor(gap / 3600)}시간 전`;
        return `${Math.floor(gap / 86400)}일 전`;
    }

    //          render: Comment List Item 렌더링         //
    return (
        <div className='comment-list-item'>
            <div className='comment-list-item-top'>
                <div className='comment-list-item-profile-box'>
                    <div className='comment-list-item-profile-image' style={{ backgroundImage: `url(${profileImage ? profileImage : defaultProfileImage})` }}></div>
                </div>
                <div className='comment-list-item-nickname'>{nickname}</div>
                <div className='comment-list-item-divider'>{'\|'}</div>
                <div className='comment-list-item-time'>{getElapsedTime()}</div>
            </div>
            <div className='comment-list-item-main'>
                <div className='comment-list-item-content'>{content}</div>
            </div>
            <div></div>
        </div>
    )
}
