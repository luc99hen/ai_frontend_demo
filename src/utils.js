import { useState, useRef, useEffect } from "react";

export const useForceUpdate = () => {
    const [, setNewState] = useState(false);
    return () => setNewState(mySelf => !mySelf);
};

export function useInterval(callback, delay) {
    const savedCallback = useRef(callback)
  
    // Remember the latest callback if it changes.
    useEffect(() => {
      savedCallback.current = callback
    }, [callback])
  
    // Set up the interval.
    useEffect(() => {
      // Don't schedule if no delay is specified.
      if (delay === null) {
        return
      }
  
      const id = setInterval(() => savedCallback.current(), delay)
  
      return () => clearInterval(id)
    }, [delay])
  }

  // 小数转百分数，
  // keep 保留几位
  export function float2percent(num, keep){
    const res = Number(num*100).toFixed(keep); 
    return isNaN(res) ? 0 : res;
  }