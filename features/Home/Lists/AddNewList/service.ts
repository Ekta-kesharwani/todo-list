import { Auth } from "aws-amplify";
import { useState } from "react"
import { Details } from "../../../../core/model/UserDetails";
import { NewItemEmitter, NewItemsEmitterActions } from "../../../../utils/NewItemsEmitter";
import NetworkService, {
    NetworkServiceConst,
} from "../../../../services/NetworkService/NetworkService";
import { TO_DO_LIST_API } from "../../../../AppConstant";

export default function useLists() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isAddlistComponentShow, setIsAddlistComponentShow] = useState<boolean>(false)
    const [newListError, setnewListError] = useState<string | undefined>(undefined)
    const [newList, setNewList] = useState<Details>({
        title: "",
        list_items: [
            {
                item: "",
                checked: false
            }
        ]
    })

    const addNewListItem = () => {
        newList?.list_items?.push(
            {
                item: "",
                checked: false
            }
        )
        setNewList({ ...newList })
    }

    const toggleNewItemsCheck = (index: number) => {
        newList.list_items[index].checked = !newList?.list_items[index]?.checked
        setNewList({ ...newList })
    }
    const addNewListItemName = (index: number, itemValue: string) => {
        setnewListError(undefined)
        newList.list_items[index].item = itemValue
        setNewList({ ...newList })
    }
    const addNewListTitle = (title: string) => {
        setnewListError(undefined)
        newList.title = title
        setNewList({ ...newList })
    }
    const saveNewList = async () => {
        setnewListError(undefined)
        if (newList.title === "" || (newList.list_items?.some(eachItem => eachItem.item === ""))) {
            setnewListError("Please enter the values")
        }
        else {
            setIsLoading(true)
            try {
                const user = await Auth.currentAuthenticatedUser();
                const body = {
                    title: newList.title,
                    list: newList.list_items
                }
                await new NetworkService().makeRequest(
                    TO_DO_LIST_API,
                    NetworkServiceConst.METHOD_POST,
                    body,
                    {
                        Authorization: user.signInUserSession.idToken.jwtToken,
                        "Content-Type": "application/json",
                    }
                )
                setIsAddlistComponentShow(false)
                NewItemEmitter.emit("action", NewItemsEmitterActions.NewItemAdded)
                setNewList({
                    title: "",
                    list_items: [
                        {
                            item: "",
                            checked: false
                        }
                    ]
                })

            }
            catch (e) {
                console.log(e)
            }

        }

    }

    return {
        isLoading, setIsAddlistComponentShow, isAddlistComponentShow,
        newList, setNewList, addNewListItem, toggleNewItemsCheck, addNewListItemName, saveNewList,
        addNewListTitle, newListError
    }
}