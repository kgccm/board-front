import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import './style.css';
import { useBoardStore, useLoginUserStore, useBoardTypeStore } from 'stores';
import { useNavigate } from 'react-router-dom';
import { MAIN_PATH } from 'constant';
import { useCookies } from 'react-cookie';

//          component: 게시물 작성 화면 컴포넌트          //
export default function BoardWrite() {

  //          state: 제목 영역 요소 참조 상태          //
  const titleRef = useRef<HTMLTextAreaElement | null>(null);
  //          state: 본문 영역 요소 참조 상태          //
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  //          state: 이미지 입력 요소 참조 상태          //
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const priceRef = useRef<HTMLTextAreaElement | null>(null);
  const tradeLocationRef = useRef<HTMLTextAreaElement | null>(null);


  //          state: 게시물 상태          //
  const { title, setTitle } = useBoardStore();
  const { content, setContent } = useBoardStore();
  const { boardImageFileList, setBoardImageFileList } = useBoardStore();
  const { resetBoard } = useBoardStore();
  //          state: 중고거래 가격 상태          //
  const { price, setPrice } = useBoardStore();
  const { tradeLocation, setTradeLocation } = useBoardStore();
  //          state: board type 상태          //
  const { boardType, setBoardType } = useBoardTypeStore();

  //          state: 쿠키 상태          //
  const [cookies, setCookies] = useCookies();

  //          state: 로그인 유저 상태          //
  const { loginUser } = useLoginUserStore();

  //          state: 게시물 이미지 미리보기 URL 상태          //
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  //          function: 네비게이트 함수          //
  const navigate = useNavigate();

  //          event handler: 제목 변경 이벤트 처리          //
  const onTitleChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setTitle(value);

    if (!titleRef.current) return;
    titleRef.current.style.height = 'auto';
    titleRef.current.style.height = `${titleRef.current.scrollHeight}px`
  }

  //          event handler: 내용 변경 이벤트 처리          //
  const onContentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setContent(value);

    if (!contentRef.current) return;
    contentRef.current.style.height = 'auto';
    contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
  }
  //          event handler: 가격 변경 이벤트 처리          //
  const onPriceChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setPrice(value);

    if (!priceRef.current) return;
    priceRef.current.style.height = 'auto';
    priceRef.current.style.height = `${priceRef.current.scrollHeight}px`;
  }
  //          event handler: 거래 장소 변경 이벤트 처리          //
  const onTradeLocationChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setTradeLocation(value);

    if (!tradeLocationRef.current) return;
    tradeLocationRef.current.style.height = 'auto';
    tradeLocationRef.current.style.height = `${tradeLocationRef.current.scrollHeight}px`;
  }


  //          event handler: 이미지 변경 이벤트 처리          //
  const onImageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files.length) return;
    const file = event.target.files[0];

    const imageUrl = URL.createObjectURL(file);
    const newImageUrls = imageUrls.map(item => item);
    newImageUrls.push(imageUrl);
    setImageUrls(newImageUrls);

    const newBoardImageFileList = boardImageFileList.map(item => item);
    newBoardImageFileList.push(file);
    setBoardImageFileList(newBoardImageFileList);
  }

  //          event handler: 이미지 업로드 버튼 클릭 이벤트 처리          //
  const onImageUploadButtonClickHandler = () => {
    if (!imageInputRef.current) return;
    imageInputRef.current.click();
  }

  //          event handler: 이미지 닫기 버튼 클릭 이벤트 처리          //
  const onImageCloseButtonClickHandler = (deleteindex: number) => {
    if (!imageInputRef.current) return;
    imageInputRef.current.value = '';

    const newImageUrls = imageUrls.filter((url, index) => index !== deleteindex);
    setImageUrls(newImageUrls);

    const newBoardImageFileList = boardImageFileList.filter((url, index) => index !== deleteindex);
    setBoardImageFileList(newBoardImageFileList);

    if (!imageInputRef.current) return;
    imageInputRef.current.value = '';
  }
  //          event handler: board type 클릭 이벤트 처리          //
  const onBoardTypeChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setBoardType(event.target.value);
    setPrice(event.target.value);
  };

  //          effect: 마운트 시 실행할 함수          //
  useEffect(() => {
    const accessToken = cookies.accessToken;
    if (!accessToken) {
      navigate(MAIN_PATH());
      return;
    }
    resetBoard();
  }, [])

  //          render: 게시물 작성 화면 컴포넌트 렌더링          //
  return (
    <div id='board-write-wrapper'>
      <div className='board-write-container'>
        <div className='board-select-box'>
          <div className="category-label">{'카테고리'}</div>
          <select className='board-select' value={boardType} onChange={onBoardTypeChangeHandler}>
            <option value="community">{'요모조모'}</option>
            <option value="recipe">{'레시피'}</option>
            <option value="trade">{'중고거래'}</option>
          </select>
        </div>
        <div className='board-write-box'>
          <div className='board-write-title-box'>
            <textarea ref={titleRef} className='board-write-title-textarea' rows={1} placeholder='제목을 작성해주세요.' value={title} onChange={onTitleChangeHandler} />
          </div>
          <div className='divider'></div>

          <div className='board-write-content-box'>
            <textarea ref={contentRef} className='board-write-content-textarea' placeholder='게시글 내용을 작성해주세요&#13;&#10;신뢰할 수 있는 거래를 위해 자세히 적어주세요.'
              value={content} onChange={onContentChangeHandler} >
            </textarea>
            {boardType === 'trade' && (
              <div className='price-box'>
                <textarea ref={priceRef} placeholder='가격을 입력하세요' value={price} onChange={onPriceChangeHandler} />
                <textarea ref={tradeLocationRef} placeholder='장소를 입력하세요' value={tradeLocation} onChange={onTradeLocationChangeHandler} />
              </div>

            )}
            <div className='icon-button' onClick={onImageUploadButtonClickHandler}>
              <div className='icon image-box-light-icon'></div>
            </div>
            <input ref={imageInputRef} type='file' accept='image/*' style={{ display: 'none' }} onChange={onImageChangeHandler} />
          </div>
          <div className='board-write-images-box'>
            {imageUrls.map((imageUrl, index) => (
              <div className='board-write-image-box'>
                <img className='board-write-image' src={imageUrl} />
                <div className='icon-button image-close' onClick={() => onImageCloseButtonClickHandler(index)}>
                  <div className='icon close-icon'></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
