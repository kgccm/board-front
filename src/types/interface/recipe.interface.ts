export default interface Recipe {
    boardNumber: number;
    title: string;
    content: string;
    boardImageList: string[];
    writeDatetime: string;
    writerEmail: string
    writerNickname: string;
    writerProfileImage: string | null;
    type: number;
    cookingTime: number; // 요리 시간 추가
    step1Content: string | null; // 스텝 1 내용 추가
    step1Image: string | null;   // 스텝 1 이미지 추가
    step2Content: string | null; // 스텝 2 내용 추가
    step2Image: string | null;   // 스텝 2 이미지 추가
    step3Content: string | null;
    step3Image: string | null;
    step4Content: string | null;
    step4Image: string | null;
    step5Content: string | null;
    step5Image: string | null;
    step6Content: string | null;
    step6Image: string | null;
    step7Content: string | null;
    step7Image: string | null;
    step8Content: string | null;
    step8Image: string | null;
}