import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import './style.css';
import { useBoardStore, useLoginUserStore, useBoardTypeStore, useRecipeTypeStore } from 'stores';
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
  const priceRef = useRef<HTMLInputElement | null>(null);
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

  const { recipeType, setRecipeType } = useRecipeTypeStore();

  //          state: 게시물 이미지 미리보기 URL 상태          //
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  //          function: 네비게이트 함수          //
  const navigate = useNavigate();

  // Handle changes to the recipe type select element
  const handleRecipeTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedType = Number(event.target.value); // Convert the value to a number
    console.log("Selected Recipe Type: ", selectedType); // Debugging log for the selected type
    setRecipeType(selectedType); // Set the state with the new type
  };

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
  const onPriceChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const numericValue = value === '' ? 0 : Number(value);
    if (!isNaN(numericValue)) {
      setPrice(numericValue);
    }

    if (!priceRef.current) return;
    priceRef.current.style.height = 'auto';
    priceRef.current.style.height = `${priceRef.current.scrollHeight}px`;
  };
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
    const files = Array.from(event.target.files); // Convert FileList to array

    const newImageUrls = [...imageUrls];
    const newBoardImageFileList = [...boardImageFileList];

    files.forEach((file) => {
      const imageUrl = URL.createObjectURL(file);
      newImageUrls.push(imageUrl);
      newBoardImageFileList.push(file);
    });

    setImageUrls(newImageUrls);
    setBoardImageFileList(newBoardImageFileList);
  };

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
    const value = event.target.value as 'community' | 'recipe' | 'trade';
    if (value === 'community' || value === 'recipe' || value === 'trade') {
      setBoardType(value);
      setPrice(0); // board type 변경 시 가격을 초기화
    }
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
        {boardType === 'recipe' && (
          <div className="recipe-type-select-box">
            <label htmlFor="recipeType">Recipe Type:</label>
            <select id="recipeType" value={recipeType} onChange={handleRecipeTypeChange}>
              <option value={0}>General Recipe</option>
              <option value={1}>Convenience Store Recipe</option>
            </select>
          </div>
        )}
        <div className='board-write-box'>
          <div className='board-write-title-box'>
            <textarea ref={titleRef} className='board-write-title-textarea' rows={1} placeholder='제목을 작성해주세요.' value={title} onChange={onTitleChangeHandler}
              onDragOver={(event) => event.preventDefault()} // 드래그 오버 이벤트 막기
              onDrop={(event) => event.preventDefault()} />
          </div>
          <div className='divider'></div>
          <div className='board-write-images-container'>
            {imageUrls.map((imageUrl, index) => (
              <div key={index} className='board-write-image-box'>
                <img className='board-write-image' src={imageUrl} />
                <div className='icon-button image-close' onClick={() => onImageCloseButtonClickHandler(index)}>
                  <div className='icon close-icon'></div>
                </div>
              </div>
            ))}
          </div>

          <div className='trade-price-and-location-container'>
            {boardType === 'trade' && (
              <div className='price-trade-location-wrapper'>
                <div className='price-box'>
                  <input
                    ref={priceRef}
                    type='number'
                    placeholder='₩ 거래 가격'
                    value={price === 0 ? '' : price}
                    onChange={onPriceChangeHandler}
                    onInput={(e) => {
                      const target = e.target as HTMLInputElement;
                      target.value = target.value.replace(/[^0-9]/g, '');
                    }}
                    onDragOver={(event) => event.preventDefault()} // 드래그 오버 이벤트 막기
                    onDrop={(event) => event.preventDefault()} // 드롭 이벤트 막기
                  />

                </div>
                <div className='trade-location-box'>
                  <textarea ref={tradeLocationRef} placeholder='장소를 입력하세요' value={tradeLocation} onChange={onTradeLocationChangeHandler} onDragOver={(event) => event.preventDefault()} // 드래그 오버 이벤트 막기
                    onDrop={(event) => event.preventDefault()} // 드롭 이벤트 막기
                  />
                </div>
              </div>
            )}
          </div>
          <div className='board-write-content-box'>
            <textarea
              ref={contentRef}
              className='board-write-content-textarea'
              placeholder={
                boardType === 'trade'
                  ? '- 상품명(브랜드)\n- 구매 시기\n- 사용 기간\n- 하자 여부\n\n* 실제 촬영한 사진과 함께 상세 정보를 입력해주세요\n\n* 카카오톡 아이디 첨부 시 게시물 삭제 및 이용제재 처리될 수 있어요.\n안전하고 건전한 거래환경을 위해 과학기술정보통신부, 한국인터넷진흥원, HowSe가 함께합니다.'
                  : boardType === 'community'
                    ? '내 주변 자취러들과 꿀팁을 공유해요.\n\n게시글 내용을 작성해주세요\n'
                    : '레시피 게시글 내용을 작성해주세요.'
              }
              value={content}
              onChange={onContentChangeHandler}
              onDragOver={(event) => event.preventDefault()} // 드래그 오버 이벤트 막기
              onDrop={(event) => event.preventDefault()} // 드롭 이벤트 막기
            />

            <div className='icon-button' onClick={onImageUploadButtonClickHandler}>
              <div className='icon image-box-light-icon'></div>
            </div>
            <input ref={imageInputRef} type='file' accept='image/*' style={{ display: 'none' }} multiple onChange={onImageChangeHandler} />
          </div>
        </div>
      </div>
    </div>
  )
}
