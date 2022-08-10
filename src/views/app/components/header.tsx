import * as React from "react";
import { dispatch, PostContext } from "../post";

function Item({ onClick = () => {}, children, className = "" }) {
  return (
    <div
      className={`cursor-pointer hover:text-gray-800 dark:hover:text-gray-300
      ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

function Button({ children, className = "", style = {} }) {
  return (
    <div
      className={`inline-flex gap-2 rounded-md p-2 shadow-sm ring-1 ring-gray-900/5 dark:bg-gray-800 dark:text-gray-400 dark:ring-0 dark:shadow-highlight/4 ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

export function Header({ context }) {
  const { darkMode, setDarkMode, reload, categories } =
    React.useContext(context);
  const { currentPostID, setCurrentPostID, setPostHTML } =
    React.useContext(PostContext);

  const [cateVisible, setCateVisible] = React.useState(false);
  const [addUserGroupVisible, setAddUserGroupVisible] = React.useState(false);

  return (
    <header className="h-14 gap2 flex items-center justify-between border-b border-gray-200 p-3 text-gray-500 dark:border-gray-800 dark:bg-gray-900 fixed z-10 top-0 left-[20px] right-[20px] bg-white">
      {currentPostID ? (
        <Button>
          <Item
            onClick={() => {
              setCurrentPostID(null);
              setPostHTML("");
            }}
          >
            关闭
          </Item>
        </Button>
      ) : (
        <span />
      )}

      <div className="relative flex items-center">
        <Button>
          <Item onClick={reload}>刷新</Item>
          <Item
            className="relative"
            onClick={() => setAddUserGroupVisible(!addUserGroupVisible)}
          >
            <span>用户群</span>
            {addUserGroupVisible && <AddUserGroup />}
          </Item>
          <Item
            onClick={() => {
              setCateVisible(!cateVisible);
            }}
          >
            分类
          </Item>
          {/* <Item>收藏</Item> */}
          {/* <Item>阅读设置</Item> */}
          {/* <Item>屏蔽</Item> */}
          {/* <Item>分享</Item> */}
        </Button>

        <div className="hidden w-px h-6 mx-6 bg-gray-200 dark:bg-gray-700 sm:block lg:mx-4"></div>

        <Button>
          {/* <Item>禅模式</Item> */}
          <Item onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "浅色模式" : "暗色模式"}
          </Item>
        </Button>

        {cateVisible && (
          <Categories
            hide={() => {
              setCurrentPostID("");
              setPostHTML("");
              setCateVisible(false);
            }}
            categories={categories}
          />
        )}
      </div>
    </header>
  );
}

function Categories({ hide, categories }) {
  return (
    <Button
      className="absolute right-0 break-words bg-white ring-1 ring-gray-800 dark:bg-gray-900 "
      style={{ top: "calc(100% + 0.5rem)", wordBreak: "keep-all" }}
    >
      {categories.map((category) => (
        <Item
          key={category.id}
          onClick={() => {
            hide();
            dispatch({
              type: "SET_CURRENT_CATEGORY_ID",
              payload: { categoryID: category.id },
            });
          }}
        >
          {category.name}
        </Item>
      ))}
    </Button>
  );
}

function AddUserGroup() {
  return (
    <Button
      className="flex flex-col absolute left-1/2 break-words bg-white ring-1 ring-gray-800 dark:bg-gray-900 
     w-[200px] translate-x-1/2 gap-1"
      style={{
        top: "calc(100% + 0.5rem)",
        wordBreak: "keep-all",
        transform: "translateX(-50%)",
      }}
    >
      <img
        src="https://s2.loli.net/2022/08/10/w4FEUIQszedixmX.jpg"
        className="object-contain w-full h-auto"
      />
      <span>微信群聊二维码有过期时间</span>
      <span>添加作者邀请入群</span>
      <span>请加备注「VSCode掘金」</span>
    </Button>
  );
}
