import createReducer from 'App/Redux/CreateReducer';
import * as TYPES from 'App/Redux/Types';
import * as Sessions from 'App/Storages/Sessions';

import langID from 'App/Components/Languages/id';
import langEN from 'App/Components/Languages/en';

/**
 * Counter Reducer
 */
export const counter = createReducer(0, {
  [TYPES.COUNTER](state, action) {
    return action.counter;
  }
});

/**
 * App Refresher
 */
export const refresh_app = createReducer(true, {
  [TYPES.REFRESH_APP](state, action) {
    return action.refresh_app;
  }
});

/**
 * images profile Reducer
 */
export const imgurl = createReducer(0, {
  [TYPES.IMAGESURL](state, action) {
    return action.imgurl;
  }
});



/**
 * NOTIF DATA REDUCER
 */
export const notif_data = createReducer([], {
  [TYPES.NOTIF_DATA](state, action) {
    return action.notif_data;
  }
});






/**
 * Username Reducer
 */
export const username = createReducer('', {
  [TYPES.USERNAME](state, action) {
    return action.username;
  }
});


/**
 * Get current lang
 */
export const currentLang = createReducer('id', {
  [TYPES.SET_LANG](state, action) {
    return action.set_lang;
  }
});




/**
 * get photo profile
 */
export const photoProfile = createReducer(null, {
  [TYPES.PHOTO_PROFILE](state, action) {
    return action.photoProfile;
  }
});



const getCurrentLanguage = () => {
  let initialLanguage = Sessions.getValue(Sessions.LANGUAGE) ? Sessions.getValue(Sessions.LANGUAGE) : 'id';
  switch (initialLanguage) {
    case 'id':
      return langID;
      break;
    default:
      return langEN;
      break;
  }
}

// Multilanguage 
export const language = createReducer(getCurrentLanguage(), {
  [TYPES.LANGUAGE](state, action) {
    return action.language;
  }
});

// isLogin
export const isLogin = createReducer(false, {
  [TYPES.ISLOGIN](state, action) {
    return action.isLogin;
  }
});


// Api Token
export const apiToken = createReducer(false, {
  [TYPES.API_TOKEN](state, action) {
    return action.apiToken;
  }
});

// userData
export const userData = createReducer({}, {
  [TYPES.USER_DATA](state, action) {
    return action.userData;
  }
});


// Default Testing 
export const testingDefault = createReducer('false', {
  [TYPES.DEFAULT_TESTING](state, action) {
    return action.testingDefault;
  }
});