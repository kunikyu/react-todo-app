import React from "react";

type Props = {
  isPopUpVisible: boolean;
  setPopUpVisible: (isPopUpVisible: boolean) => void;
};

const LiePop = (props: Props) => {
  const setPopUpVisible = props.setPopUpVisible;
  const isPopUpVisible = props.isPopUpVisible;
  const togglePopUp = () => {
    setPopUpVisible(!isPopUpVisible);
  };

  return (
    <div>
      {isPopUpVisible && (
        <div className="fixed left-1/2 top-1/2 z-10 size-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-md bg-gray-100 p-5 shadow-lg sm:h-2/3">
          <p>嘘課題はおわらせることができないよねー。嘘なんだから</p>
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
