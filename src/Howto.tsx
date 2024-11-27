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
                target="_blank"
                className="text-blue-600 underline"
              >
                作者 kunikyu
              </a>
            </p>
            <h3 className="mt-3 text-lg font-bold">使い方</h3>
            <ol className="list-decimal pl-5">
              <li>新しいタスクを追加する</li>
              <p>
                <button
                  type="button"
                  className="mr-2 rounded-md border border-green-700 bg-green-500 px-3 py-1 font-bold text-white hover:bg-green-600"
                >
                  新しいタスクの追加
                </button>
                を押せ
              </p>
              <li>タスクを編集する</li>
              <p>
                編集したいタスクの
                <button className="mx-2 rounded-md bg-slate-200 px-2 py-1 text-sm font-bold text-white hover:bg-blue-500">
                  編集
                </button>
                を押せ
              </p>
              <li>タスクを削除する</li>
              <p>
                削除したいタスクの
                <button className="mx-2 rounded-md bg-slate-200 px-2 py-1 text-sm font-bold text-white hover:bg-red-500">
                  削除
                </button>
                を押せ
              </p>
              <li>タスクを完了する</li>
              <p>
                完了したタスクの
                <input
                  type="checkbox"
                  checked={false}
                  onChange={() => {}}
                  className="mx-2 cursor-pointer"
                />
                を押せ
              </p>
              <li>完了したタスクを削除する</li>
              <p>
                <button className="mr-2 rounded-md border border-red-700 bg-red-500 px-3 py-1 font-bold text-white hover:bg-red-600">
                  完了済みのタスクを削除
                </button>
                を押せ
              </p>
            </ol>
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
