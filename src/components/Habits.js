import { useContext } from "react"
import UserContext from "../contexts/UserContext"

export default function Habits(){
    
    let {token, setToken} = useContext(UserContext);
    let body = {
        Authorization: `Bearer ${token}`
    }
    return(
        <>
            Habitos
        </>
    )
}