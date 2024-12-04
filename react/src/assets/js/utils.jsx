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





/*
|----------------------------------------
| Date format
|----------------------------------------
*/
export const formatDateForMySQL = (dateString) => {
    // Parse the input date string into a JavaScript Date object
    const date = new Date(dateString);

    // Extract year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, add 1
    const day = String(date.getDate()).padStart(2, '0');

    // Set time to 00:00:00 since only the date is given
    const time = '00:00:00';

    // Construct the MySQL DATETIME format
    const mysqlDateTime = `${year}-${month}-${day} ${time}`;

    return mysqlDateTime;
}

export const formatDate = (date) => {
    const realDate = new Date(date);
    const options = {month: 'short', day: '2-digit', year: 'numeric'}
    return realDate.toLocaleDateString('en-PH', options);
}

export const getAge = (date) => {
    const birthDate = new Date(date); // Convert input date to Date object
    const today = new Date();
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();
    
    // Adjust age if birth date hasn't occurred yet this year
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        age--;
    }
    
    return age;
};