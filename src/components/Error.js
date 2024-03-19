// import { useRouteError } from "react-router-dom"
// const Error = () => {
//     const error = useRouteError();
//     return (
//         <div>
//             <h1>{error.status}</h1>
//             <h2>{error.statusText}</h2>
//         </div>
//     )
// }

import React from 'react'

const Error = () => {
  return (
    <div className='h-screen flex justify-center items-center'><h1 className='text-4xl font-bold'>404 Page not found</h1></div>
  )
}

export default Error

