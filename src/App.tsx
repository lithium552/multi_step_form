import '../index.scss'
import { ReactComponent as SideBarMobile } from '../assets/images/bg-sidebar-mobile.svg'
import Form from './Form'
import React from 'react'
import { useState } from 'react'
import SelectPlan from './SelectPlan'
import Addons from './Addons'
import FininishUp from './FininishUp'


interface StateData {
  id: number;
    title: string;
    content: string;
    isActive: boolean;
    previous: boolean;
    name: string;
}

const addonsData = [
  {
  id: 1,
  title: 'Online service',
  text: 'Acess to multiplayer games',
  price: 1,
  checked: false
  },
  {
  id: 2,
  title: 'Larger storage',
  text: 'Extra 1TB of cloud save',
  price: 2,
  checked: false
  },
  {
  id: 3,
  title: 'Customizable profile',
  text: 'Custom theme on your profile',
  price: 2,
  checked: false
  },
]

const DUMMY_DATA = [
  {
    id: 1,
    title: 'Personal info',
    content: 'Please provide your name, email address, and phone number.',
    isActive: true,
    previous: false,
    name: 'your info'
  },
  {
    id: 2,
    title: 'Select your plan',
    content: 'You have the option of monthly or yearly billing.',
    isActive: false,
    previous: true,
    name: 'select plan'
  },
  {
    id: 3,
    title: 'Pick add-ons',
    content: 'Add-ons help enhance your billing experience.',
    isActive: false,
    previous: true,
    name: 'add-ons'
  },
  {
    id: 4,
    title: 'Finishing up',
    content: 'Double-check everything looks OK before confirming.',
    isActive: false,
    previous: true,
    name: 'summary'
  }
]

const refreshData = (stateData: StateData[], filteredData: StateData[], previous = false) => {
  const newData = [...stateData].map(item => {
    if (filteredData[0].id === item.id) {
      return {
        id: item.id,
        title: item.title,
        content: item.content,
        isActive: !item.isActive,
        previous: item.previous,
        name: item.name
      }
    }
    if (previous ? filteredData[0].id - 1 === item.id :filteredData[0].id + 1 === item.id) {
      return {
        id: item.id,
        title: item.title,
        content: item.content,
        isActive: !item.isActive,
        previous: item.previous,
        name: item.name
      }
    } else return item
  })
  return newData
}


function App() {
  const [data, setData] = useState(DUMMY_DATA)
  const [isMonthly, setIsMonthly] = useState(true)
  const [checkedPlan, setCheckedPlan] = useState({value: 'Arcade', price: 9})
  const [checkedAddons, setChekedAddons] = useState(addonsData)
  const [isConfirmed, seIsConfirmed] = useState(false)
  const filteredData = data.filter(item => item.isActive === true)
  const submitFormHandler = (e: any) => {
    e.preventDefault()
    console.log(e.target.name.value)
    console.log(e.target.email.value)
    console.log(e.target.phone.value)
    const newData = refreshData(data, filteredData)
    setData(newData)
  }

  const onChangePlanHandler = () => {
    const res = [...data].map((item) => {
      if(item.id === 2) {
        return {
          ...item,
          isActive: !item.isActive
        }
      }
      if(item.id === 4) {
        return {
          ...item,
          isActive: !item.isActive
        }
      }else return item
    })
    setData(res)
  }

  const onClickPreviousHandler = () => {
    const newData = refreshData(data, filteredData, true)
    setData(newData)
  }

  const onClickHandler = (id: number) => {
    if(id !== 1) {
        const newData = refreshData(data, filteredData)
        setData(newData)
      }
  }
  return (
    <>
      <div className='container-background'>
        <SideBarMobile />
      </div>
      <div className='desktop'>
      <div className='container'>
        <div className='container-btn'>
          {data.map(item => (
            <div key={item.title} className='steps-container'>
            <div key={item.id} className={item.isActive ? 'active' : ''}>{item.id}</div>
            <div className='step'>
              <span>STEP {item.id}</span>
              <p>{item.name}</p>
            </div>
            </div>
          ))}
        </div>
        <div className='container-form'>
          {!isConfirmed &&
          <>
          <h1>{filteredData[0].title}</h1>
          <p>{filteredData[0].content}</p>
          </>
          }
          {filteredData[0].id === 1 && <Form submitFormHandler={submitFormHandler}/>}
          {filteredData[0].id === 2 && <SelectPlan 
          isMonthly={isMonthly}
          setIsMonthly={setIsMonthly}
          checkedPlan={checkedPlan}
          setCheckedPlan={setCheckedPlan}
          />}
          {filteredData[0].id === 3 && <Addons 
          isMonthly={isMonthly}
          checkedAddons={checkedAddons}
          setChekedAddons={setChekedAddons}
          /> }
          {filteredData[0].id === 4 && <FininishUp
          isMonthly={isMonthly}
          checkedAddons={checkedAddons}
          checkedPlan={checkedPlan}
          onChangePlanHandler={onChangePlanHandler}
          isConfirmed={isConfirmed}
          /> }
        </div>
        {!isConfirmed && (<div className='btn-container'>
          <div>
            {filteredData[0].previous && 
            (<button 
            className='btn-back'
            onClick={onClickPreviousHandler}
            >Go Back</button>)}
            {filteredData[0].id !== 4 && !isConfirmed ? 
            (<button form={filteredData[0].id === 1 ? 'form' : ''} onClick={() => onClickHandler(filteredData[0].id)}>Next Step</button>)
            : (<button className='btn-confirm' onClick={() => seIsConfirmed(true)}>Confirm</button>)}
          </div>
        </div>)}
      </div>
      </div>
    </>
  )
}

export default App
