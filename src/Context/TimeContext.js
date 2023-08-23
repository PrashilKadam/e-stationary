import React, {useContext} from 'react'


const TimeContext=React.createContext();
export function useTimeID(){
    return useContext(TimeContext);
}
export function TimeIdProvider({children}){
    
}