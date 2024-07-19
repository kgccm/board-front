// components/BoardUpdateForm.tsx
import React, { ChangeEvent, useRef, useState } from 'react';

interface BoardUpdateFormProps {
  title: string;
  content: string;
  imageUrls: string[];
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onImageChange: (files: FileList) => void;
  onImageClose: (index: number) => void;
}

const BoardUpdateForm: React.FC<BoardUpdateFormProps> = ({
  title,
  content,
  imageUrls,
  onTitleChange,
  onContentChange,
  onImageChange,
  onImageClose
}) => {
  const titleRef = useRef<HTMLTextAreaElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    onImageChange(event.target.files);
  };

  return (
    <div className='board-update-box'>
      <div className='board-update-title-box'>
        <textarea ref={titleRef} className='board-update-title-textarea' rows={1} placeholder='제목을 작성해주세요.' value={title} onChange={(e) => onTitleChange(e.target.value)} />
      </div>
      <div className='divider'></div>
      <div className='board-update-content-box'>
        <textarea ref={contentRef} className='board-update-content-textarea' placeholder='게시글 내용을 작성해주세요&#13;&#10;신뢰할 수 있는 거래를 위해 자세히 적어주세요.' value={content} onChange={(e) => onContentChange(e.target.value)} />
        <div className='icon-button' onClick={() => imageInputRef.current?.click()}>
          <div className='icon image-box-light-icon'></div>
        </div>
        <input ref={imageInputRef} type='file' accept='image/*' style={{ display: 'none' }} onChange={handleImageChange} />
      </div>
      <div className='board-update-images-box'>
        {imageUrls.map((imageUrl, index) => (
          <div key={index} className='board-update-image-box'>
            <img className='board-update-image' src={imageUrl} />
            <div className='icon-button image-close' onClick={() => onImageClose(index)}>
              <div className='icon close-icon'></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardUpdateForm;
