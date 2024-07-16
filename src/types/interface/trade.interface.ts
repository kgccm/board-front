export default interface Trade {
    boardNumber : number;
    title : string;
    content : string;
    boardImageList : string[];
    writeDatetime : string;
    writerEmail : string;
    tradeLocation : string | null;
    price : string | null;
    writerNickname : string;
    writerProfileImage : string | null;
}