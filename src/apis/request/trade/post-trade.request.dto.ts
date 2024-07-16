export default interface PostTradeRequestDto{
    title : string;
    content: string;
    boardImageList : string[];
    tradeLocation : string | null;
    price : string | null;
    boardType: string; 
}