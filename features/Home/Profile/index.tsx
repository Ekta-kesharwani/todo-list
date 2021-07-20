import React, { useEffect } from "react"
import Loader from "../../../components/Loader"
import useProfile from "./service"
const Index = () => {
    const service = useProfile()
    useEffect(() => {
        service.getUserDetails()
    }, [])
    

    return (
        <>
            {service.isLoading ? (
                <Loader />
            ) : (
                <div className="m-4 ">
                    <h3 className="font-weight-bold">Hello {service.userName}</h3>
                    <img src="/user.png" className="d-block"/>
                    <h5 className="font-weight-bold mt-4">You have {service.details?.length} lists</h5>
                </div>
            )}
        </>

    )

}
export default Index