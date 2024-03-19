import { useEffect, useState } from "react";
import gift from "../output-onlinegiftools.gif";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Registration = () => {
    const initialValue = { username: "", email: "", number: "", file: "" }
    const [formValue, setFormValue] = useState(initialValue)
    const [formError, setFormError] = useState({})
    const [isSubmit, setisSubmit] = useState(false)
    const navigate = useNavigate();

    // set old data as an array....
    const [olddata, setOldData] = useState([])
    useEffect(() => {
        setOldData(JSON.parse(localStorage.getItem("user")))
    }, [])

    // handle input changes and save in formvalue(usestate)....
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValue({ ...formValue, [name]: value })
    }

    // handle image file and save in to formvalue(usestate)....
    const handleimage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setFormValue({ ...formValue, [e.target.name]: reader.result });
        };
        reader.readAsDataURL(file);
    }

    // handle submit button and seterror...   
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError(validate(formValue))
        setisSubmit(true)
    }

    // if data is correct save old and new data in localstorage and navigate in to dashboard.....
    useEffect(() => {
        if (Object.keys(formError).length === 0 && isSubmit) {

            if (!localStorage.getItem('user')) {
                localStorage.setItem('user', JSON.stringify([formValue]))
                //protectedRoute.
                localStorage.setItem('newuser', JSON.stringify(formValue))
                const localData = JSON.parse(localStorage.getItem("user"))
                // console.log(localData)
                setOldData(localData)
                alert("submit succesfull!")
                navigate("/dashboard")

            } else if (localStorage.getItem('user')) {
 
                // check if user already exist then show alert otherwise save data in localstorage..
                const olddata = JSON.parse(localStorage.getItem("user"));
                let sentAlert = false;
                olddata.map((data) => {
                    if (data.email === formValue.email && data.number === formValue.number && !sentAlert) {
                        alert("email and password already exist! please login")
                        navigate("/")
                        sentAlert = true;
                    }
                    else if (data.email === formValue.email && data.number !== formValue.number && !sentAlert) {
                        alert("email is already exist!")
                        sentAlert = true;
                    }
                    else if (data.email !== formValue.email && data.number === formValue.number && !sentAlert) {
                        alert("number is already exist!")
                        sentAlert = true;
                    }
                });
                if (!sentAlert) {
                    localStorage.setItem('user', JSON.stringify([...olddata, formValue]))
                    //protectedRoute.
                    localStorage.setItem('newuser', JSON.stringify(formValue))
                    alert("submit succesfull!")
                    navigate("/")
                }

            }
        }
    }, [formError])


    // validate funtion to check validation...
    const validate = (value) => {
        const error = {}
        if (!value.username) {
            error.username = "username is required"
        }
        if (!value.email) {
            error.email = "email is required"
        }
        if (!value.number) {
            error.number = "number is required"
        } else if (value.number.length < 10 || value.number.length > 10) {
            error.number = "this is invalid!"
        }
        if (!value.file) {
            error.file = "file is required"
        }
        return error
    }

    return (
        <div className="grid place-items-center h-screen bg-[url('./backgroungsignup.jpg')] bg-no-repeat bg-cover bg-bottom text-center">
            <form
                onSubmit={handleSubmit}
                className="grid border-2  border-gradient-purple p-7 backdrop-blur">
                <input
                    className="border border-black outline-none p-2 rounded bg-gradient-to-r from-[#b6014e] to-[#005483] placeholder-white"
                    type="text"
                    placeholder="enter name"
                    name="username"
                    value={formValue.username}
                    onChange={handleChange} />
                <p className="h-5 text-white text-sm">{formError.username}</p>

                <input
                    className="border border-black outline-none p-2 rounded bg-gradient-to-r from-[#b6014e] to-[#005483] placeholder-white"
                    type="email"
                    placeholder="email"
                    name="email"
                    value={formValue.email}
                    onChange={handleChange} />
                <p className="h-5 text-white text-sm">{formError.email}</p>

                <input
                    className="border border-black outline-none p-2 rounded bg-gradient-to-r from-[#b6014e] to-[#005483] placeholder-white text-white"
                    type="number"
                    placeholder="number"
                    name="number"
                    value={formValue.number}
                    onChange={handleChange} />
                <p className="h-5 text-white text-sm">{formError.number}</p>

                <input
                    className="p-2 rounded border-2 border-black outline-none bg-gradient-to-r from-[#b6014e] to-[#005483]"
                    type="file"
                    name="file"
                    // value={formValue.file}
                    onChange={handleimage} />
                <p className="h-5 text-white text-sm">{formError.file}</p>

                <img
                    className="w-14 mx-auto my-0"
                    src={gift}
                    alt="gift-img" />
                <input
                    className="border border-black outline-none p-2 mt-1 rounded bg-gradient-to-r from-[#b6014e] to-[#005483] text-black font-medium"
                    type="submit" />

                <h3
                className="font-medium text-[#005483] m-2"
                >Already have account? :<Link className="text-[#b6014e]" to={"/"}>Login Here</Link></h3>
            </form>
        </div>
    )
}

export default Registration;