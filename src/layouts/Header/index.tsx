import { ChangeEvent, useRef, useState, KeyboardEvent, useEffect } from 'react';
import './style.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AUTH_PATH, BOARD_DETAIL_PATH, BOARD_PATH, BOARD_UPDATE_PATH, BOARD_WRITE_PATH, MAIN_PATH, SEARCH_PATH, USER_PATH, RECIPE_PATH, RECIPE_BOARD_DETAIL_PATH, RECIPE_BOARD_PATH, TRADE_PATH, TRADE_BOARD_PATH, TRADE_BOARD_DETAIL_PATH } from 'constant';
import { useCookies } from 'react-cookie';
import { useBoardStore, useLoginUserStore, useBoardTypeStore } from 'stores';
import { fileUploadRequest, patchBoardRequest, patchRecipeRequest, postBoardRequest, postRecipeRequest, postTradeRequest } from 'apis';
import { PatchBoardRequestDto, PostBoardRequestDto } from 'apis/request/board';
import { PatchBoardResponseDto, PostBoardResponseDto } from 'apis/response/board';
import { ResponseDto } from 'apis/response';
import { PostRecipeResponseDto } from 'apis/response/recipe';
import { PatchTradeResponseDto, PostTradeResponseDto } from 'apis/response/trade';
import { PostTradeRequestDto } from 'apis/request/trade';

