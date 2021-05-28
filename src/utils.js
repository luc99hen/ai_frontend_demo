import { useState } from "react";

export const useForceUpdate = () => {
    const [, setNewState] = useState(false);
    return () => setNewState(mySelf => !mySelf);
};