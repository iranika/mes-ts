//インターフェースの定義

// @ts-ignore TS6133:
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

/// Sectionの実装部
interface IMesSection {
    name: string;
    pieces: IMesPiece[]
}
//TODO: MesSectionの実装を行う
export class MesSection implements IMesSection {
    name: string = "";
    pieces: IMesPiece[] = [];
    constructor(args = { name: "", text: "", config: new MesConfig() }) {
        this.name = args.name ?? "";
        this.pieces = args.config.splitPieceText(args.text);
    }
    addPiece(piece: IMesPiece) {
        this.pieces.push(piece);
    }
} 


///　Pieceの実装部
interface IMesPiece {
    dialogue: string;
    character: string;
    comment: string;
    sound_note: string;
    sound_position: string;
    timing: string;
    ext_field: string;
}

interface IMesDecoratorConfig {
    matchCharactor(line: string): boolean;
    matchComment(line: string): boolean;
    matchSoundNote(line: string): boolean;
    matchSoundPosition(line: string): boolean;
    matchTiming(line: string): boolean;
    matchExtField(line: string): boolean;
}

class MesDecoratorConfig implements IMesDecoratorConfig {
    public Decorator = {
        Character: "＠@",
        Comment: "＃#",
        SoundNote: "＄$",
        SoundPosition: "！!",
        Timing: "＆&",
        ExtField: "？?"
    }

    matchCharactor(line: string) { return this.Decorator.Character.includes(line) }
    matchComment(line: string) { return this.Decorator.Comment.includes(line) }
    matchSoundNote(line: string) { return this.Decorator.SoundNote.includes(line) }
    matchSoundPosition(line: string) { return this.Decorator.SoundPosition.includes(line) }
    matchTiming(line: string) { return this.Decorator.Timing.includes(line) }
    matchExtField(line: string) { return this.Decorator.ExtField.includes(line) }
}

interface IMesPieceConfig {
    LineDelimiter: string;
    Decorator: IMesDecoratorConfig;
}

export class MesConfig implements IMesPieceConfig {
    //Set.has()をつかってみたいけど、たぶん文字列長的に短いからString.includes()でいいと思う
    public Decorator = new MesDecoratorConfig();
    public LineDelimiter = "\n";
    constructor() {

    }
    public splitPieceText(text: string): MesPiece[] { return new Array<MesPiece>() }
}


// TODO: MesPieceの実装を行う
export class MesPiece implements IMesPiece {

    dialogue: string = "";
    character: string = "";
    comment: string = "";
    sound_note: string = "";
    sound_position: string = "";
    timing: string = "";
    ext_field: string = "";

    constructor(pieceText: string, config: IMesPieceConfig,) {
        //ピースのブロックを改行で分割して、それぞれに対応するプロパティに格納する
        for (let line of pieceText.split(config.LineDelimiter)) {
            //行の種別を判定して、対応するプロパティに格納する
            //TODO: デコレータは可変に設定できるようにする
            let headChar = line.charAt(0);
            if (config.Decorator.matchCharactor(headChar)) {
                //character
                this.character += line.substring(1) + config.LineDelimiter;
            } else if (config.Decorator.matchComment(headChar)) {
                //comment
                this.comment += line.substring(1) + config.LineDelimiter;
            } else if (config.Decorator.matchSoundNote(headChar)) {
                //sound_note
                this.sound_note += line.substring(1) + config.LineDelimiter;
            } else if (config.Decorator.matchSoundPosition(headChar)) {
                //sound_position
                this.sound_position += line.substring(1) + config.LineDelimiter;
            } else if (config.Decorator.matchTiming(headChar)) {
                //timing
                this.timing += line.substring(1) + config.LineDelimiter;
            } else if (config.Decorator.matchExtField(headChar)) {
                //ext_field
                this.ext_field += line.substring(1) + config.LineDelimiter;
            } else {
                //dialogue
                this.dialogue += line + config.LineDelimiter;
            }
        }
        return this;
    }
}


// class Mes implements IMes {
//     body: IMesBody;
//     header: IMesHeader;
// }