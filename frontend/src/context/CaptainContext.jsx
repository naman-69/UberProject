
import React, { createContext, useState ,useContext} from 'react';

export const captainDataContext = createContext();

// export const useCaptain = ()=>{
//     const context = useContext(CaptainContext);
//     if(!context){
//         throw new Error('useCaptain must be used within a CaptainProvider');
//     }
//     return context;
// }

const CaptainContext = ({children}) => {

    const [captain, setCaptain] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);

    const updateCaptain = (captainData)=>{
        setCaptain(captainData)
    };

    const value = {
        captain,
        setCaptain,
        isLoading,
        setIsLoading,
        error,
        setError,
        updateCaptain
    }

  return (
    <captainDataContext.Provider value={ value }>
      {children}
    </captainDataContext.Provider>
  )
}

export default CaptainContext
