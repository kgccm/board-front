export default interface Recipe {
    boardNumber : number;
    title : string;
    content : string;
    boardImageList : string[];
    writeDatetime : string;
    writerEmail : string
    writerNickname : string;
    writerProfileImage : string | null;
    type : number;
}
