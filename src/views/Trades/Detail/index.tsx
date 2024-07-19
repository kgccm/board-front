import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import './style.css';
import TradeFavoriteItem from 'components/TradeFavoriteItem';
import { TradeCommentListItem, TradeFavoriteListItem } from 'types/interface';
import TradeCommentItem from 'components/TradeCommentItem';
import Pagination from 'components/Pagination';
import defaultProfileImage from 'assets/image/default-profile-image.png';
import { useBoardTypeStore, useLoginUserStore } from 'stores';
import { useNavigate, useParams } from 'react-router-dom';
import { TRADE_PATH, TRADE_UPDATE_PATH, USER_PATH } from 'constant';
import Trade from 'types/interface/trade.interface';
import {
  deleteTradeRequest, getTradeRequest, getCommentTradeListRequest, increaseViewCountTradeRequest, postTradeCommentRequest,
  putTradeFavoriteRequest, getFavoriteTradeListRequest
} from 'apis';
import GetTradeResponseDto from 'apis/response/trade/get-trade.response.dto';
import { ResponseDto } from 'apis/response';
import { DeleteTradeResponseDto, GetTradeCommentListResponseDto, GetTradeFavoriteListResponseDto, IncreaseViewCountTradeResponseDto, PostTradeCommentResponseDto, PutTradeFavoriteResponseDto } from 'apis/response/trade';
import dayjs from 'dayjs';
import { useCookies } from 'react-cookie';
import { PostTradeCommentRequestDto } from 'apis/request/trade';
import { usePagination } from 'hooks';

