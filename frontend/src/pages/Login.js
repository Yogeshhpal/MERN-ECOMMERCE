import React, { useContext, useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye } from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import Context from '../context'

const Login = () => {
  //Hooks
  const [showPassword, setshowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: ""
  })

  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context)

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataResponse = await fetch("https://mern-ecommerce-7npwe4t1m-yogeshs-projects-60f26ef9.vercel.appapi/signin", {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate('/')
      fetchUserDetails()
      fetchUserAddToCart()
    }
    if (dataApi.error)
      toast.error(dataApi.message);
  }

  // console.log("login data : ", data);

  return (
    <>
      <section id="login">
        <div className='mx-auto container p-4'>
          <div className="bg-white  p-5 w-full max-w-sm mx-auto">
            <div className='w-20 h-20 mx-auto'>
              <img src={loginIcons} alt="login icons" />
            </div>

            <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>

              <div className='grid'>
                <label>Email : </label>

                <div className='bg-slate-100 p-2'>
                  <input type="email"
                    name="email" value={data.email}
                    placeholder='Enter Email'
                    className='w-full h-full outline-none'
                    onChange={handleOnChange} />
                </div>

              </div>

              <div>
                <label>Password : </label>

                <div className='bg-slate-200 flex'>

                  <input type={showPassword ? "text" : "password"}
                    name="password" value={data.password}
                    placeholder='Enter Password'
                    className='w-full h-full outline-none'
                    onChange={handleOnChange} />
                  <div className='cursor-pointer text-xl' onClick={() => setshowPassword((prev) => !prev)}>
                    <span>
                      {
                        showPassword ? (
                          <FaEyeSlash />
                        )
                          :
                          (
                            <FaEye />
                          )
                      }
                    </span>
                  </div>
                </div>
                <Link to={"/forgot-password"} className='block w-fit ml-auto hover:underline hover:text-red-600'>
                  Forgot Password ?
                </Link>
              </div>

              <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 hover:bg-red-700'>Login</button>

            </form>
            <p className='my-5'>Don't have account ? <Link to={"/sign-up"} className='text-red-600 hover:text-red-700 hover:underline'>Sign up</Link></p>
          </div>

        </div>
      </section>
    </>

  )
}

export default Login