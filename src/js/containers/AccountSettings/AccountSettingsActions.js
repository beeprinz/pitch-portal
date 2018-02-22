import axios from "axios";

export function getUserInfo(userInfo) { 
    console.log('account settings actions userinfo', userInfo);
  return {
    type: "GET_USER_INFO",
    payload: userInfo  
}   
    //how to plug in city name at request?

  };
