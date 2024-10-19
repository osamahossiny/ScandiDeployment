import { useEffect } from "react"
import { useParams } from "react-router"

export const ParamChecker = ({handleChange, paramName}) => {
    const param = useParams()[paramName]
    
    useEffect(()=>{
      handleChange(param)
    },[param])

    return(null)
}