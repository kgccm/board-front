export default interface PatchRecipeRequestDto {
    title: string;
    content: string;
    boardImageList: string[];
    type: number;
    cookingTime: number; // 요리 시간을 추가
    step1_content: string | null;
    step1_image: string | null;
    step2_content: string | null;
    step2_image: string | null;
    step3_content: string | null;
    step3_image: string | null;
    step4_content: string | null;
    step4_image: string | null;
    step5_content: string | null;
    step5_image: string | null;
    step6_content: string | null;
    step6_image: string | null;
    step7_content: string | null;
    step7_image: string | null;
    step8_content: string | null;
    step8_image: string | null;
}