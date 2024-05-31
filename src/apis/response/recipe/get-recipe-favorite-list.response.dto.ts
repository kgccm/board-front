import { RecipeFavoriteListItem } from 'types/interface';
import ResponseDto from '../response.dto';

export default interface GetRecipeFavoriteListResponseDto extends ResponseDto {
    favoriteList : RecipeFavoriteListItem[]
}