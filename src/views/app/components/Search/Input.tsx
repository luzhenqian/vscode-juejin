import * as React from "react";
import { Close } from "../Icons/close";
import { Loading } from "../loading";

export type InputProps = {
  onSearch: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClose: () => void;
  placeholder?: string;
  searching?: boolean;
};

export function Input(props: InputProps) {
  const { onSearch, onClose, placeholder, searching } = props;
  React.useEffect(() => {
    document.addEventListener("keydown", closeHandle);
    return () => document.removeEventListener("keydown", closeHandle);
  }, []);
  const searchHandle = (event) => {
    if (event.keyCode === 13) {
      return onSearch(event.target.value);
    }
  };
  const closeHandle = (event) => {
    if (event.keyCode === 27) {
      return onClose();
    }
  };

  return (
    <div className="sticky top-0 flex items-center justify-center px-4 pt-2 bg-white dark:bg-slate-800">
      {searching ? (
        <Loading className="w-6 h-6" />
      ) : (
        <svg
          className="w-8 h-8 fill-gray-400 dark:fill-gray-300"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="5903"
          width="200"
          height="200"
        >
          <path
            d="M469.333 192c153.174 0 277.334 124.16 277.334 277.333 0 68.054-24.534 130.411-65.216 178.688L846.336 818.24l-48.341 49.877L630.4 695.125a276.053 276.053 0 0 1-161.067 51.542C316.16 746.667 192 622.507 192 469.333S316.16 192 469.333 192z m0 64C351.51 256 256 351.51 256 469.333s95.51 213.334 213.333 213.334 213.334-95.51 213.334-213.334S587.157 256 469.333 256z"
            p-id="5904"
          ></path>
        </svg>
      )}

      <input
        className="flex-1 p-2 text-lg bg-transparent focus:outline-none"
        placeholder={placeholder}
        autoFocus
        onKeyDown={searchHandle}
        disabled={searching}
      />
      <span onClick={onClose}>
        <Close className="w-8 h-8 fill-gray-400 dark:fill-gray-300" />
      </span>
    </div>
  );
}
