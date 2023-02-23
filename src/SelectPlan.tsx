import { ReactComponent as Advanced } from '../assets/images/icon-advanced.svg'
import { ReactComponent as Pro } from '../assets/images/icon-pro.svg'
import { ReactComponent as Arcade } from '../assets/images/icon-arcade.svg'
import { ReactComponent as ToggleOn } from '../assets/images/toggle_on_FILL1_wght400_GRAD200_opsz40.svg'
import { ReactComponent as ToggleOff } from '../assets/images/toggle_off_FILL1_wght400_GRAD200_opsz40.svg'

const inputsData = [
  {
    value: 'Arcade',
    icon: <Arcade />,
    price: 9,
  },
  {
    value: 'Advanced',
    icon: <Advanced />,
    price: 12,
  },
  {
    value: 'Pro',
    icon: <Pro />,
    price: 15,
  },
]

const SelectPlan: React.FC<any> = ({checkedPlan, setCheckedPlan, setIsMonthly, isMonthly}) => {
  
  const subToggleHandler = () => {
    setIsMonthly(!isMonthly)
    !isMonthly ? setCheckedPlan({value: checkedPlan.value, price: checkedPlan.price/10}):setCheckedPlan({value: checkedPlan.value, price: checkedPlan.price*10})
  }

  const radioInputHandler = (e: any, price: number) => {
    console.log(price)
    setCheckedPlan({value: e.target.value, price: isMonthly ? price : price*10})
  }

  return (
    <div className='container-select-plan'>
      {inputsData.map(input => (
        <div key={input.value}>
          <input type='radio' id={input.value} checked={checkedPlan.value === input.value} value={input.value} onChange={(e) => radioInputHandler(e, input.price)} />
          <label htmlFor={input.value} >
            {input.icon}
            <div className='sub-details' key={input.value}>
              <h2>{input.value}</h2>
              {isMonthly ?
                (<p>{`$${input.price}/mo`}</p>)
                : (
                  <>
                    <p>{`$${input.price * 10}/year`}</p>
                    <span>2 months free</span>
                  </>
                )}
            </div>
          </label>
        </div>
      ))}
      <div className='container-toggle'>
        {isMonthly ? (
          <>
            <span className='bold'>Monthly</span>
            <ToggleOn onClick={subToggleHandler} />
            <span className='non-bold'>Yearly</span>
          </>
        ) : (
          <>
            <span className='non-bold'>Monthly</span>
            <ToggleOff onClick={subToggleHandler} />
            <span className='bold'>Yearly</span>
          </>
        )
        }

      </div>
    </div>
  )
}

export default SelectPlan