export default interface TradeListItem {
    boardNumber : number;
    title : string;
    content : string;
    boardTitleImage : string | null;
    favoriteCount : number;
    commentCount : number;
    viewCount : number;
    tradeLocation : string | null;
    price : string | null;
    writeDatetime : string;
    writerNickname : string;
    writerProfileImage : string | null;
}