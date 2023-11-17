// import React, { createContext, useState } from 'react'

// export const LoginContext = createContext("")

// const Context = (  {children}) => {
//     const  [ loginData, setLoginData ] = useState<any>("")
//   return (
//     <>
//     <LoginContext.Provider value={{loginData, setLoginData}}>
//         {children}
//     </LoginContext.Provider>
//     </>
//   )
// }
// export default Context



import React, { createContext, useState, ReactNode } from 'react';

export interface LoginContextType {
  loginData: any;
  setLoginData: React.Dispatch<React.SetStateAction<any>>;
}

export const LoginContext = createContext<LoginContextType>({
  loginData: '',
  setLoginData: () => {}
});

const Context: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loginData, setLoginData] = useState<any>('');

  return (
    <LoginContext.Provider value={{ loginData, setLoginData }}>
      {children}
    </LoginContext.Provider>
  );
};

export default Context;

