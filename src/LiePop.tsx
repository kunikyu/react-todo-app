import React from "react";

type Props = {
  isPopUpVisible: number;
  setPopUpVisible: (isPopUpVisible: number) => void;
};

const LiePop = (props: Props) => {
  const setPopUpVisible = props.setPopUpVisible;
  const isPopUpVisible = props.isPopUpVisible;
  const togglePopUp = () => {
    if (isPopUpVisible !== 0) {
      setPopUpVisible(0);
      console.log("閉じる");
    }
  };

  return (
    <div>
      {isPopUpVisible === 1 && (
        <div className="fixed left-1/2 top-1/2 z-20 size-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-md bg-gray-100 p-5 shadow-lg sm:h-2/3">
          <p>嘘課題はおわらせることができないよねー。嘘なんだから</p>
          <button
            onClick={togglePopUp}
            className="ml-auto rounded-md bg-black px-2 py-1 text-sm font-bold text-white "
          >
            閉じる
          </button>
        </div>
      )}
      {isPopUpVisible === 2 && (
        <div className="fixed left-1/2 top-1/2 z-20 size-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-md bg-gray-100 p-5 shadow-lg sm:h-2/3">
          <p>嘘は消すことができないんだよー。いつか消えるといいね</p>
          <button
            onClick={togglePopUp}
            className="ml-auto rounded-md bg-black px-2 py-1 text-sm font-bold text-white "
          >
            閉じる
          </button>
        </div>
      )}
      {isPopUpVisible === 3 && (
        <div className="fixed left-1/2 top-1/2 z-20 size-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-md bg-gray-100 p-5 shadow-lg sm:h-2/3">
          <p>嘘に嘘を重ねるつもりなの？それに何の意味があるんだい</p>
          <button
            onClick={togglePopUp}
            className="ml-auto rounded-md bg-black px-2 py-1 text-sm font-bold text-white "
          >
            閉じる
          </button>
        </div>
      )}
    </div>
  );
};

export default LiePop;
