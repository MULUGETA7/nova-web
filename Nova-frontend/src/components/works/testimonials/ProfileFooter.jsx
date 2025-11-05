import React from "react";

function ProfileFooter({ image, name, title }) {
  return (
    <footer className="flex absolute bottom-3 left-3 items-center p-2.5 rounded-none h-[59px] w-[454px] max-sm:w-[calc(100%_-_24px)]">
      <img
        src={image}
        className="mr-3.5 h-[42px] rounded-[51.57px] w-[42px]"
        alt={`${name}'s profile`}
      />
      <div className="flex flex-col gap-0.5">
        <h3 className="text-sm font-bold leading-4 text-black">{name}</h3>
        <p className="text-xs leading-4 text-black text-opacity-50">{title}</p>
      </div>
    </footer>
  );
}

export default ProfileFooter;
