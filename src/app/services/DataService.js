import { env } from '../../env'
const { REACT_APP_API_ENDPOINT } = env;

// *** baseURL & version control ****
const serverUri = REACT_APP_API_ENDPOINT;
const BASE_URL = serverUri;

// *** headers ***
const lockHeader = {
  'Content-Type': 'application/json',
  // Authorization: `Bearer ${localStorage.getItem('userguid')}`,
  "Access-Control-Allow-Origin": BASE_URL,
  "Access-Control-Allow-Credentials": true,
  // 'Content-Type': 'application/json',
  // // 'x-api-version': `${version}`,
  // Authorization: `Bearer ${localStorage.getItem('userguid')}`,
};
const openHeader = {
  'Content-Type': 'application/json',
  // 'x-api-version': `${version}`,
};

// *** URIs ***
const GATEWAY_LOGIN = '/user/login';
const GATEWAY_REGISTER = '/user/register';
const GATEWAY_ALL_COMPANIES = '/company/getallmodules';
const GATEWAY_COMPANY_MODULE = '/company/getmodulebycompany';


const GATEWAY_CREATEUSER = '/user/create';
const GATEWAY_GETREGUSER = '/auth/showregisterusers';
const GATEWAY_CREATEITEM = '/item/create';
const GATEWAY_GETITEM = '/static';
const GATEWAY_LOGOUT = '/auth/logout';
const GATEWAY_UPDATE_PASS = '/auth/updatepassword';
const GATEWAY_LOGS = '/logs';
const GATEWAY_GETTING = '/getting';
const GATEWAY_RENTING = '/renting';
const GATEWAY_MAINTAINACE = '/maintenance';
const GATEWAY_DASHBAORD = '/dashboard';
const GATEWAY_SPREADSHEET = '/spreadsheet';

// eslint-disable-next-line camelcase
const axios_1 = require('axios');

function _postCustom(url, data) {
  const axiosCustom = axios_1.default.create({
    baseURL: BASE_URL,
    headers: lockHeader,
    withCredentials: true, //IMPORTANT!!!! this is to set httpOnly cookie which contained jwt token for our scenario 
  });
  return axiosCustom.post(url, data);
}

function _patchCustom(url, data) {
  const axiosCustom = axios_1.default.create({
    baseURL: BASE_URL,
    headers: lockHeader,
    withCredentials: true, //IMPORTANT!!!! this is to set httpOnly cookie which contained jwt token for our scenario 
  });
  return axiosCustom.patch(url, data);
}

function _postCustomWithoutContent(url, data) {
  const axiosCustom = axios_1.default.create({
    baseURL: BASE_URL,
    headers: {
      // Authorization: `Bearer ${localStorage.getItem('userguid')}`,
      "Access-Control-Allow-Origin": BASE_URL,
      "Access-Control-Allow-Credentials": true,
    },
  });
  return axiosCustom.post(url, data);
}

function _getCustom(url, data, isBuffer) {
  const axiosCustom = axios_1.default.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': isBuffer ? 'blob' : 'application/json',
      "Access-Control-Allow-Origin": BASE_URL,
      "Access-Control-Allow-Credentials": true,
    },
    withCredentials: true, //IMPORTANT!!!! this is to set httpOnly cookie which contained jwt token for our scenario 
    responseType: isBuffer ? "arraybuffer" : "json",
  });
  return axiosCustom.get(url, data);
}

function _postWithOutHeader(url, data) {
  const axiosCustom = axios_1.default.create({
    baseURL: BASE_URL,
    headers: openHeader,
  });
  return axiosCustom.post(url, data);
}

function _putCustom(url, data) {
  const axiosCustom = axios_1.default.create({
    baseURL: BASE_URL,
    headers: lockHeader,
    withCredentials: true, //IMPORTANT!!!! this is to set httpOnly cookie which contained jwt token for our scenario 
  });
  return axiosCustom.put(url, data);
}

