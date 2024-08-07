import { RecipeListItem } from 'types/interface';
import ResponseDto from '../Response.dto';

export default interface GetTop5ConveinenceRecipeListResponseDto extends ResponseDto {
    conveniencerecipetop5List: RecipeListItem[ ];
}