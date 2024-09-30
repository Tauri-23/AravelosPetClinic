import { toast } from "react-toastify";





/*
|----------------------------------------
| Empty or spaces string checker
|----------------------------------------
*/
/**
 * 
 * @param {string} str
 */
export function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
}





/*
|----------------------------------------
| Toast and Modals
|----------------------------------------
*/
/**
@param {string} type - Type of toast (success, default, error).
@param {string} message - Message of the toast.
@param {string} position - Position of the toast (top-left, top-center, top-right, bottom-left bottom-center, bottom-right).
@param {number} ms - Duration of the toast in ms.
*/
export function notify(type, message, position, ms) {
    if(type == 'success') {
        toast.success(message, {
            position: position,
            autoClose: ms,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    else if(type === 'default') {
        toast(message, {
            position: position,
            autoClose: ms,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    else if(type === 'error') {
        toast.error(message, {
            position: position,
            autoClose: ms,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
}