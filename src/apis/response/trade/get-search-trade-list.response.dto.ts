import { TradeListItem } from 'types/interface';
import ResponseDto from '../response.dto';

export default interface GetSearchTradeListResponseDto extends ResponseDto{
    searchList: TradeListItem[];
}