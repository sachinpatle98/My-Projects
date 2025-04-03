import axios from "axios"
import { LOGIN_USER_ERROR, LOGIN_USER_LOADING, LOGIN_USER_SUCCESS } from "./user_types"
import { BASE_URL } from "../../constants/config"
import { toast } from "react-toastify"


export const getUser = (obj) => async(dispatch) => {
    dispatch({type: LOGIN_USER_LOADING})
    try {
        let data = await axios(BASE_URL+"/user/login", {
        method: "post",
        data: obj
        })
        let {message, user, token, status} = data.data
        if(status == 1){
            dispatch({type: LOGIN_USER_SUCCESS, payload: {user, token}})
            toast.success(message, {
                position: "top-right"
            });
        }
        else
        {
            toast.error(message, {
                position: "top-right"
            });
            dispatch({type: LOGIN_USER_ERROR})
        }

    } catch (error) {
        toast.error(message, {
            position: "top-right"
        });
        dispatch({type: LOGIN_USER_ERROR})
    }
}