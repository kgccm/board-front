export default interface Trade {
    boardNumber : number;
    title : string;
    content : string;
    boardImageList : string[];
    tradeLocation : string | null;
    price : number;
    writeDatetime : Date;
    writerEmail : string;
    writerNickname : string;
    writerProfileImage : string | null;
}