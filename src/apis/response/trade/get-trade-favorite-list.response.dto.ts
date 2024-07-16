import { TradeFavoriteListItem } from 'types/interface';
import ResponseDto from '../response.dto';

export default interface GetTradeFavoriteListResponseDto extends ResponseDto {
    favoriteList : TradeFavoriteListItem[]
}