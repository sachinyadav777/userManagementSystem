import Users from "./Users";
import { useNavigate } from "react-router-dom";
import gift from "../wired-flat-185-trash-bin.gif"
import { useState } from "react";

const Dashboard = () => {
  const [localData, setLocalData] = useState(JSON.parse(localStorage.getItem("user")))
  const navigate = useNavigate();
  const [Select, setSelect] = useState(false)
  const [index, setIndex] = useState([])
  console.log(index)

  // handle logout
  const handleLogOut = () => {
    localStorage.removeItem('newuser')
    return navigate('/')

  }
  // handle clear all users
  const handleclear = () => {
    localStorage.removeItem('user')
    setLocalData(JSON.parse(localStorage.getItem("user")))
  }

  // callback funtion to recieve data from child component...
  const recieveDataFromChild = (data) => {
    const indexvalue = data.indexdata
    const selectValue = data.select
    setSelect(data.true)
    if (selectValue === "Unselect") {
      const array = [...index]
      const value = array.indexOf(indexvalue)
      array.splice(value, 1)
      setIndex(array)
      return
    }

    setIndex([...index, indexvalue])

  }

  const deleteSelectedItem = () => {
    const confirm = window.confirm("are you sure you want to delete selected user?")
    if (confirm) {
       const storageData = JSON.parse(localStorage.getItem('user'))
      index.sort((a, b) => b - a);
      const promise = index.map(async data => {
        return await storageData.splice(data, 1)
      })
      Promise.all(promise)
        .then(results => {
          console.log(storageData)
          localStorage.setItem('user', JSON.stringify(storageData))
          setLocalData(storageData)
          setSelect(false)
        })


    }

  }

  return (
    <div>   
      <div className="flex justify-end m-3 relative">
        {
          Select && index.length !== 0 &&
          <img
            className="w-[40px] h-[40px] absolute mx-auto left-0 right-0 "
            src={gift}
            alt="delete button"
            onClick={deleteSelectedItem} />
        }

        <button
          className="p-2 m-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded font-medium"
          onClick={handleLogOut}>Log Out</button>
        <button
          className="p-2 m-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded font-medium"
          onClick={handleclear}>clear all</button>
      </div>

      <div className="flex justify-around items-center bg-gradient-to-r from-cyan-500 to-blue-500 p-3 m-3">
        <h1 className="px-3 mx-3 font-bold">PROFILE</h1>
        <h1 className="px-3 mx-3 font-bold">NAME</h1>
        <h1 className="px-3 mx-3 font-bold">EMAIL</h1>
        <h1 className="px-3 mx-3 font-bold">NUMBER</h1>
        <h1 className="px-3 mx-3 font-bold">MANAGE</h1>
      </div>

      {localData && localData.map((data, index) => {
        return <Users
          key={data.number}
          data={data}
          index={index}
          sendDataToParant={recieveDataFromChild} />
      })}
    </div>)
}

export default Dashboard;