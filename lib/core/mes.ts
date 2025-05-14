//インターフェースの定義
interface IMes {
    header: IMesHeader
    body: IMesBody
}
interface IMesHeader {
    headerRaw: string;
}
interface IMesBody {
    sections: IMesSection[]
}
interface IMesSection {
    name: string;
    pieces: IMesPiece[]
}

interface IMesPiece {
    dialogue: string;
    character: string;
    comment: string;
    sound_note: string;
    sound_position: string;
    timing: string;
    ext_field: string;
}


/// 実装部

// TODO: MesPieceの実装を行う
class MesPiece implements IMesPiece {
    dialogue: string;
    character: string;
    comment: string;
    sound_note: string;
    sound_position: string;
    timing: string;
    ext_field: string;
    constructor(pieceText: string){
        //ピースのブロックを改行で分割して、それぞれに対応するプロパティに格納する
        const delimiter = "\n"
        const lines = pieceText.split(delimiter);
        for(let line of lines){
            //行の種別を判定して、対応するプロパティに格納する
            //TODO: デコレータは可変に設定できるようにする
            switch(line.charAt(0)){
                //character
                case "@":
                case "＠":
                    this.character = line.substring(1) + delimiter;
                    break;
                //dialogue
                case "#":
                case "＃":
                    this.comment = line.substring(1) + delimiter;
                    break;
                //sound_position
                case "!":
                case "！":
                    this.sound_position += line.substring(1) + delimiter;
                    break;
                //timing
                case "&":
                case "＆":
                    this.timing += line.substring(1) + delimiter;
                    break;
                //sound_note
                case "$":
                case "＄":
                    this.sound_note += line.substring(1) + delimiter;
                    break;
                //ext_field
                case "?":
                case "？":
                    this.ext_field += line.substring(1) + delimiter;
                    break;
                default:
                    this.dialogue += line + delimiter;
            }
        }


    }
}


class Mes implements IMes {
    body: IMesBody;
    header: IMesHeader;
}