import i18next from 'i18next';
import { displayPopup } from './commonData';
import { logoutUser } from './userSlice';
import { StoreLabs } from './constants';

export function isEmptyObject(obj) {
  if (obj != undefined) {
    return !Object.keys(obj).length;
  }
}

export function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

export const handleResponse = (err, isSuccess, directValue) => async (dispatch) => {
  let value = '';
  let type = '';
  let time = 2000;
  let blob = err;
  if (isSuccess) {
    value = err ? err : '';
    type = 'success';
  } else {
    blob = blob && blob.response ? blob.response : {}
    if (!isEmptyObject(blob) && blob.data && blob.data == "Authentication Invalid") {
      value = 'SESSIONEXPIRED';
      type = 'error';
      time = 5000;
      dispatch(logoutUser());
    } else {
      value = 'SOMEWENTWRNG'; // err ? err : '';
      type = 'warning';
    }
  }

  if (value == '') {
    value = 'FISHY';
    type = 'warning';
  }

  if (window.location.pathname == '/login' && !isSuccess) {
    type = 'warning';
  }
  if (!directValue) {
    value = i18next.t(`navigation:${value}`)
  }
  else {
    if (directValue) {
      type = 'info';
      time = 4000;
    }
  }
  dispatch(displayPopup(value, type, time));
};

export function evenOrOdd(num) {
  //for string length take string
  if (num % 2 == 0) {
    //and replace numm with string.length here
    return "even";
  } else {
    return "odd";
  }
}

export function getStoreName(id) {
  let result = "";
  if (id) {
    const da = StoreLabs.filter(a => a.id == id);
    if (da && da.length > 0) {
      result = da[0].name;
    }
  }
  return result;
}