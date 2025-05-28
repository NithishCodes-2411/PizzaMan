// import * as actionTypes from './actionTypes'

// import firebase from '../../firebase/firebase'

// const db = firebase.firestore()

// // Fetching address
// export const getAddressInit = () => {
//     return {
//         type: actionTypes.GET_ADDRESS
//     }
// }

// export const getAddressSuccess = (address) => {
//     return {
//         type: actionTypes.GET_ADDRESS_SUCCESS,
//         payload: {
//             address: address
//         }
//     }
// }

// export const getAddressFail = (error) => {
//     return {
//         type: actionTypes.GET_ADDRESS_FAIL,
//         payload: {
//             error: error
//         }
//     }
// }

// export const getAddress = (user) => {
//     return dispatch => {
//         if (user) {
//             dispatch(getAddressInit())
//             db.collection('users').doc(user.uid).get()
//                 .then(snapshot => {
//                     if (snapshot.exists) {
//                         dispatch(getAddressSuccess(snapshot.data()))
//                     } else {
//                         dispatch(getAddressFail("No Address Found"))
//                     }
//                 })
//                 .catch(error => dispatch(getAddressFail(error.message)))
//         }
//     }
// }

// // Adding address
// export const addAddressInit = () => {
//     return {
//         type: actionTypes.ADD_ADDRESS
//     }
// }

// export const addAddressSuccess = (address) => {
//     return {
//         type: actionTypes.ADD_ADDRESS_SUCCESS,
//         payload: {
//             address: address
//         }
//     }
// }

// export const addAddressFail = (error) => {
//     return {
//         type: actionTypes.ADD_ADDRESS_FAIL,
//         payload: {
//             error: error
//         }
//     }
// }

// export const addAddress = (user, address, isNewData = true) => {
//     return dispatch => {
//         dispatch(addAddressInit())
//         if (isNewData) {
//             db.collection('users').doc(user.uid).set({ ...address })
//                 .then(() => dispatch(getAddressSuccess(address)))
//                 .catch(error => dispatch(getAddressFail(error.message)))
//         } else {
//             db.collection('users').doc(user.uid).update({ ...address })
//                 .then(() => dispatch(getAddressSuccess(address)))
//                 .catch(error => dispatch(getAddressFail(error.message)))
//         }
//     }
// }

// // Clearing address
// export const clearAddress = () => {
//     return {
//         type: actionTypes.CLEAR_ADDRESS
//     }
// }

import * as actionTypes from './actionTypes';
import dynamoDB from '../../firebase/firebase';

const tableName = 'users';

// Fetching address
export const getAddressInit = () => {
  return {
    type: actionTypes.GET_ADDRESS,
  };
}

export const getAddressSuccess = (address) => {
  return {
    type: actionTypes.GET_ADDRESS_SUCCESS,
    payload: {
      address: address,
    },
  };
}

export const getAddressFail = (error) => {
  return {
    type: actionTypes.GET_ADDRESS_FAIL,
    payload: {
      error: error,
    },
  };
}

export const getAddress = (user) => {
  return dispatch => {
    if (user) {
      console.log("User Details Inside Address: ", user);
      dispatch(getAddressInit());
      const params = {
        TableName: tableName,
        Key: { uid: user.username },
      };

      dynamoDB.get(params, (err, data) => {
        if (err) {
          dispatch(getAddressFail(err.message));
        } else if (data.Item) {
          dispatch(getAddressSuccess(data.Item));
        } else {
          dispatch(getAddressFail("No Address Found"));
        }
      });
    }
  };
}

// Adding address
export const addAddressInit = () => {
  return {
    type: actionTypes.ADD_ADDRESS,
  };
}

export const addAddressSuccess = (address) => {
  return {
    type: actionTypes.ADD_ADDRESS_SUCCESS,
    payload: {
      address: address,
    },
  };
}

export const addAddressFail = (error) => {
  return {
    type: actionTypes.ADD_ADDRESS_FAIL,
    payload: {
      error: error,
    },
  };
}

export const addAddress = (user, address, isNewData = true) => {
  return dispatch => {
    dispatch(addAddressInit());
    const params = {
      TableName: tableName,
      Item: { uid: user.username, ...address },
    };

    if (isNewData) {
      dynamoDB.put(params, (err) => {
        if (err) {
          dispatch(getAddressFail(err.message));
        } else {
          dispatch(getAddressSuccess(address));
        }
      });
    } else {
      dynamoDB.update(params, (err) => {
        if (err) {
          dispatch(getAddressFail(err.message));
        } else {
          dispatch(getAddressSuccess(address));
        }
      });
    }
  };
}

// Clearing address
export const clearAddress = () => {
  return {
    type: actionTypes.CLEAR_ADDRESS,
  };
}
