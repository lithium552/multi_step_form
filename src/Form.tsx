import React from 'react'

const Form: React.FC<any> = ({ submitFormHandler }) => {
    return (
        <form action="" id='form' onSubmit={submitFormHandler}>
            <label htmlFor="name">Name</label>
            <input required type="text" placeholder='e.g. Stephen King' id='name' />
            <label htmlFor="email">Email</label>
            <input required type='email' placeholder='e.g. stephenking@lorem.com' id='email' />
            <label htmlFor="phone">Phone Number</label>
            <input required type='tel' placeholder='e.g. +1 234 567 890' id='phone' />
        </form>
    )
}

export default Form