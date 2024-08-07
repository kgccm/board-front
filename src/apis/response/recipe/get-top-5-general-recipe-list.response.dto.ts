import { RecipeListItem } from 'types/interface';
import ResponseDto from '../Response.dto';

export default interface GetTop5GeneralRecipeListResponseDto extends ResponseDto {
    generalrecipetop5List: RecipeListItem[ ];
}