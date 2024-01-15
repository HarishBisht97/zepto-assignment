import React from "react";

const ListItem = ({ user }) => {
  return (
    <div className="flex hover:bg-gray-200">
      <div className="ml-10 flex flex-row  py-2 pr-3 justify-center items-center ">
        <img src={user?.avatar} alt="Avatar" className="h-8 w-8 rounded-full" />
        <h1 className="mr-2 pl-2 font-semibold">{user?.label}</h1>
        <h1 className="pl-2 font-light">{user?.email}</h1>
      </div>
    </div>
  );
};

export default ListItem;
