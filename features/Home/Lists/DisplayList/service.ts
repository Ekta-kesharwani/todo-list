import { Auth } from "aws-amplify";
import { useState } from "react"
import { Details } from "../../../../core/model/UserDetails";
import NetworkService, {
    NetworkServiceConst,
} from "../../../../services/NetworkService/NetworkService";
import { TO_DO_LIST_API } from "../../../../AppConstant";

export default function useLists() {
    const [details, setDetails] = useState<Details[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

  
    const toggleListEdit = (index: number) => {
        console.log("here")
        details[index].isEditable = !details[index].isEditable
        setDetails([...details])
        console.log("details", details)
    }
    
    const addItem = (index: number) => {
        details[index].list_items?.push({
            item: "",
            checked: false
        })
        setDetails([...details])
    }
    const changeListItemName = (index: number, itemIndex: number, itemValue: string) => {
        details[index].error=undefined
        details[index].list_items[itemIndex].item = itemValue
        setDetails([...details])
    }
    
    const toggleListItemsCheck = (index: number, itemIndex: number,) => {
        details[index].list_items[itemIndex].checked = !details[index].list_items[itemIndex].checked
        setDetails([...details])
    }
    const getUserDetails = async () => {
        setIsLoading(true)
        const user = await Auth.currentAuthenticatedUser();
        try {
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
        }
        catch (e) {
            console.log(e)
        }
        setIsLoading(false)

    }
    const deleteList = async (list_id: string) => {
        try {
            setIsLoading(true)
            const user = await Auth.currentAuthenticatedUser();
            const body = { list_id: list_id }
            await new NetworkService().makeRequest(
                TO_DO_LIST_API,
                NetworkServiceConst.METHOD_DELETE,
                body,
                {
                    Authorization: user.signInUserSession.idToken.jwtToken,
                    "Content-Type": "application/json",
                }
            )
            
        }
        catch (e) {
            console.log(e)
        }
    }

    const updateListItems = async (list_id: string, index: number) => {
        console.log(details[index].list_items.some(eachItem => eachItem.item === ""))
        console.log(details[index])
        if (details[index].list_items.some(eachItem => eachItem.item === "")) {
            details[index].error = "Please enter the values"
            setDetails([...details])
        }
        else {
            setIsLoading(true)
            const updatedList = details.filter(eachList => eachList.list_id === list_id)[0]
            try {
                const user = await Auth.currentAuthenticatedUser();
                const body = {
                    list_id: updatedList.list_id,
                    list_items: updatedList.list_items
                }
                console.log("body", body)
                await new NetworkService().makeRequest(
                    TO_DO_LIST_API,
                    NetworkServiceConst.METHOD_PUT,
                    body,
                    {
                        Authorization: user.signInUserSession.idToken.jwtToken,
                        "Content-Type": "application/json",
                    }
                )
                details[index].isEditable = false
                setDetails([...details])
            }
            catch (e) {
                console.log(e)
            }
            setIsLoading(false)
        }

    }
    return {
        details, getUserDetails, deleteList, isLoading,
        toggleListEdit, changeListItemName, toggleListItemsCheck, addItem,
        updateListItems
    }
}