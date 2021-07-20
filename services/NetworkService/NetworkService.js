import { Auth } from "aws-amplify";
export const NetworkServiceConst = {
  METHOD_POST: "POST",
  METHOD_GET: "GET",
  METHOD_PUT: "PUT",
  METHOD_DELETE: "DELETE"
}
class NetworkService{
  makeRequest = async (url, method = NetworkServiceConst.METHOD_GET, body = {}, headers = {}) => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      if(user){
        headers = {...headers, "Authorization" : user?.signInUserSession?.idToken?.jwtToken}
      }
    } catch (error) {
        console.log("User not authenticated. Cannot attach authorization header.")
    }
    try {
      let attributes= {}
      switch (method){
        case NetworkServiceConst.METHOD_GET: {
          headers = {...headers, "Content-Type": "application/json"}
          attributes.headers = headers
          attributes.method = method
        }
        break
        case NetworkServiceConst.METHOD_POST:{
          headers = {...headers, "Content-Type": "application/json"}
          attributes.headers = headers
          attributes.method = method
          attributes.body = JSON.stringify(body)
        }
        break
        case NetworkServiceConst.METHOD_PUT:{
          headers = {...headers, "Content-Type": "application/json"}
          attributes.headers = headers
          attributes.method = method
          attributes.body = JSON.stringify(body)
        }
        break
        case NetworkServiceConst.METHOD_DELETE:{
            console.log(method)
          headers = {...headers, "Content-Type": "application/json"}
          attributes.headers = headers
          attributes.method = method
          attributes.body = JSON.stringify(body)
        }
      }
      console.log("url",url)
      const response = await fetch(url,attributes)
      const jsonResponse = await response.json()
      if(!jsonResponse.success && !jsonResponse.message && !jsonResponse.responseData){
        throw {
          code: "IllegalResponseException",
          message: "The network response contains invalid object"
        }
      }else {
        if(jsonResponse.success !== true){
          throw {
            code: "RequestFailedException",
            message: jsonResponse.message
          }
        }else {
          return jsonResponse.responseData
        }
      }
    }catch (e) {
      console.error(e)
      throw e;
    }
  }
}
export default NetworkService