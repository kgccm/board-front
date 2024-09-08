import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import './style.css';
import { useBoardStore, useLoginUserStore } from 'stores';
import { useNavigate, useParams } from 'react-router-dom';
import { RECIPE_PATH, RECIPE_UPDATE_PATH } from 'constant';
import { useCookies } from 'react-cookie';
import { fileUploadRequest, getRecipeRequest } from 'apis';
import { GetRecipeResponseDto } from 'apis/response/recipe';
import { ResponseDto } from 'apis/response';
import { convertUrlsToFile } from 'utils';

//          component: 게시물 수정 화면 컴포넌트          //
export default function RecipeUpdate() {

  //          state: 제목 영역 요소 참조 상태          //
  const titleRef = useRef<HTMLTextAreaElement | null>(null);
  //          state: 본문 영역 요소 참조 상태          //
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  //          state: 이미지 입력 요소 참조 상태          //
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  //          state: 게시물 번호 path variable 상태          //
  const { recipeBoardNumber } = useParams();

  //          state: 게시물 상태          //
  const { title, setTitle } = useBoardStore();
  const { content, setContent } = useBoardStore();
  const { boardImageFileList, setBoardImageFileList } = useBoardStore();

  //          state: 쿠키 상태          //
  const [cookies, setCookies] = useCookies();

  //          state: 로그인 유저 상태          //
  const { loginUser } = useLoginUserStore();

  //          state: 게시물 이미지 미리보기 URL 상태          //
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  //          state: 레시피 요리 시간 상태          //
  const { cookingTime, setCookingTime } = useBoardStore();

  //          state: 레시피 Step 카운트 상태          //
  const [stepCount, setStepCount] = useState<number>(1);

  //          state: 레시피 Step 상태          //
  const {
    step1_content, setStep1Content,
    step1_image, setStep1Image,
    step2_content, setStep2Content,
    step2_image, setStep2Image,
    step3_content, setStep3Content,
    step3_image, setStep3Image,
    step4_content, setStep4Content,
    step4_image, setStep4Image,
    step5_content, setStep5Content,
    step5_image, setStep5Image,
    step6_content, setStep6Content,
    step6_image, setStep6Image,
    step7_content, setStep7Content,
    step7_image, setStep7Image,
    step8_content, setStep8Content,
    step8_image, setStep8Image
  } = useBoardStore();

  const stepContentList = [
    { content: step1_content, setContent: setStep1Content, image: step1_image, setImage: setStep1Image },
    { content: step2_content, setContent: setStep2Content, image: step2_image, setImage: setStep2Image },
    { content: step3_content, setContent: setStep3Content, image: step3_image, setImage: setStep3Image },
    { content: step4_content, setContent: setStep4Content, image: step4_image, setImage: setStep4Image },
    { content: step5_content, setContent: setStep5Content, image: step5_image, setImage: setStep5Image },
    { content: step6_content, setContent: setStep6Content, image: step6_image, setImage: setStep6Image },
    { content: step7_content, setContent: setStep7Content, image: step7_image, setImage: setStep7Image },
    { content: step8_content, setContent: setStep8Content, image: step8_image, setImage: setStep8Image },
  ];
  //          function: 네비게이트 함수          //
  const navigate = useNavigate();

  //          function: get Board Response 처리 함수          //
  const getRecipeResponse = (responseBody: GetRecipeResponseDto | ResponseDto | null) => {
    if (!responseBody) return;
    const { code } = responseBody;
    if (code === 'NB') alert('존재하지 않는 게시물입니다.');
    if (code === 'DBE') alert('데이터베이스 오류입니다.');
    if (code !== 'SU') {
      navigate(RECIPE_PATH());
      return;
    }

    const { title, content, boardImageList, writerEmail, cookingTime, step1_content, step1_image,
      step2_content, step2_image, step3_content, step3_image, step4_content, step4_image, step5_content,
      step5_image, step6_content, step6_image, step7_content, step7_image, step8_content, step8_image
    } = responseBody as GetRecipeResponseDto;
    setTitle(title);
    setContent(content);
    setImageUrls(boardImageList);
    setCookingTime(cookingTime); // 요리 시간 설정
    setStep1Content(step1_content || '');
    setStep1Image(step1_image || '');
    setStep2Content(step2_content || '');
    setStep2Image(step2_image || '');
    setStep3Content(step3_content || '');
    setStep3Image(step3_image || '');
    setStep4Content(step4_content || '');
    setStep4Image(step4_image || '');
    setStep5Content(step5_content || '');
    setStep5Image(step5_image || '');
    setStep6Content(step6_content || '');
    setStep6Image(step6_image || '');
    setStep7Content(step7_content || '');
    setStep7Image(step7_image || '');
    setStep8Content(step8_content || '');
    setStep8Image(step8_image || '');

    convertUrlsToFile(boardImageList).then(boardImageFileList => setBoardImageFileList(boardImageFileList));

    if (!loginUser || loginUser.email !== writerEmail) {
      navigate(RECIPE_PATH());
      return;
    }
  }

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
  //          event handler: 스텝 이미지 변경 이벤트 처리          //
  const onStepImageChange = async (index: number, event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files.length) return;
    const file = event.target.files[0];

    // 파일을 서버로 업로드
    const formData = new FormData();
    formData.append('file', file);

    const uploadedImageUrl = await fileUploadRequest(formData);

    if (uploadedImageUrl) {
      // 서버에서 받은 URL로 스텝 이미지 상태를 업데이트
      stepContentList[index].setImage(uploadedImageUrl);
    }
  };


  //          event handler: 요리 시간 변경 이벤트 처리          //
  const onCookingTimeChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setCookingTime(Number(event.target.value));
  };

  //          event handler: 스텝 내용 변경 이벤트 처리          //
  const onStepContentChange = (index: number, event: ChangeEvent<HTMLTextAreaElement>) => {
    stepContentList[index].setContent(event.target.value);
  };

  // 스텝 추가 핸들러
  const onAddStepHandler = () => {
    if (stepCount < 8) {
      setStepCount(stepCount + 1);
    }
  };

  // 스텝 삭제 핸들러
  const onRemoveStepHandler = (index: number) => {
    if (stepCount > 1) {
      stepContentList[index].setContent('');
      stepContentList[index].setImage('');
      setStepCount(stepCount - 1);
    }
  };

  //          effect: 마운트 시 실행할 함수          //
  useEffect(() => {
    const accessToken = cookies.accessToken;
    if (!accessToken) {
      navigate(RECIPE_PATH());
      return;
    }
    if (!recipeBoardNumber) return;
    getRecipeRequest(recipeBoardNumber).then(getRecipeResponse);
    // 스텝 개수만큼 stepCount를 설정
    const totalSteps = [
      step1_content, step2_content, step3_content, step4_content,
      step5_content, step6_content, step7_content, step8_content
    ].filter(step => step).length; // 스텝이 존재하는 것만 카운트

    setStepCount(totalSteps); // 스텝의 개수에 맞춰 stepCount를 설정
  }, [recipeBoardNumber])

  //          render: 게시물 작성 화면 컴포넌트 렌더링          //
  return (
    <div id='recipe-update-wrapper'>
      <div className='recipe-update-container'>
        <div className='recipe-update-box'>
          <div className='recipe-update-title-box'>
            <textarea ref={titleRef} className='recipe-update-title-textarea' rows={1} placeholder='제목을 작성해주세요.' value={title} onChange={onTitleChangeHandler}
              onDragOver={(event) => event.preventDefault()} // 드래그 오버 이벤트 막기
              onDrop={(event) => event.preventDefault()} // 드롭 이벤트 막기
            />
          </div>
          <div className='divider'></div>
          <div className='recipe-update-images-container'>
            {imageUrls.map((imageUrl, index) => (
              <div key={index} className='recipe-update-image-box'>
                <img className='recipe-update-image' src={imageUrl} />
                <div className='icon-button image-close' onClick={() => onImageCloseButtonClickHandler(index)}>
                  <div className='icon close-icon'></div>
                </div>
              </div>
            ))}
          </div>
          <div className='recipe-update-content-box'>
            <textarea ref={contentRef} className='recipe-update-content-textarea' placeholder='게시글 내용을 작성해주세요&#13;&#10;신뢰할 수 있는 거래를 위해 자세히 적어주세요.'
              value={content} onChange={onContentChangeHandler} onDragOver={(event) => event.preventDefault()} // 드래그 오버 이벤트 막기
              onDrop={(event) => event.preventDefault()} // 드롭 이벤트 막기
            />
            <div className='icon-button' onClick={onImageUploadButtonClickHandler}>
              <div className='icon image-box-light-icon'></div>
            </div>
            <input ref={imageInputRef} type='file' accept='image/*' style={{ display: 'none' }} multiple onChange={onImageChangeHandler} />
          </div>
          {/* 요리 시간 */}
          <div className="cooking-time-container">
            <input
              type="number"
              className="cooking-time-input"
              placeholder="요리 시간을 입력하세요"
              value={cookingTime}
              onChange={onCookingTimeChangeHandler}
            />
            <span className="cooking-time-unit">분</span>
          </div>

          {/* 레시피 스텝 부분 */}
          <div className='recipe-steps-container'>
            {[...Array(stepCount)].map((_, index) => (
              <div key={index} className='recipe-step'>
                <textarea
                  placeholder={`Step ${index + 1} 내용을 입력하세요`}
                  value={stepContentList[index].content || ''}
                  onChange={(e) => onStepContentChange(index, e)}
                />
                <div className='icon-button' onClick={() => document.getElementById(`file-input-${index}`)?.click()}>
                  <div className='icon image-box-light-icon'></div>
                </div>
                <input
                  id={`file-input-${index}`}
                  type='file'
                  accept='image/*'
                  onChange={(e) => onStepImageChange(index, e)}
                  style={{ display: 'none' }}
                />
                {stepContentList[index].image && (
                  <div className='recipe-step-image-preview'>
                    <img src={stepContentList[index].image || ''} alt={`Step ${index + 1}`} />
                  </div>
                )}
                <button
                  className='remove-step-button'
                  onClick={() => onRemoveStepHandler(index)}
                  disabled={stepCount <= 1}
                >
                  스텝 삭제
                </button>
              </div>
            ))}
            {stepCount < 8 && (
              <button className='add-step-button' onClick={onAddStepHandler}>
                스텝 추가
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
