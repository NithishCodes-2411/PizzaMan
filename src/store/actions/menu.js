// import axios from '../../axios/axios'

// import * as actionTypes from './actionTypes'


// export const getMenu = () => {
//     return {
//         type: actionTypes.GET_MENU
//     }
// }

// export const getMenuSuccess = menu => {
//     return {
//         type: actionTypes.GET_MENU_SUCCESS,
//         payload: {
//             menu: menu
//         }
//     }
// }

// export const getMenuFail = error => {
//     return {
//         type: actionTypes.GET_MENU_FAIL,
//         payload: {
//             error: error
//         }
//     }
// }

// export const initMenu = () => {
//     return dispatch => {
//         dispatch(getMenu())
//         axios.get("/menu.json")
//             .then(response => (
//                 dispatch(getMenuSuccess(response.data))
//             ))
//             .catch(error => dispatch(getMenuFail(error.message)))
//     }
// }

import dynamoDB from '../../firebase/firebase';
import * as actionTypes from './actionTypes';

const tableName = 'Products'; // Update the table name based on your DynamoDB setup

export const getMenu = () => {
  return {
    type: actionTypes.GET_MENU,
  };
};

export const getMenuSuccess = (menu) => {
  return {
    type: actionTypes.GET_MENU_SUCCESS,
    payload: {
      menu: menu,
    },
  };
};

export const getMenuFail = (error) => {
  return {
    type: actionTypes.GET_MENU_FAIL,
    payload: {
      error: error,
    },
  };
};

export const initMenu = () => {
  return (dispatch) => {
    dispatch(getMenu());

    const params = {
      TableName: tableName,
    };

    dynamoDB.scan(params, (err, data) => {
      if (err) {
        dispatch(getMenuFail(err.message));
      } else {
        console.log("Data from DB: ", data);
        console.log("Data from DB1: ", data.Items);
        dispatch(getMenuSuccess(data.Items));
      }
    });
  };
};
