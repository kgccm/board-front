import { TradeCommentListItem } from 'types/interface';
import ResponseDto from '../response.dto';

export default interface GetTradeCommentListResponseDto extends ResponseDto {
    commentList: TradeCommentListItem[];
}