import Image from "next/image";
import React, { FC } from "react";
interface AvatarProps {
  src?: string | null | undefined;
  user?: any;
}

const getAbbreviation = (name: string) => {
  const words = name.split(" ");

  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  } else {
    const nameAbrreviation = words.reduce((acc: string, word: string) => {
      return acc + word.charAt(0).toUpperCase();
    }, " ");
    return nameAbrreviation;
  }
};

const Avatar: FC<AvatarProps> = ({ src, user }) => {
  if (src) {
    <Image
      src={src}
      alt="Avatar"
      width={30}
      height={30}
      className="rounded-full"
    />;
  } else {
  }
  //   console.log(product);
  return (
    <>
      {src ? (
        <Image
          src={src}
          alt="Avatar"
          width={30}
          height={30}
          className="rounded-full"
        />
      ) : (
        <div className="flex items-center justify-center font-semibold bg-gray-200 w-10 h-10 rounded-full">
          {getAbbreviation(user)}
        </div>
      )}
    </>
  );
};

export default Avatar;
