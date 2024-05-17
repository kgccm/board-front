import { RecipeListItem } from 'types/interface';
import ResponseDto from '../response.dto';

export default interface GetLatestRecipeListResponseDto extends ResponseDto{
    recipelatestList: RecipeListItem[];
}