//          component: 헤더 레이아웃          //
export default function Header() {

  //          state: 로그인 유저 상태          //
  const { loginUser, setLoginUser, resetLoginUser } = useLoginUserStore();
  //          state: path 상태          //
  const { pathname } = useLocation();
  //          state: cookie 상태          //
  const [cookies, setCookie] = useCookies();
  //          state: 로그인 상태          //
  const [isLogin, setLogin] = useState<boolean>(false);
  //          state: 인증 페이지 상태          //
  const [isAuthPage, setAuthPage] = useState<boolean>(false);
  //          state: 메인 페이지 상태          //
  const [isMainPage, setMainPage] = useState<boolean>(false);
  //          state: 레시피 페이지 상태          //
  const [isRecipePage, setRecipePage] = useState<boolean>(false);
  //          state: 중고거래 페이지 상태          //
  const [isTradePage, setTradepage] = useState<boolean>(false);
  //          state: 검색 페이지 상태          //
  const [isSearchPage, setSearchPage] = useState<boolean>(false);
  //          state: 게시물 상세 페이지 상태          //
  const [isBoardDetailPage, setBoardDetailPage] = useState<boolean>(false);
  //          state: 게시물 작성 페이지 상태          //
  const [isBoardWritePage, setBoardWritePage] = useState<boolean>(false);
  //          state: 게시물 수정 페이지 상태          //
  const [isBoardUpdatePage, setBoardUpdatePage] = useState<boolean>(false);
  //          state: 유저 페이지 상태          //
  const [isUserPage, setUserPage] = useState<boolean>(false);

  //          function: 네비게이트 함수          //
  const navigate = useNavigate();

  //          event Handler: 로고 클릭 이벤트 처리 함수          //
  const onLogoClickHandler = () => {
    navigate(MAIN_PATH());
  }

  //          component: 검색 버튼 컴포넌트          //
  const SearchButton = () => {

    //          state: 검색 버튼 요소 참조 상태          //
    const searchButtonRef = useRef<HTMLDivElement | null>(null);
    //          state: 검색 버튼 상태          //
    const [status, setStatus] = useState<boolean>(false);
    //          state: 검색어 상태          //
    const [word, setWord] = useState<string>('');
    //          state: 검색어 path variable 상태          //
    const { searchWord } = useParams();

    //          event handler: 검색어 변경 이벤트 처리 함수          //
    const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setWord(value);
    };
    //          event handler: 검색어 키 이벤트 처리 함수          //
    const onSearchWordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;
      if (!searchButtonRef.current) return;
      searchButtonRef.current.click();
    };
    //          event handler: 검색 버튼 클림 이벤트 처리 함수          //
    const onSearchbuttonClickHandler = () => {
      if (!status) {
        setStatus(!status);
        return;
      }
      navigate(SEARCH_PATH(word));
    };

    //          effect: 검색어 path variable 변경 될 때마다 실행될 함수          //
    useEffect(() => {
      if (searchWord) {
        setWord(searchWord);
        setStatus(true);
      }
    }, [searchWord])

    if (!status)
      //          render: 검색 버튼 컴포넌트 렌더링 (클릭 false 상태)          //
      return (
        <div className='search-icon-button' onClick={onSearchbuttonClickHandler}>
          <div className='icon search-light-icon'></div>
        </div>);
    //          render: 검색 버튼 컴포넌트 렌더링 (클릭 true 상태)          //
    return (
      <div className='header-search-input-box'>
        <input className='header-search-input' type='text' placeholder='검색어를 입력해주세요.' value={word} onChange={onSearchWordChangeHandler} onKeyDown={onSearchWordKeyDownHandler} />
        <div ref={searchButtonRef} className='icon-button' onClick={onSearchbuttonClickHandler}>
          <div className='icon search-light-icon'></div>
        </div>
      </div>
    )
  };

  //          component: 마이페이지 버튼 컴포넌트          //
  const MyPageButton = () => {

    //     state: userEmail path variable 상태          //
    const { userEmail } = useParams();

    //          event handler: 마이페이지 버튼 클릭 이벤트 처리 함수          //
    const onMyPageButtonClickHandler = () => {
      if (!loginUser) return;
      const { email } = loginUser;
      navigate(USER_PATH(email));
    };
    //          event handler: 로그아웃 버튼 클릭 이벤트 처리 함수          //
    const onSignOutbuttonClickHandler = () => {
      resetLoginUser();
      setCookie('accessToken', '', { path: MAIN_PATH(), expires: new Date() });
      navigate(MAIN_PATH());
    };
    //          event handler: 로그인 버튼 클릭 이벤트 처리 함수          //
    const onSignInButtonClickHandler = () => {
      navigate(AUTH_PATH());
    };

    //          render: 로그아웃 버튼 컴포넌트 렌더링          //
    if (isLogin && userEmail === loginUser?.email)
      return <div className='white-button' onClick={onSignOutbuttonClickHandler}>{'로그아웃'}</div>;
    if (isLogin)
      //          render: 마이페이지 버튼 컴포넌트 렌더링          //
      return <div className='white-button' onClick={onMyPageButtonClickHandler}>{'마이페이지'}</div>;
    //          render: 로그인 버튼 컴포넌트 렌더링          //
    return <div className='black-button' onClick={onSignInButtonClickHandler}>{'로그인'}</div>;
  };
  //          component: 업로드 버튼 컴포넌트          //
  const UploadButton = () => {

    //          state: 게시물 번호 path variable 상태          //
    const { boardNumber } = useParams();
    //          state: 게시물 상태          //
    const { title, content, boardImageFileList, price, tradeLocation, resetBoard } = useBoardStore();
    const { boardType } = useBoardTypeStore();
    //          function: post board response 처리 함수          //
    const postBoardResponse = (responseBody: PostBoardResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'DBE') alert('데이터 베이스 오류입니다.');
      if (code === 'AF' || code === 'NU') navigate(AUTH_PATH());
      if (code === 'VF') alert('제목과 내용은 필수입니다.');
      if (code !== 'SU') return;

      resetBoard();
      if (!loginUser) return;
      const { email } = loginUser;
      navigate(USER_PATH(email));
    }

    //          function: patch Board Response 처리 함수          //
    const patchBoardResponse = (responseBody: PatchBoardResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'DBE') alert('데이터 베이스 오류입니다.');
      if (code === 'AF' || code === 'NU' || code === 'NB' || code === 'NP') navigate(AUTH_PATH());
      if (code === 'VF') alert('제목과 내용은 필수입니다.');
      if (code !== 'SU') return;

      if (!boardNumber) return;
      navigate(BOARD_PATH() + '/' + BOARD_DETAIL_PATH(boardNumber));

    }
    //          function: post Recipe Board Response 처리 함수          //
    const postRecipeBoardResponse = (responseBody: PostRecipeResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'DBE') alert('데이터 베이스 오류입니다.');
      if (code === 'AF' || code === 'NU') navigate(AUTH_PATH());
      if (code === 'VF') alert('제목과 내용은 필수입니다.');
      if (code !== 'SU') return;

      resetBoard();
      if (!loginUser) return;
      const { email } = loginUser;
      navigate(USER_PATH(email));
    }

    //          function: patch Recipe Board Response 처리 함수          //
    const patchRecipeBoardResponse = (responseBody: PatchBoardResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'DBE') alert('데이터 베이스 오류입니다.');
      if (code === 'AF' || code === 'NU' || code === 'NB' || code === 'NP') navigate(AUTH_PATH());
      if (code === 'VF') alert('제목과 내용은 필수입니다.');
      if (code !== 'SU') return;

      if (!boardNumber) return;
      navigate(RECIPE_BOARD_PATH + '/' + RECIPE_BOARD_DETAIL_PATH(boardNumber));
    }

    //          function: post Trade Board Response 처리 함수          //
    const postTradeBoardResponse = (responseBody: PostTradeResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'DBE') alert('데이터 베이스 오류입니다.');
      if (code === 'AF' || code === 'NU') navigate(AUTH_PATH());
      if (code === 'VF') alert('제목과 내용은 필수입니다.');
      if (code !== 'SU') return;

      resetBoard();
      if (!loginUser) return;
      const { email } = loginUser;
      navigate(USER_PATH(email));
    }

    //          function: patch Trade Board Response 처리 함수          //
    const patchTradeBoardResponse = (responseBody: PatchTradeResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'DBE') alert('데이터 베이스 오류입니다.');
      if (code === 'AF' || code === 'NU' || code === 'NB' || code === 'NP') navigate(AUTH_PATH());
      if (code === 'VF') alert('제목과 내용은 필수입니다.');
      if (code !== 'SU') return;

      if (!boardNumber) return;
      navigate(TRADE_BOARD_PATH + '/' + TRADE_BOARD_DETAIL_PATH(boardNumber));
    }


    //          event handler: 업로드 버튼 클릭 이벤트 처리 함수          //
    const onUploadButtonClickHandler = async () => {
      const accessToken = cookies.accessToken;
      if (!accessToken) return;

      const boardImageList: string[] = [];

      for (const file of boardImageFileList) {
        const data = new FormData();
        data.append('file', file);

        const url = await fileUploadRequest(data);
        if (url) boardImageList.push(url);
      }

      const isWriterPage = pathname === BOARD_PATH() + '/' + BOARD_WRITE_PATH();
      if (isWriterPage) {
        if (boardType === 'recipe' || boardType === 'community') {
          const requestBody: PostBoardRequestDto = {
            title, content, boardImageList, boardType
          };
          if (boardType === 'recipe') {
            // 레시피 게시판에 업로드
            postRecipeRequest(requestBody, accessToken).then(postRecipeBoardResponse);
          } else if (boardType === 'community') {
            // 커뮤니티 게시판에 업로드
            postBoardRequest(requestBody, accessToken).then(postBoardResponse);
          }
        }else if (boardType === 'trade')
        {
          const requestBody: PostTradeRequestDto = {
            title, content, boardImageList, boardType, price, tradeLocation
          };
            postTradeRequest(requestBody, accessToken).then(postTradeBoardResponse);
          }
      } else {
        if (!boardNumber) return;
        const requestBody: PatchBoardRequestDto = {
          title, content, boardImageList, boardType
        };
        if (boardType === 'recipe') {
          // 레시피 게시판 수정
          patchRecipeRequest(boardNumber, requestBody, accessToken).then(patchRecipeBoardResponse);
        } else if (boardType === 'community') {
          // 커뮤니티 게시판 수정
          patchBoardRequest(boardNumber, requestBody, accessToken).then(patchBoardResponse);
        }
      }

    }

    //          render: 업로드 버튼 컴포넌트 렌더링          //
    if (title && content)
      return <div className='black-button' onClick={onUploadButtonClickHandler}>{'업로드'}</div>;
    //          render: 업로드 불가 버튼 컴포넌트 렌더링          //
    return <div className='disable-button'>{'업로드'}</div>;
  }


  //          effect: path가 변경될 때 마다 실행될 함수          //
  useEffect(() => {
    const isAuthPage = pathname.startsWith(AUTH_PATH());
    setAuthPage(isAuthPage);
    const isMainPage = pathname === MAIN_PATH();
    setMainPage(isMainPage);
    const isRecipePage = pathname.startsWith(RECIPE_PATH());
    setRecipePage(isRecipePage);
    const isTradePage = pathname.startsWith(TRADE_PATH());
    setTradepage(isTradePage);
    const isSearchPage = pathname.startsWith(SEARCH_PATH(''));
    setSearchPage(isSearchPage);
    const isBoardDetailPage = pathname.startsWith(BOARD_PATH() + '/' + BOARD_DETAIL_PATH(''));
    setBoardDetailPage(isBoardDetailPage);
    const isBoardWritePage = pathname.startsWith(BOARD_PATH() + '/' + BOARD_WRITE_PATH());
    setBoardWritePage(isBoardWritePage);
    const isBoardUpdatePage = pathname.startsWith(BOARD_PATH() + '/' + BOARD_UPDATE_PATH(''));
    setBoardUpdatePage(isBoardUpdatePage);
    const isUserPage = pathname.startsWith(USER_PATH(''));
    setUserPage(isUserPage);

  }, [pathname]);

  //          effect: login user가 변경될 때 마다 실행될 함수          //
  useEffect(() => {
    setLogin(loginUser !== null);
  }, [loginUser])

  //          render: 헤더 레이아웃 렌더링          //
  return (
    <div id='header'>
      <div className='header-container'>
        <div className='header-left-box' onClick={onLogoClickHandler}>
          <div className='icon-box'>
            <div className='icon logo-house-icon'></div>
          </div>
          <div className='header-logo'>{'How?se'}</div>
        </div>
        <div className='header-right-box'>
          {(isAuthPage || isMainPage || isSearchPage || isBoardDetailPage || isRecipePage || isTradePage) && <SearchButton />}
          {(isMainPage || isRecipePage || isSearchPage || isTradePage || isBoardDetailPage || isUserPage) && <MyPageButton />}
          {(isBoardWritePage || isBoardUpdatePage) && <UploadButton />}

        </div>
      </div>
    </div>
  )
}
