import { TradeListItem } from 'types/interface';
import ResponseDto from '../response.dto';

export default interface GetLatestTradeListResponseDto extends ResponseDto{
    tradelatestList: TradeListItem[];
}