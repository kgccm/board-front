import { RecipeListItem } from 'types/interface';
import ResponseDto from '../response.dto';

export default interface GetSearchRecipeListResponseDto extends ResponseDto{
    searchList: RecipeListItem[];
}