//          component: 게시물 상세 화면 컴포넌트          //
export default function TradeDetail() {

  //          state: 게시물 번호 path variable 상태          //
  // const { TradeBoardNumber } = useParams<{ TradeBoardNumber: string }>();
  const { tradeBoardNumber } = useParams();
    const { boardTypeParam } = useParams<{ boardTypeParam: string }>();

  console.log('TradeDetail boardNumber:', tradeBoardNumber); // boardNumber 로그 추가
  //          state: 로그인 유저 상태          //
  const { loginUser } = useLoginUserStore();
  //          state: 쿠키 상태          //
  const [cookies, setCookies] = useCookies();
  const { boardType, setBoardType } = useBoardTypeStore();
  //          function: 네비게이트 함수          //
  const navigate = useNavigate();

  //          function: increase View Count Response 처리 함수          //
  const increaseViewCountTradeResponse = (responseBody: IncreaseViewCountTradeResponseDto | ResponseDto | null) => {
    if (!responseBody) return null;
    const { code } = responseBody;
    if (code === 'NB') alert('존재하지 않는 게시물입니다.');
    if (code === 'DBE') alert('데이터베이스 오류입니다.');
  }


  //          component: 게시물 상세 상단 컴포넌트          //
  const TradeDetailTop = () => {

    //          state: 작성자 여부 상태          //
    const [isWriter, setWriter] = useState<Boolean>(false);
    //          state: more 버튼 상태          //
    const [trade, setTrade] = useState<Trade | null>(null);
    //          state: more 버튼 상태          //
    const [showMore, setShowMore] = useState<boolean>(false);

    //          function: 작성일 포멧 변경 함수          //
    const getWriteDateTimeFormat = () => {
      if (!trade) return null;
      const date = dayjs(trade.writeDatetime);
      return date.format('YYYY. MM. DD.');
    }
    //          function: get Board Response 처리 함수          //
    const getTradeResponse = (responseBody: GetTradeResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'NB') alert('존재하지 않는 게시물입니다.');
      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') {
        navigate(TRADE_PATH());
        return;
      }
      const trade: Trade = { ...responseBody as GetTradeResponseDto }
      setTrade(trade);

      if (!loginUser) {
        setWriter(false);
        return;
      }
      const isWriter = loginUser.email === trade.writerEmail;
      setWriter(isWriter);
    }

    //          function: delete Board Response 처리 함수          //
    const deleteTradeResponse = (responseBody: DeleteTradeResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'VF') alert('잘못된 접근입니다.');
      if (code === 'NU') alert('존재하지 않는 유저입니다.');
      if (code === 'NB') alert('존재하지 않는 게시물입니다.');
      if (code === 'AF') alert('인증에 실패했습니다.');
      if (code === 'NP') alert('권한이 없습니다.');
      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;

      navigate(TRADE_PATH());
    }


    //          event handler: 닉네임 클릭 이벤트 처리          //
    const onNicknameClickHandler = () => {
      if (!trade) return;
      navigate(USER_PATH(trade.writerEmail));
    }

    //          event handler: more 버튼 클릭 이벤트 처리          //
    const onMoreButtonClickHandler = () => {
      setShowMore(!showMore);
    }

    //          event handler: 수정 버튼 클릭 이벤트 처리          //
    const onUpdateButtonClickHandler = () => {
      if (!trade || !loginUser) return;
      if (loginUser.email !== trade.writerEmail) return;
      navigate(`/trade/trade-board/update/${trade.boardNumber}`);
    }

    //          event handler: 삭제 버튼 클릭 이벤트 처리          //
    const onDeleteButtonClickHandler = () => {
      if (!tradeBoardNumber || !trade || !loginUser || !cookies.accessToken) return;
      if (loginUser.email !== trade.writerEmail) return;
      deleteTradeRequest(tradeBoardNumber, cookies.accessToken).then(deleteTradeResponse);
    }
    //          effect: 게시물 번호 path variable 바뀔때마다 게시물 불러오기          //
    useEffect(() => {
      if (!tradeBoardNumber) {
        navigate(TRADE_PATH());
        return;
      }
      getTradeRequest(tradeBoardNumber).then(getTradeResponse);
    }, [tradeBoardNumber]);

    //          render: 게시물 상세 상단 컴포넌트 렌더링          //
    if (!trade) return <></>
    return (
      <div id='board-detail-top'>
        <div className='board-detail-top-header'>
          <div className='board-detail-title'>{trade.title}</div>
          <div className='board-detail-top-sub-box'>
            <div className='board-detail-write-info-box'>
              <div className='board-detail-writer-profile-image' style={{ backgroundImage: `url(${trade.writerProfileImage ? trade.writerProfileImage : defaultProfileImage})` }}></div>
              <div className='board-detail-writer-nickname' onClick={onNicknameClickHandler}>{trade.writerNickname}</div>
              <div className='board-detail-info-divider'>{'\|'}</div>
              <div className='board-detail-write-date'>{getWriteDateTimeFormat()}</div>
            </div>
            {isWriter &&
              <div className='icon-button' onClick={onMoreButtonClickHandler}>
                <div className='icon more-icon'></div>
              </div>
            }
            {showMore &&
              <div className='board-detail-more-box'>
                <div className='board-detail-update-button' onClick={onUpdateButtonClickHandler}>{'수정'}</div>
                <div className='divider'></div>
                <div className='board-detail-delete-button' onClick={onDeleteButtonClickHandler}>{'삭제'}</div>
              </div>}
          </div>
        </div>
        <div className='divider'></div>
        <div className='board-detail-top-main'>
          {trade.boardImageList.map(image => <img className='board-detail-main-image' src={image} />)}
          <div className='board-detail-main-text'>{trade.content}</div>
        </div>
      </div>
    )
  }

  //          component: 게시물 상세 하단 컴포넌트          //
  const TradeDetailBottom = () => {

    //          state: 댓글 TextArea 참조 상태          //
    const TradecommentRef = useRef<HTMLTextAreaElement | null>(null);

    //          state: 페이지네이션 관련 상태          //
    const { currentPage, setCurrentPage, currentSection,
      setCurrentSection, viewList, viewPageList,
      totalSection, setTotalList } = usePagination<TradeCommentListItem>(5);

    //          state: 좋아요 리스트 상태          //
    const [favoriteList, setFavoriteList] = useState<TradeFavoriteListItem[]>([]);

    //          state: 좋아요 상태          //
    const [isFavorite, setFavorite] = useState<Boolean>(false);
    //          state: 좋아요 박스 보기 상태          //
    const [showFavorite, setShowFavorite] = useState<Boolean>(false);
    //          state: 전체 댓글 개수 상태          //
    const [totalCommentCount, setTotalCommentCount] = useState<number>(0);
    //          state: 댓글 상태          //
    const [comment, setComment] = useState<string>('');
    //          state: 댓글 박스 보기 상태          //
    const [showComment, setShowComment] = useState<Boolean>(false);

    //          function: get Comment List Response 처리 함수          //
    const getTradeCommentListResponse = (responseBody: GetTradeCommentListResponseDto | ResponseDto | null) => {
      console.log('Response body:', responseBody); // 전체 응답 로그 추가
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'NB') alert('존재하지 않는 게시물입니다.');
      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;

      const { commentList } = responseBody as GetTradeCommentListResponseDto;
      setTotalList(commentList);
      setTotalCommentCount(commentList.length);
    }

    //          function: get Trade Favorite List Response 처리 함수          //
    const getTradeFavoriteListResponse = (responseBody: GetTradeFavoriteListResponseDto | ResponseDto | null) => {
      console.log('getTradeFavoriteListResponse:', responseBody); // Debugging log
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'NB') alert('존재하지 않는 게시물입니다.');
      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;

      const { favoriteList } = responseBody as GetTradeFavoriteListResponseDto;
      setFavoriteList(favoriteList);

      if (!loginUser) {
        setFavorite(false);
        return;
      }

      const isFavorite = favoriteList.findIndex(favorite => favorite.email === loginUser.email) !== -1;
      setFavorite(isFavorite);
    }

    //          function: put Favorite Response 처리 함수          //
    const putTradeFavoriteResponse = (responseBody: PutTradeFavoriteResponseDto | ResponseDto | null) => {
      console.log('putTradeFavoriteResponse:', responseBody); // Debugging log
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'VF') alert('잘못된 접근입니다.');
      if (code === 'NU') alert('존재하지 않는 유저입니다.');
      if (code === 'NB') alert('존재하지 않는 게시물입니다.');
      if (code === 'AF') alert('사용자 인증에 실패했습니다.');
      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;
      if (!tradeBoardNumber) return;
      // setFavorite(prevState => !prevState);

      getFavoriteTradeListRequest(tradeBoardNumber).then(getTradeFavoriteListResponse);
    }

    //          function: post Comment Response 처리 함수          //
    const postTradeCommentResponse = (responseBody: PostTradeCommentResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'VF') alert('잘못된 접근입니다.');
      if (code === 'NU') alert('존재하지 않는 유저입니다.');
      if (code === 'NB') alert('존재하지 않는 게시물입니다.');
      if (code === 'AF') alert('사용자 인증에 실패했습니다.');
      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;

      setComment('');

      if (!tradeBoardNumber) return;
      getCommentTradeListRequest(tradeBoardNumber).then(getTradeCommentListResponse);
    }

    //          event handler: 좋아요 클릭 이벤트 처리          //
    const onFavoriteClickHandler = () => {
      console.log('onFavoriteClickHandler'); // Debugging log
      if (!loginUser || !tradeBoardNumber || !cookies.accessToken) return;
      putTradeFavoriteRequest(tradeBoardNumber, cookies.accessToken).then(putTradeFavoriteResponse);
    }
    //          event handler: 좋아요 박스 보기 이벤트 처리          //
    const onShowFavoriteBoxClickHandler = () => {
      setShowFavorite(!showFavorite);
    }
    //          event handler: 댓글 박스 보기 이벤트 처리          //
    const onShowCommentBoxClickHandler = () => {
      setShowComment(!showComment);
    }
    //          event handler: 댓글 작성 버튼 클릭 이벤트 처리          //
    const onCommentSubmitButtonClickHandler = () => {
      if (!comment || !tradeBoardNumber || !loginUser || !cookies.accessToken) return;
      const requestBody: PostTradeCommentRequestDto = { content: comment };
      postTradeCommentRequest(tradeBoardNumber, requestBody, cookies.accessToken).then(postTradeCommentResponse);
    }
    //          event handler: 댓글 변경 이벤트 처리          //
    const onCommentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = event.target;
      setComment(value);
      if (!TradecommentRef.current) return;
      TradecommentRef.current.style.height = 'auto';
      TradecommentRef.current.style.height = `${TradecommentRef.current.scrollHeight}px`;
    }
    //          effect: 게시물 번호 path variable이 바뀔때마다 좋아요 및 댓글 리스트 불러오기          //
    useEffect(() => {
      if (!tradeBoardNumber) return;
      getFavoriteTradeListRequest(tradeBoardNumber).then(getTradeFavoriteListResponse);
      getCommentTradeListRequest(tradeBoardNumber).then(getTradeCommentListResponse);
    }, [tradeBoardNumber]);

    //          render: 게시물 상세 하단 컴포넌트 렌더링          //
    return (
      <div id='board-detail-bottom'>
        <div className='board-detail-bottom-button-box'>
          <div className='board-detail-bottom-button-group'>
            <div className='icon-button' onClick={onFavoriteClickHandler}>
              {isFavorite ?
                <div className='icon favorite-fill-icon'></div> :
                <div className='icon favorite-light-icon'></div>
              }
            </div>
            <div className='board-detail-bottom-button-text'>{`좋아요 ${favoriteList.length}`}</div>
            <div className='icon-button' onClick={onShowFavoriteBoxClickHandler}>
              {showFavorite ?
                <div className='icon up-light-icon'></div> :
                <div className='icon down-light-icon'></div>
              }
            </div>
          </div>
          <div className='board-detail-bottom-button-group'>
            <div className='icon-button'>
              <div className='icon comment-icon'></div>
            </div>
            <div className='board-detail-bottom-button-text'>{`댓글 ${totalCommentCount}`}</div>
            <div className='icon-button' onClick={onShowCommentBoxClickHandler}>
              {showComment ?
                <div className='icon up-light-icon'></div> :
                <div className='icon down-light-icon'></div>
              }
            </div>
          </div>
        </div>
        {showFavorite &&
          <div className='board-detail-bottom-favorite-box'>
            <div className='board-detail-bottom-favorite-container'>
              <div className='board-detail-bottom-favorite-title'>{'좋아요 '}<span className='emphasis'>{favoriteList.length}</span></div>
              <div className='board-detail-bottom-favorite-content'>
                {favoriteList.map(item => <TradeFavoriteItem tradefavoriteListItem={item} />)}
              </div>
            </div>
          </div>
        }
        {showComment &&
          <div className='board-detail-bottom-comment-box'>
            <div className='board-detail-bottom-comment-container'>
              <div className='board-detail-bottom-comment-title'>{'댓글 '}<span className='emphasis'>{totalCommentCount}</span></div>
              <div className='board-detail-bottom-comment-list-container'>
                {viewList.map(item => <TradeCommentItem tradecommentListItem={item} />)}
              </div>
            </div>
            <div className='divider'></div>
            <div className='board-detail-bottom-comment-pagination-box'>
              <Pagination currentPage={currentPage} currentSection={currentSection} setCurrentPage={setCurrentPage} setCurrentSection={setCurrentSection} viewPageList={viewPageList} totalSection={totalSection} />
            </div>
            {loginUser !== null &&
              <div className='board-detail-bottom-comment-input-box'>
                <div className='board-detail-bottom-comment-input-container'>
                  <textarea ref={TradecommentRef} className='board-detail-bottom-comment-textarea' placeholder='댓글을 작성해주세요.' value={comment} onChange={onCommentChangeHandler} />
                  <div className='board-detail-bottom-comment-button-box'>
                    <div className={comment === '' ? 'disable-button' : 'black-button'} onClick={onCommentSubmitButtonClickHandler}>{'댓글달기'}</div>
                  </div>
                </div>
              </div>
            }
          </div>
        }
      </div>
    )
  }
  //          effect: 게시물 번호 path variable이 바뀔때마다 게시물 조회수 증가          //
  let effectFlag = true;
  useEffect(() => {
    if (!tradeBoardNumber) return;
    if (effectFlag) {
      effectFlag = false;
      return;
    }
    increaseViewCountTradeRequest(tradeBoardNumber).then(increaseViewCountTradeResponse);
    console.log(boardType);
  }, [tradeBoardNumber])

  //          render: 게시물 상세 화면 컴포넌트 렌더링          //
  return (
    <div id='board-detail-wrapper'>
      <div className='board-detail-container'>
        <TradeDetailTop />
        <TradeDetailBottom />
      </div>
    </div>
  )
}