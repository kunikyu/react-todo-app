import React from "react";

// 引数の型を定義
// Propsという名前で定義することが一般的です。
type Props = {
  name: string;
};

// WelcomeMessage という関数コンポーネントの定義
// 関数コンポーネントはパスカルケースで名前を設定します。
const WelcomeMessage = (props: Props) => {
  // いわゆる普通のロジックを記述する
  const currentTime = new Date();
  const time =
    currentTime.getHours() - 6 >= 0
      ? currentTime.getHours() - 6
      : currentTime.getHours() + 18;
  const greeting =
    time < 5
      ? "ごきげんよう"
      : time < 11
        ? "こんにちは"
        : time < 17
          ? "こんばんは"
          : "徹夜ですか？";

  //【重要!】JSX構文で描いた「JSX要素」を return で返す
  return (
    <div className="font-serif font-bold text-black">
      {greeting}、{props.name}さん。
    </div>
  );
};

// 他のファイルで WelcomeMessage を import できるようにする
export default WelcomeMessage;
