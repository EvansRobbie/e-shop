import React, { ReactNode } from "react";

const FormWrap = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-fit h-full flex items-center justify-center pb-12 pt-24">
      <div
        className="w-full max-w-[650px] flex flex-col gap-6 items-center shadow-xl
         shadow-slate-200 rounded-md p-4 md:p-8"
      >
        {children}
      </div>
    </div>
  );
};

export default FormWrap;
