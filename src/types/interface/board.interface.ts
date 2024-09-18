export default interface Board {
    boardNumber : number;
    title : string;
    content : string;
    boardImageList : string[];
    writeDatetime : Date;
    writerEmail : string
    writerNickname : string;
    writerProfileImage : string | null;
}
