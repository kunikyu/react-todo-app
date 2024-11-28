import React from "react";

type Props = {
  isPopUpVisible: number;
  setPopUpVisible: (isPopUpVisible: number) => void;
  setEditingTodoId: (value: string) => void;
  id: string;
};

const LiePop = (props: Props) => {
  const setPopUpVisible = props.setPopUpVisible;
  const isPopUpVisible = props.isPopUpVisible;
  const closePopUp = () => {
    if (isPopUpVisible === 3) {
      console.log("EditingTodoId: ", props.id);
      props.setEditingTodoId(props.id);
    }
    setPopUpVisible(0);
  };

  return (
    <div>
      {isPopUpVisible !== 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="size-full max-w-2xl rounded-md bg-gray-100 p-5 shadow-lg sm:h-2/3">
            {isPopUpVisible === 1 && (
              <p>嘘課題はおわらせることができないよねー。嘘なんだから</p>
            )}
            {isPopUpVisible === 2 && (
              <p>嘘は消すことができないんだよー。いつか消えるといいね</p>
            )}
            {isPopUpVisible === 3 && (
              <p>嘘に嘘を重ねるつもりなの？それに何の意味があるんだい</p>
            )}
            <button
              onClick={closePopUp}
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

export default LiePop;
