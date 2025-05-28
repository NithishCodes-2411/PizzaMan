// import firebase from '../../firebase/firebase'

// import * as actionTypes from './actionTypes'


// const db = firebase.firestore()

// export const placeOrderInitialize = () => {
//     return {
//         type: actionTypes.PLACE_ORDER_INIT
//     }
// }

// export const placeOrderInit = () => {
//     return {
//         type: actionTypes.PLACE_ORDER
//     }
// }

// export const placeOrderSuccess = () => {
//     return {
//         type: actionTypes.PLACE_ORDER_SUCCESS
//     }
// }

// export const placeOrderFail = (error) => {
//     return {
//         type: actionTypes.PLACE_ORDER_FAIL,
//         payload: {
//             error: error
//         }
//     }
// }

// export const placeOrder = (data) => {
//     return dispatch => {
//         dispatch(placeOrderInit())
//         const dataRef = db.collection('orders').doc()
//         dataRef.set({
//             ...data,
//             ts: Math.round(new Date().getTime())
//         })
//             .then(() => {
//                 dispatch(placeOrderSuccess())
//             })
//             .catch((error) => dispatch(placeOrderFail(error.message)))
//     }
// }

import dynamoDB from '../../firebase/firebase';
import * as actionTypes from './actionTypes';

const tableName = 'orders';

export const placeOrderInitialize = () => {
  return {
    type: actionTypes.PLACE_ORDER_INIT,
  };
}

export const placeOrderInit = () => {
  return {
    type: actionTypes.PLACE_ORDER,
  };
}

export const placeOrderSuccess = () => {
  return {
    type: actionTypes.PLACE_ORDER_SUCCESS,
  };
}

export const placeOrderFail = (error) => {
  return {
    type: actionTypes.PLACE_ORDER_FAIL,
    payload: {
      error: error,
    },
  };
}

export const placeOrder = (user, data) => {
  console.log("User insider place order: ", user);
  return dispatch => {
    dispatch(placeOrderInit());
    const params = {
      TableName: tableName,
      Item: {
        uid: user.address.uid,
        orderId: Math.round(new Date().getTime()),
        ...data,
        ts: Math.round(new Date().getTime()),
      },
    };

    dynamoDB.put(params, (err) => {
      if (err) {
        dispatch(placeOrderFail(err.message));
      } else {
        dispatch(placeOrderSuccess());
      }
    });
  }
}
