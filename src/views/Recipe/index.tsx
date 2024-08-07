import React, { useEffect, useState } from 'react';
import './style.css';
import RecipeTop3Item from 'components/GeneralRecipeTop5Item';
import { RecipeListItem } from 'types/interface';
import RecipeItem from 'components/RecipeItem';
import Pagination from 'components/Pagination';
import { useNavigate } from 'react-router-dom';
import { SEARCH_PATH } from 'constant';
import { getLatestRecipeListRequest, getTop5ConveinenceRecipeListRequest, getTop5GeneralRecipeListRequest } from 'apis';
import { GetLatestRecipeListResponseDto, GetTop5ConveinenceRecipeListResponseDto, GetTop5GeneralRecipeListResponseDto } from 'apis/response/recipe';
import { ResponseDto } from 'apis/response';
import { usePagination } from 'hooks';
import useRecipeTypeStore from 'stores/recipe-type.store';
import GeneralRecipeTop5Item from 'components/GeneralRecipeTop5Item';
import ConveinenceRecipeTop5Item from 'components/ConveinenceRecipeTop5Item';
//          component: 레시피 화면 컴포넌트          //
export default function Recipe() {

  //          function: 내비게이트 함수          //
  const navigate = useNavigate();

  //          component: 메인 화면 상단 컴포넌트          //
  const RecipeTop = () => {

    //          state: 주간 Top3 레시피 리스트 상태          //
    const [generalTop5recipeList, setGeneralTop5recipeList] = useState<RecipeListItem[]>([]);
    const [conveinenceTop5recipeList, setConveinenceTop5recipeList] = useState<RecipeListItem[]>([]);
    //          function: get Top5 General recipe List Response 처리 함수          //
    const getTop5GeneralRecipeListResponse = (responseBody: GetTop5GeneralRecipeListResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;

      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;

      const { generalrecipetop5List } = responseBody as GetTop5GeneralRecipeListResponseDto;
      console.log(generalrecipetop5List)
      setGeneralTop5recipeList(generalrecipetop5List);
    }

    //          function: get Top5 General recipe List Response 처리 함수          //
    const getTop5ConveinenceRecipeListResponse = (responseBody: GetTop5ConveinenceRecipeListResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;

      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;

      const { conveniencerecipetop5List } = responseBody as GetTop5ConveinenceRecipeListResponseDto;
      console.log(conveniencerecipetop5List)
      setConveinenceTop5recipeList(conveniencerecipetop5List);
    }

    //          effect: 첫 마운트 시 실행될 함수          //
    useEffect(() => {
      getTop5GeneralRecipeListRequest(0).then(getTop5GeneralRecipeListResponse);
      getTop5ConveinenceRecipeListRequest(1).then(getTop5ConveinenceRecipeListResponse)
    }, []);



    //          render: 메인 화면 상단 컴포넌트 렌더링          //
    return (
      <div id='recipe-top-wrapper'>
        <div className='recipe-top-container'>
          <div className='recipe-top-title'>
            {'🍳나만의 레시피를 \n How?Se에서!'}
          </div>
          <div className='recipe-top-content-box'>
            <div className='recipe-top-contents-title'>{'주간 Top 5 레시피📜'}</div>
            <div className='recipe-top-contents'>
              {generalTop5recipeList.map(generalrecipetop5List => <GeneralRecipeTop5Item generalrecipetop5List={generalrecipetop5List} />)}
              {conveinenceTop5recipeList.map(conveinencerecipetop5List => <ConveinenceRecipeTop5Item conveinencerecipetop5List={conveinencerecipetop5List} />)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  //          component: 메인 화면 하단 컴포넌트          //
  const RecipeBottom = () => {

    //          state: 페이지네이션 관련 상태          //
    const {
      currentPage, currentSection, viewList, viewPageList, totalSection,
      setCurrentSection, setCurrentPage, setTotalList
    } = usePagination<RecipeListItem>(9);

    //          function : get Latest Board List Response 처리 함수          //
    const getLatestRecipeListResponse = (responseBody: GetLatestRecipeListResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;

      const { recipelatestList } = responseBody as GetLatestRecipeListResponseDto;
      setTotalList(recipelatestList);
    }

    //          effect: 첫 마운트 시 실행될 함수          //
    useEffect(() => {
      getLatestRecipeListRequest(0).then(getLatestRecipeListResponse);
      // getLatestRecipeListRequest(1).then(getLatestRecipeListResponse);
    }, []);

    //          render: 메인 화면 하단 컴포넌트 렌더링          //
    return (
      <div id='recipe-bottom-wrapper'>
        <div className='recipe-bottom-container'>
          <div className='recipe-bottom-title'>{'최신 레시피'}</div>
          <div className='recipe-bottom-contents-box'>
            <div className='recipe-bottom-current-contents'>
              {viewList.map(recipeListItem => <RecipeItem recipeListItem={recipeListItem} />)}

            </div>
          </div>
          <div className='recipe-bottom-pagination-box'>
            <Pagination
              currentPage={currentPage}
              currentSection={currentSection}
              setCurrentPage={setCurrentPage}
              setCurrentSection={setCurrentSection}
              viewPageList={viewPageList}
              totalSection={totalSection} />
          </div>
        </div>
      </div>
    )
  };

  //          render: 메인 화면 컴포넌트 렌더링          //
  return (
    <>
      <RecipeTop />
      <RecipeBottom />
    </>
  );
}
