import { MesPiece, MesConfig, MesSection } from "./mes"


test("MesPieceTest", () => {
    const config = new MesConfig();
    const pieceText = `＠ニカ（＠はキャラ名のデコレーター）
＃場所は駅前（＃はコメント全般のデコレーター）
＄駅前の音（＄は音響指示のデコレーター）
！正面（！はサウンドポジション）
あ、キタキタ。女の子二人を待たせるなんて、失礼だぞ。`

    const mesPiece = new MesPiece(pieceText, config);
    expect(mesPiece.character).toBe("ニカ（＠はキャラ名のデコレーター）\n");
    expect(mesPiece.comment).toBe("場所は駅前（＃はコメント全般のデコレーター）\n");
    expect(mesPiece.sound_note).toBe("駅前の音（＄は音響指示のデコレーター）\n");
    expect(mesPiece.sound_position).toBe("正面（！はサウンドポジション）\n");
    expect(mesPiece.dialogue).toBe("あ、キタキタ。女の子二人を待たせるなんて、失礼だぞ。\n");

});

//TODO: MesSectionの実装を行う
test("MesSection", () => {
    const config = new MesConfig();
    const sectionText = `＠ニカ（＠はキャラ名のデコレーター）
＃場所は駅前（＃はコメント全般のデコレーター）
＄駅前の音（＄は音響指示のデコレーター）
！正面（！はサウンドポジション）
あ、キタキタ。女の子二人を待たせるなんて、失礼だぞ。

＠ニカ（＠はキャラ名のデコレーター）
＃場所は駅前（＃はコメント全般のデコレーター）
＄駅前の音（＄は音響指示のデコレーター）
！正面（！はサウンドポジション）
あ、キタキタ。女の子二人を待たせるなんて、失礼だぞ。
`

    const mesPiece = new MesSection({name: "sample", text: sectionText, config: config});

});

