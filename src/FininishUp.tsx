import { useState } from 'react'
import ConfirmedSub from './ConfirmedSub'

const FininishUp: React.FC<any> = ({ isMonthly, checkedPlan, checkedAddons, onChangePlanHandler, isConfirmed }) => {

  const price = (obj) => isMonthly ? `$${obj.price}/mo` : `$${obj.price * 10}/yr`
  const filteredAddons = checkedAddons.filter(addon => (addon.checked === true))

  return (
    <>
      {isConfirmed ? <ConfirmedSub />
        :(<>
          <div className='container-end'>
            <div className="container-plan">
              <div>
                <span>{checkedPlan.value} {isMonthly ? '(Monthly)' : '(Yearly)'}</span>
                <p onClick={onChangePlanHandler}>Change</p>
              </div>
              <p>{checkedPlan.price}${isMonthly ? '/mo' : '/yr'}</p>
            </div>
            <hr />
            <div className="container-addons">
              {filteredAddons.map(addon => (
                <div>
                  <span>{addon.title}</span>
                  <p>+{price(addon)}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="total">
            <span>Total {isMonthly ? '(per month)' : '(per year)'}</span>
            <p>${checkedPlan.price + (filteredAddons.reduce((acc, curr) => acc + curr.price, 0)) * (isMonthly ? 1 : 10)}{isMonthly ? '/mo' : '/yr'}</p>
          </div>
        </>)
        }
    </>
  )
}

export default FininishUp