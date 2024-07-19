// 메인(커뮤니티 페이지)
export const MAIN_PATH = () => '/';
// 레시피 페이지
export const RECIPE_PATH = () => '/recipe';
// 중고거래 페이지
export const TRADE_PATH = () => `/trade`;
//인증 페이지
export const AUTH_PATH = () => '/auth';
//검색
export const SEARCH_PATH = (searchWord: string) => `/search/${searchWord}`;
//마이페이지
export const USER_PATH = (userEmail: string) => `/user/${userEmail}`;
//커뮤니티 게시글 관련
export const BOARD_PATH = () => '/board';
export const BOARD_DETAIL_PATH = (boardNumber: string | number) => `detail/${boardNumber}`;
export const BOARD_WRITE_PATH = () => 'write';
export const BOARD_UPDATE_PATH = (boardNumber: string | number ) => `update/${boardNumber}`;

// 라우팅 오류 관계로 레시피 path 변경 

// 레시피 게시글 관련 // BOARD_PATH 와 동일한 로직
export const RECIPE_BOARD_PATH = () => '/recipe-board';
export const RECIPE_BOARD_DETAIL_PATH = (boardNumber: string | number) => `$recipe-board/detail/${boardNumber}`;
export const RECIPE_UPDATE_PATH = (boardNumber: string | number) => `$recipe-board/update/${boardNumber}`;
export const RECIPE_WRITE_PATH = () => 'write';

// 중고거래 게시글 관련 // BOARD_PATH 와 동일한 로직
export const TRADE_BOARD_PATH = () => '/trade-board';
export const TRADE_BOARD_DETAIL_PATH =  (boardNumber: string | number) => `$trade-board/detail/${boardNumber}`;
export const TRADE_UPDATE_PATH = (boardNumber: string | number) => `$trade-board/update/${boardNumber}`;
export const TRADE_WRITE_PATH = () => 'write';