import React from "react";

const Container = ({ children }) => {
  return (
    <div className="container mx-auto bg-white p-4 sm:p-8 max-w-xs sm:mt-8">
      {children}
    </div>
  );
};

export default Container;
