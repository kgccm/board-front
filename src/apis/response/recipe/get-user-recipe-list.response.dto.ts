import { RecipeListItem } from 'types/interface';
import ResponseDto from '../response.dto';

export default interface GetUserRecipeListResponseDto extends ResponseDto {
    userRecipeList: RecipeListItem[];
}