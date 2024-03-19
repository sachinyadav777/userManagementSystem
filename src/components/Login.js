import { useEffect, useState } from "react";
import gift from "../output-onlinegiftools.gif";
import { Link, useNavigate } from "react-router-dom";




const Login = () => {

    const initialValue = { email: "", number: "" }
    const [formValue, setFormValue] = useState(initialValue)
    const [formError, setFormError] = useState({})
    const [isSubmit, setisSubmit] = useState(false)
    const navigate = useNavigate();
    const localData = JSON.parse(localStorage.getItem("user"))


    // handle input changes and save in formvalue(usestate)....
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValue({ ...formValue, [name]: value })
    }

    // handle submit button seterror...   
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError(validate(formValue))
        setisSubmit(true)
    }

    // if data is correct save old and new data in localstorage and navigate in to dashboard.....
    useEffect(() => {
        if (Object.keys(formError).length === 0 && isSubmit) {

            //protectedRoute.
            localStorage.setItem('newuser', JSON.stringify(formValue))

            // if localstorage is null
            if (!localData) {
                alert("credential does not match :please register")
                navigate("/Registration")
                return;
            }
            // if user succsfully login then go to dashboard otherwise show alert
            let sentAlert = false;
            localData.map((data) => {
                if (data.email === formValue.email && data.number === formValue.number && !sentAlert) {
                    alert("succesfully login!")
                    navigate("/dashboard")
                    sentAlert = true;
                }
                else if (data.email === formValue.email && data.number !== formValue.number && !sentAlert) {
                    alert("number is incorrect!")
                    sentAlert = true;
                }
                else if (data.email !== formValue.email && data.number === formValue.number && !sentAlert) {
                    alert("email is incorrect!")
                    sentAlert = true;
                }
            });
            if (!sentAlert) {
                alert("credential does not match :please register")
                navigate("/Registration")
            }
        }
    }, [formError])

    // validate funtion to check validation...
    const validate = (value) => {
        const error = {}

        if (!value.email) {
            error.email = "email is required"
        }
        if (!value.number) {
            error.number = "number is required"
        } else if (value.number.length < 10 || value.number.length > 10) {
            error.number = "this is invalid!"
        }
        return error
    }

    return (
        <div className="grid place-items-center h-screen bg-[url('./backgroundlogin.jpg')] bg-no-repeat bg-cover bg-center text-center">
            <form
                onSubmit={handleSubmit}
                className="grid border-2 border-black p-10 rounded backdrop-blur">

                <input
                    className="border border-black outline-none p-2 rounded bg-gradient-to-r from-cyan-500 to-blue-500 placeholder-black"
                    type="email"
                    placeholder="email"
                    name="email"
                    value={formValue.email}
                    onChange={handleChange} />
                <p className="h-5 text-white text-sm">{formError.email}</p>

                <input
                    className="border border-black outline-none p-2 rounded bg-gradient-to-r from-cyan-500 to-blue-500 placeholder-black"
                    type="number"
                    placeholder="number"
                    name="number"
                    value={formValue.number}
                    onChange={handleChange} />
                <p className="h-5 text-white text-sm">{formError.number}</p>

                <img
                    className="w-14 mx-auto my-0"
                    src={gift}
                    alt="gift-img" />

                <button
                    className="border border-black outline-none p-2 rounded bg-[#d1783c] text-black"
                    type="submit"
                >Sign In</button>
                <h3
                className="font-bold m-3"
                >Don't have account :<Link className="text-[#d1783c]" to={"/registration"}>Register Here</Link></h3>

            </form>
        </div>
    )
}

export default Login