function _deleteCustom(url, data) {
  const axiosCustom = axios_1.default.create({
    baseURL: BASE_URL,
    headers: lockHeader,
    withCredentials: true, //IMPORTANT!!!! this is to set httpOnly cookie which contained jwt token for our scenario 
  });
  return axiosCustom.delete(url, data);
}

//////////////////////////////

function loginService(body) {

  return new Promise((resolve, reject) => {
    _postCustom(GATEWAY_LOGIN, body)
      .then((res) => {

        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function registerService(body) {
  return new Promise((resolve, reject) => {
    _postCustom(GATEWAY_REGISTER, body)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function addUserService(body) {
  return new Promise((resolve, reject) => {
    _postCustom(GATEWAY_CREATEUSER, body)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function addItemService(body) {
  return new Promise((resolve, reject) => {
    _postCustom(GATEWAY_CREATEITEM, body)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function getAllCompaniesService(body) {
  return new Promise((resolve, reject) => {
    _getCustom(GATEWAY_ALL_COMPANIES)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function logoutService() {
  return new Promise((resolve, reject) => {
    _getCustom(GATEWAY_LOGOUT)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function getCompanyModuleService(body) {
  return new Promise((resolve, reject) => {
    const queryString = body ? body : "";
    _getCustom(GATEWAY_COMPANY_MODULE + queryString)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function getAllUsersService(body, isReg) {
  return new Promise((resolve, reject) => {
    const queryString = body ? body : "";
    _getCustom(isReg ? `${GATEWAY_GETREGUSER + queryString}` : `${GATEWAY_CREATEUSER + queryString}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function updatePassService(body) {
  return new Promise((resolve, reject) => {
    _patchCustom(GATEWAY_UPDATE_PASS, body)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function deleteItemService(body) {
  return new Promise((resolve, reject) => {
    _deleteCustom(GATEWAY_CREATEITEM + "/" + body)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function deleteUserService(body) {
  return new Promise((resolve, reject) => {
    _deleteCustom(GATEWAY_CREATEUSER + "/" + body)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function deleteRegisterService(body) {
  return new Promise((resolve, reject) => {
    _deleteCustom(GATEWAY_GETREGUSER + "/" + body)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function changeStatusMaintainService(body) {
  return new Promise((resolve, reject) => {
    _postCustom(GATEWAY_GETTING, body)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function changeStatusService(body, type) {
  return new Promise((resolve, reject) => {
    _postCustom(type == 'rent' ? GATEWAY_RENTING :
      type == 'avail' ? GATEWAY_GETTING :
        type == 'maint' ? GATEWAY_MAINTAINACE : '', body)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function dashboardService() {
  return new Promise((resolve, reject) => {
    _getCustom(GATEWAY_DASHBAORD)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function spreadSheetService(body) {
  return new Promise((resolve, reject) => {
    const SerialNo = body.SerialNo ? `&SerialNo=${body.SerialNo}` : "";
    const status = body.status ? `&status=${body.status}` : "";
    const present_storenumber = body.present_storenumber ? `&present_storenumber=${body.present_storenumber}` : "";
    const rentee = body.rentee ? `&rentee=${body.rentee}` : "";
    const name = body.name ? `&name=${body.name}` : "";
    const itemid = body.itemid ? `&itemid=${body.itemid}` : "";
    const rentee_id = body.rentee_id ? `&rentee_id=${body.rentee_id}` : "";
    const type = `?type=${body.type ? body.type : "items"}${SerialNo + status + present_storenumber + rentee + name + itemid + rentee_id}`;
    _getCustom(GATEWAY_SPREADSHEET + type, false, true)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

const dataServiceMethods = {
  getAllCompaniesService,

  loginService,
  registerService,
  addUserService,
  addItemService,
  logoutService,
  updatePassService,
  getAllUsersService,
  deleteItemService,
  deleteUserService,
  deleteRegisterService,
  changeStatusService,
  dashboardService,
  spreadSheetService,
};

export default dataServiceMethods;
