import { useState, useEffect } from "react";


const Users = ({ data, index , sendDataToParant}) => {
    // const { username, email, number, file } = data;
    const [edit, setEdit] = useState(false);
    const [formValue, setFormValue] = useState(data)
    const [formError, setFormError] = useState({})
    const [isSubmit, setisSubmit] = useState(false)
    const [Delete, setDelete] = useState(true)
    const [Select , setSelect] = useState("Select")

    // handle input changes and save in formvalue(usestate)....
    const handleChange = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value })
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

    // if all errors of farms is clear then...
    useEffect(() => {
        if (Object.keys(formError).length === 0 && isSubmit) {
            const localData = JSON.parse(localStorage.getItem("user"))
            const loginuser = JSON.parse(localStorage.getItem("newuser"))

            // cheack edited data has same or not like  other data ....
            let sentAlert = false;
            localData.map((data, count) => {
                if (count === index) {
                    return
                }
                if (data.email === formValue.email && data.number === formValue.number && !sentAlert) {
                    alert("email and password already exist!")
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

            // if adited data not same as others data then update the adited changes 
            if (!sentAlert) {
                localData[index].username = formValue.username
                localData[index].email = formValue.email
                localData[index].number = formValue.number
                localData[index].file = formValue.file
                localStorage.setItem('user', JSON.stringify(localData))

                //if adited data and loginuser data has same then update login user data as same of adited data...
                if (localData[index].email === loginuser.email || localData[index].number === loginuser.number) {
                    localStorage.setItem('newuser', JSON.stringify(localData[index]))
                }

                setEdit(false)

            }
        }
    }, [formError])

    const handleDelete = () => {
        const confirm = window.confirm("are you sure you want to delete this user?")
        if (confirm) {
            const localData = JSON.parse(localStorage.getItem('user'))
            localData.splice(index, 1)
            localStorage.setItem('user', JSON.stringify(localData))
            setDelete(false)
        }

    }

    const handleSelect = () =>{
        // console.log("hello")
        Select === "Select" ? setSelect("Unselect") : setSelect("Select")
        const data = {
            true: true,
            indexdata: index,
            select: Select
        }
        sendDataToParant(data)
       

    }


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
        <div className="">
            {
                Delete &&
                <div className="flex justify-around items-center bg-[#e2f4fb] p-3 m-3">
                    <img className="w-32 h-32 object-cover rounded-full" src={formValue.file} alt="profile" />
                    <h1 className="px-3 mx-3">{formValue.username}</h1>
                    <h2 className="px-3 mx-3">{formValue.email}</h2>
                    <h2 className="px-3 mx-3">{formValue.number}</h2>
                    <div className="grid">
                        <button
                            className="px-2 mx-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded font-medium" onClick={() => edit ? setEdit(false) : setEdit(true)}>Edit</button>
                        <button
                            className="px-2 mx-2 my-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded font-medium"
                            onClick={handleDelete}
                        >Delete</button>
                        <button
                            className="px-2 mx-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded font-medium"
                            onClick={handleSelect}>{Select}</button>
                    </div>
                </div>

            }

            {
                edit &&
                <div className="">
                    <form className="grid" onSubmit={handleSubmit}>
                        <input
                            className="border border-black outline-none p-2 m-3 rounded"
                            type="text"
                            name="username"
                            value={formValue.username}
                            onChange={handleChange}
                        />
                        <p>{formError.username}</p>
                        <input
                            className="border border-black outline-none p-2 m-3 rounded"
                            type="email"
                            name="email"
                            value={formValue.email}
                            onChange={handleChange}
                        />
                        <p>{formError.email}</p>
                        <input
                            className="border border-black outline-none p-2 m-3 rounded"
                            type="number"
                            name="number"
                            value={formValue.number}
                            onChange={handleChange}
                        />
                        <p>{formError.number}</p>
                        <input
                            className="border border-black outline-none p-2 m-3 rounded"
                            type="file"
                            name="file"
                            onChange={handleimage}

                        />
                        <input
                            type="submit"
                            className="border border-black outline-none p-2 m-3 rounded"
                        />
                    </form>
                </div>
            }
        </div>
    )
}

export default Users;