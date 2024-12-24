/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom"
import Navbar from './Navbar';
import {useRef, useState} from 'react'

const Login = () => {
    const inputUser = useRef()
    const inputPassword = useRef()
    const [errorMessage, setErrorMessage] = useState("");
    const [username, setUserName] = useState("");
    const [userpassword, setUserPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        const username = inputUser.current.value;
        const password = inputPassword.current.value;
        console.log("Username:", username);
        console.log("Password:", password);

        localStorage.setItem("name", username);
        localStorage.setItem("password", password);
    

        if (username === "" || password === "") {
            setErrorMessage("Fields cannot be empty");
            
            setTimeout(() => {
                setErrorMessage("");
            }, 3000);
            return;
        }

        setUserName(username);
        setUserPassword(userpassword);
    };

  return (
      <>
        <Navbar />
          
          <form className='flex items-center justify-center'
                onSubmit={handleLogin} >
            <div className="bg-gray-900  border-2 border-gray-300 py-6 rounded-md px-4 md:px-10  shadow-md">
                <div className="space-y-4 md:mt-6">
                
                    <div className="w-full">
                          <input
                              type="text"
                              id="name"
                              placeholder="username"
                              className="px-4 py-2 bg-gray-200 rounded-md"
                              ref={inputUser} />
                    </div>
                    
                    <div className="w-full">
                          <input
                              type="password"
                              id="pass"
                              placeholder="password"
                              className="px-4 py-2 bg-gray-200 rounded-md"
                              ref={inputPassword}/>
                      </div>
                      {errorMessage && (
                            <p className="text-red-500">{errorMessage}</p>
                        )}

                </div>
                { username || userpassword
                      
                      ? (
                          <Link to={'/starships'}>
                          <button className="w-full mt-5 bg-gray-900 text-zinc-400 py-2 border-2 border-zinc-400 rounded-md hover:text-yellow-500 hover:border-yellow-500 cursor-pointer"
                              type="button">
                              Log In
                          </button>
                          </Link>
                        )
                      : (
                          <button className="w-full mt-5 bg-gray-900 text-zinc-400 py-2 border-2 border-zinc-400 rounded-md hover:text-yellow-500 hover:border-yellow-500 cursor-pointer"
                          type="submit">
                          Log In
                          </button>
                        )
                    }
            </div>
            
        </form>
      </>
  )
}

export default Login