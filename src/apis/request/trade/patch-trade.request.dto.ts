export default interface PatchTradeRequestDto {
    title: string;
    content: string;
    boardImageList: string[];
    boardType: string; 
    tradeLocation : string | null;
    price : string | null;
}