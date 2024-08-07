import React from 'react'
import './style.css';
import defaultProfileImage from 'assets/image/default-profile-image.png';
import { RecipeListItem } from 'types/interface';
import { useNavigate } from 'react-router-dom';
import grayimage from 'assets/image/gray-image.png';

interface Props {
    generalrecipetop5List: RecipeListItem
}

//          Component: Recipe Top 3 List Item 컴포넌트          //
export default function GeneralRecipeTop5Item({ generalrecipetop5List }: Props) {

    //          properties          //
    const { boardNumber, title, content, boardTitleImage } = generalrecipetop5List;
    const { favoriteCount, commentCount, viewCount } = generalrecipetop5List;
    const { writeDatetime, writerNickname, writerProfileImage } = generalrecipetop5List;

    //          function : navigate 함수          //
    const navigate = useNavigate();

    //          event Handler: 게시물 아이템 클릭 이벤트 처리 함수          //
    const onClickHandler = () => {
        // navigate(RECIPE_PATH() + RECIPE_BOARD_PATH() + '/' + RECIPE_BOARD_DETAIL_PATH(boardNumber));
        // navigate(`/recipe/recipe-board/detail/${recipetop3ListItem.boardNumber}`);
        navigate(`/recipe/recipe-board/detail/${boardNumber}`);
    }

    //          render: Top 3 List Item 컴포넌트 렌더링          //
    return (
        <div>
            <div className='recipe-top-3-list-item' onClick={onClickHandler}>
                <div className='recipe-top-3-list-item-image-box'>
                    {boardTitleImage ? (
                        <img className='recipe-top-3-list-item-image' src={`${boardTitleImage}`} alt={'none-image'} />
                    ) :
                        (
                            <div className='recipe-top-3-list-item-none-image' style={{ backgroundImage: `url(${grayimage})` }}>
                                <div className='recipe-top-3-list-item-none-image-description'>{'이미지가 등록되지 않은 게시물입니다.'}</div>
                            </div>
                        )}
                </div>
                <div className='recipe-top-3-list-item-main-box'>
                    <div className='recipe-top-3-list-item-top'>
                        <div className='recipe-top-3-list-item-profile-box'>
                            <div className='recipe-top-3-list-item-profile-image' style={{ backgroundImage: `url(${writerProfileImage ? writerProfileImage : defaultProfileImage})` }}></div>
                        </div>
                        <div className='recipe-top-3-list-item-write-box'>
                            <div className='recipe-top-3-list-item-nickname'>{writerNickname}</div>
                            <div className='recipe-top-3-list-item-write-date'>{writeDatetime}</div>
                        </div>
                    </div>
                    <div className='recipe-top-3-list-item-info'>
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
        </div>
    )
}
