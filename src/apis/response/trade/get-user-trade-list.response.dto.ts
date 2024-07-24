import { TradeListItem } from 'types/interface';
import ResponseDto from '../response.dto';

export default interface GetUserTradeListResponseDto extends ResponseDto {
    userBoardList: TradeListItem[];
}