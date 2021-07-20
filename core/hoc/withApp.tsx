import { Auth } from "aws-amplify"
import Router from "next/router"
import { useEffect, useState } from "react"
import Loader from "../../components/Loader"

export interface WithAppProps {
    secured?: boolean
}

const withApp = (Component: any, props?: WithAppProps) => {
    return () => {
        /**
         * Hold the current authenticated user
         */
        const [user, setUser] = useState<typeof Auth | undefined>(undefined)

        const init = async () => {
            /**
            * Getting the user from amplify
            */
            try {
                const awsUser = await Auth.currentAuthenticatedUser()
                setUser(awsUser)
            }
            catch (error) {
                console.log(error)
                Router.push("/login")
            }

        }
        useEffect(() => {
            init()
        }, [])

        if (!user) {
            return <Loader />
        }
        else {
            return <Component />
        }
    }

}
export default withApp