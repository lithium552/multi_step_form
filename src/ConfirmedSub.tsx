import React from 'react'
import { ReactComponent as ThankYou } from '../assets/images/icon-thank-you.svg'

const ConfirmedSub = () => {
  return (
    <div className='confirmed'>
        <ThankYou />
        <h1>Thank You!</h1>
        <p>Thanks for confirming your subscription!
            We hope you have fun using our platform.
            If you ever nedd support,
            please feel free to email us at 
            support@loremgaming.com
        </p>
    </div>
  )
}

export default ConfirmedSub