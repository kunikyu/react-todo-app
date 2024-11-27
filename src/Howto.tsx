import React, { useState } from "react";

const Howto = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleButtonClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="ml-auto">
      <button
        onClick={handleButtonClick}
        className=" rounded-md bg-blue-500 p-2 text-white"
      >
        このアプリについて
      </button>
      {isPopupOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
          <div className="rounded-md bg-white p-5">
            <h3 className="text-lg font-bold">概要</h3>
            <p>
              やることがない人はTodoを使えないなんてことはありません。
              嘘のTodoを追加できます。
              <br />
              やることがない人も、やることがいっぱいある人も、このアプリを使って楽しくタスク管理しましょう。
              <br />
              <br />
              <a
                href="https://atcoder.jp/users/kunikyu"
                className="text-blue-600 underline"
              >
                作者 kunikyu
              </a>
            </p>
            <button
              onClick={handleClosePopup}
              className="mt-3 rounded-md bg-red-500 p-2 text-white"
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Howto;
