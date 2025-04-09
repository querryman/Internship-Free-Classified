/**import guitar from 'assets/guitar.png'
import google from 'assets/google.png'
import phone from 'assets/phone.png'
import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvier } from '/firebase/setup'*/

import guitar from 'C:/Users/adwai/Desktop/christ/intership/Internship-Free-Classified/accounts/templates/accounts/assets/guitar.png'

type popProp = {
    setLoginPop:any
}
const Login = (props:popProp) => {

    const googleSignIn = async() => {
        
        try{

            await signInWithPopup(auth, googleProvier)

        }catch(err){
            console.error(err)
        }
    }

  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  
  <div className="fixed inset-0 bg-zinc-950 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

  <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      
      <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:w-96 sm:max-w-lg">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <h1 onClick={() => props?.setLoginPop(false)} className='font-semibold text-3xls cursor-pointer'>X</h1>
          <div className="sm:flex sm:items-start">
            
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <div className="mt-2">
                <img src={guitar} className='w-20 h-20 ml-32' />
                
                <p className="text-base font-medium mt-5 text-center">Help us become one of the safest place<br/> to buy and sell</p>
                
                <div className='flex border border-black p-2 rounded-md mt-12 cursor-pointer'>
                    <img src={phone} className='w-6 h-6'/>
                    <h1 className='font-semibold ml-3'>Continue wih phone</h1>
                </div>

                <div onClick = {googleSignIn} className='flex border border-grey-300 p-2 rounded-md mt-4 cursor-pointer'>
                    <img src={google} className='w-6 h-6'/>
                    <h1 className='font-semibold ml-12'>Continue wih Google</h1>
                </div>

                <div>
                    <h1 className='text-center mt-4'>OR</h1>
                    <h1 className='text-center mt-4 underline cursor-pointer'>Login with Email</h1>
                    <h1 className='text-center mt-28 text-xs'>All your personal details are safe with us.</h1>
                    <h1 className='text-center mt-4 text-xs'>If you continue, you are accepting <span className='text-blue-600'>OLX Terms and <br />Conditions and Privacy Policy</span></h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default Login