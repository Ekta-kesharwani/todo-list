import { useState } from "react"
import { Auth } from "aws-amplify"
import Router from "next/router"
import { useFormik } from "formik";
import * as Yup from "yup";

export default function useLogin() {
    const [formError, setFormError] = useState<string|undefined>(undefined)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const signIn = async (userName: string, password: string) => {
        setIsLoading(true)
        try {
            const user = await Auth.signIn(userName, password)
            console.log(user)
            Router.push("/")
        }
        catch (error) {
            console.log(error)
            setFormError(error?.message)
        }
        setIsLoading(false)

    }
    const formik = useFormik({
        initialValues: {
            userName: "",
            password: ""
        },
        validationSchema: Yup.object({
            userName: Yup.string().required("Required!"),
            password: Yup.string().required("Required!").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Invalid Password format. Password must contain atleast one Uppercase letter, Number and special character!")
        }),
        onSubmit: (values) => {
            console.log(values)
            signIn(values?.userName, values?.password)
        }
    })
    return {
        formError, signIn, formik, isLoading,setFormError
    }
}