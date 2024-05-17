import { RecipeCommentListItem } from 'types/interface';
import ResponseDto from '../response.dto';

export default interface GetRecipeCommentListResponseDto extends ResponseDto {
    recipecommentList: RecipeCommentListItem[];
}