import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { useForm } from "react-hook-form"
import useAuth from '../../hooks/useAuth'
import axios from 'axios'
import toast from 'react-hot-toast'
import { TbFidgetSpinner } from 'react-icons/tb'

const SignUp = () => {

  const navigate = useNavigate()
  const{createUser,updateUserProfile,signInWithGoogle,loading,setLoading} = useAuth()

  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm()
  // const onSubmit = (data) => console.log(data)

  const handleGoogleSign = async () => {
    await signInWithGoogle()
    .then(result => {
      toast.success('Login Successful')
      navigate('/')
    })
  }


  const handleSubmit = async e => {
    e.preventDefault()
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.image.files[0]

    const formData = new FormData()
    formData.append('image',image)

    try{

      setLoading(true)
      // Upload user Pic
      const {data} = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGEBB_API_URL}`,formData)
      
      // Sign in user
      const result = await createUser(email,password)

      // UpdateUser Name And Image
      await updateUserProfile(name,data.data.display_url)

      navigate('/')
      toast.success('Sign Up Successful')
    }
    catch (err) {
      console.log(err);
      toast.error(err.message)
    }
    
  }

  return (
    // <div className='flex justify-center items-center min-h-screen'>
    //   <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
    //     <div className='mb-8 text-center'>
    //       <h1 className='my-3 text-4xl font-bold'>Sign Up</h1>
    //       <p className='text-sm text-gray-400'>Welcome to StayVista</p>
    //     </div>
    //     <form onSubmit={handleSubmit(onSubmit)}
    //       noValidate=''
    //       action=''
    //       className='space-y-6 ng-untouched ng-pristine ng-valid'
    //     >
    //       <div className='space-y-4'>
    //         <div>
    //           <label htmlFor='email' className='block mb-2 text-sm'>
    //             Name
    //           </label>
    //           <input
    //           {...register("name",{ required: true })}
    //             type='text'
    //             name='name'
    //             id='name'
    //             placeholder='Enter Your Name Here'
    //             className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
    //             data-temp-mail-org='0'
    //           />
    //           {errors.name && <span className='text-red-600'>This field is required</span>}
    //         </div>
    //         <div>
    //           <label htmlFor='image' className='block mb-2 text-sm'>
    //             Select Image:
    //           </label>
    //           <input
    //              {...register("pic",{ required: true })}
    //             type='file'
    //             id='image'
    //             name='image'
    //             accept='image/*'
    //           />
    //           <br />
    //           {errors.pic && <span className='text-red-600'>This field is required</span>}
    //         </div>
    //         <div>
    //           <label htmlFor='email' className='block mb-2 text-sm'>
    //             Email address
    //           </label>
    //           <input
    //           {...register("email",{ required: true })}
    //             type='email'
    //             name='email'
    //             id='email'
    //             placeholder='Enter Your Email Here'
    //             className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
    //             data-temp-mail-org='0'
    //           />
    //           {errors.email && <span className='text-red-600'>This field is required</span>}
    //         </div>
    //         <div>
    //           <div className='flex justify-between'>
    //             <label htmlFor='password' className='text-sm mb-2'>
    //               Password
    //             </label>
    //           </div>
    //           <input
    //           {...register("password",{ required: true , maxLength:16 , minLength: 8 ,pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/ })}
    //             type='password'
    //             name='password'
    //             autoComplete='new-password'
    //             id='password'
    //             placeholder='*******'
    //             className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
    //           />
    //              {errors.password?.type === "required" && (
    //               <p className='text-red-600' role="alert">Password name is required</p>)}
    //              {errors.password?.type === "maxLength" && (
    //               <p className='text-red-600' role="alert">Password Must be Less Then 16 Character</p>)}
    //              {errors.password?.type === "minLength" && (
    //               <p className='text-red-600' role="alert">Password Must be More Then 8 Character</p>)}
    //              {errors.password?.type === "pattern" && (
    //               <p className='text-red-600' role="alert">Password Must Have At least one upper case, one lower case & one Number</p>)}
    //         </div>
    //       </div>

    //       <div>
    //         <button
    //           type='submit'
    //           className='bg-rose-500 w-full rounded-md py-3 text-white'
    //         >
    //           Continue
    //         </button>
    //       </div>
    //     </form>
    //     <div className='flex items-center pt-4 space-x-1'>
    //       <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
    //       <p className='px-3 text-sm dark:text-gray-400'>
    //         Signup with social accounts
    //       </p>
    //       <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
    //     </div>
    //     <div className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'>
    //       <FcGoogle size={32} />

    //       <p>Continue with Google</p>
    //     </div>
    //     <p className='px-6 text-sm text-center text-gray-400'>
    //       Already have an account?{' '}
    //       <Link
    //         to='/login'
    //         className='hover:underline hover:text-rose-500 text-gray-600'
    //       >
    //         Login
    //       </Link>
    //       .
    //     </p>
    //   </div>
    // </div>
    <div className='flex justify-center items-center min-h-screen'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Sign Up</h1>
          <p className='text-sm text-gray-400'>Welcome to StayVista</p>
        </div>
        <form onSubmit={handleSubmit}
          noValidate=''
          action=''
          className='space-y-6 ng-untouched ng-pristine ng-valid'
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Name
              </label>
              <input
                required
                type='text'
                name='name'
                id='name'
                placeholder='Enter Your Name Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <label htmlFor='image' className='block mb-2 text-sm'>
                Select Image:
              </label>
              <input
                required
                type='file'
                id='image'
                name='image'
                accept='image/*'
              />
              <br />
            </div>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                required
                type='email'
                name='email'
                id='email'
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  Password
                </label>
              </div>
              <input
                required
                type='password'
                name='password'
                autoComplete='new-password'
                id='password'
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
              />
                
            </div>
          </div>

          <div>
            <button
              disabled={loading}
              type='submit'
              className='bg-rose-500 w-full rounded-md py-3 text-white'
            >
              {loading ? <TbFidgetSpinner className='animate-spin m-auto' /> : 'Continue'}
            </button>
          </div>
        </form>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <p className='px-3 text-sm dark:text-gray-400'>
            Signup with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>
        <button
          disabled={loading}
         onClick={handleGoogleSign} className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'>
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </button>
        <p className='px-6 text-sm text-center text-gray-400'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='hover:underline hover:text-rose-500 text-gray-600'
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default SignUp
