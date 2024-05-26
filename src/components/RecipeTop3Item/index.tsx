import React from 'react'
import './style.css';
import defaultProfileImage from 'assets/image/default-profile-image.png';
import { RecipeListItem } from 'types/interface';
import { useNavigate } from 'react-router-dom';
import { RECIPE_BOARD_DETAIL_PATH, RECIPE_BOARD_PATH, RECIPE_PATH } from 'constant';

interface Props{
    recipetop3ListItem : RecipeListItem
}

//          Component: Recipe Top 3 List Item 컴포넌트          //
export default function RecipeTop3Item({recipetop3ListItem}: Props) {

     //          properties          //
     const { boardNumber, title, content, boardTitleImage } = recipetop3ListItem;
     const { favoriteCount, commentCount, viewCount } = recipetop3ListItem;
     const { writeDatetime, writerNickname, writerProfileImage } = recipetop3ListItem;

    //          function : navigate 함수          //
    const navigate = useNavigate();
    
    //          event Handler: 게시물 아이템 클릭 이벤트 처리 함수          //
    const onClickHandler = () => {
        navigate(RECIPE_BOARD_PATH + '/' + RECIPE_BOARD_DETAIL_PATH(boardNumber));
    }

    //          render: Top 3 List Item 컴포넌트 렌더링          //
  return (
    <div className='recipe-top-3-list-item' style={{backgroundImage:`url(${boardTitleImage})`}} onClick={onClickHandler}>
        <div className='recipe-top-3-list-item-main-box'>
            <div className='recipe-top-3-list-item-top'>
                <div className='recipe-top-3-list-item-profile-box'>
                    <div className='recipe-top-3-list-item-profile-image' style={{backgroundImage: `url(${writerProfileImage ? writerProfileImage : defaultProfileImage})`}}></div>
                </div>
                <div className='recipe-top-3-list-item-write-box'>
                    <div className='recipe-top-3-list-item-nickname'>{writerNickname}</div>
                    <div className='recipe-top-3-list-item-write-date'>{writeDatetime}</div>
                </div>
            </div>
            <div className='recipe-top-3-list-item-middle'>
                <div className='recipe-top-3-list-item-title'>{title}</div>
                <div className='recipe-top-3-list-item-content'>{content}</div>
            </div>
            <div className='recipe-top-3-list-item-bottom'>
                <div className='recipe-top-3-list-item-counts'>
                    {`댓글 ${commentCount} ∙ 좋아요 ${favoriteCount} ∙ 조회수 ${viewCount}`}
                </div>
            </div>
        </div>

    </div>
  )
}
