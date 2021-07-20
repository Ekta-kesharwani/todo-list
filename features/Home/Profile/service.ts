import { useState } from "react"
import { Auth } from "aws-amplify"
import { Details } from "../../../core/model/UserDetails"
import NetworkService, { NetworkServiceConst } from "../../../services/NetworkService/NetworkService"
import { TO_DO_LIST_API } from "../../../AppConstant"

export default function useProfile() {
    const [details, setDetails] = useState<Details[]>([])
    const [userName, setUserName] = useState(undefined)
    const [isLoading, setIsLoading] = useState(false)
    const getUserDetails = async () => {
        setIsLoading(true)
        const user = await Auth.currentAuthenticatedUser();
        const response = await new NetworkService().makeRequest(
            TO_DO_LIST_API,
            NetworkServiceConst.METHOD_GET,
            "",
            {
                Authorization: user.signInUserSession.idToken.jwtToken,
                "Content-Type": "application/json",
            }
        )
        setDetails([... response?.to_do_list])
        setUserName(response?.name)
        setIsLoading(false)
    }
    return {
        details, userName, isLoading, getUserDetails
    }
}