import React from 'react';
import {useSelector, useDispatch} from 'react-redux';


function ModalProfitEstimation() {

  const dispatch = useDispatch();

  const propertyOfInterest = useSelector((store) => store.propertyOfInterest);

  const formattedCurrency = (value) => {
    const number = parseFloat(value);
    return `$${number.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  return (
    <div className="container">
      {/* <p>Profit Estimation:</p> */}
      {Object.keys(propertyOfInterest).length && 
        <>
          <p>
            <span className='bold-text'>After Repair Value: </span>
            <input
              value= {formattedCurrency(Number(propertyOfInterest.property[0].after_repair_value))}
              onChange={e => {e.preventDefault; dispatch({type: 'UPDATE_PROPERTY_AFTER_REPAIR_VALUE', payload: e.target.value})}}
            />
          </p>
          <p>Total Cost: {formattedCurrency(propertyOfInterest.property[0].total_cost)}</p>
          <p>Profit: {formattedCurrency(propertyOfInterest.property[0].profit)}</p>
          <p>Monthly Profit: {formattedCurrency(propertyOfInterest.property[0].monthly_profit)}</p>
        </>
      }
    </div>
  );
}

export default ModalProfitEstimation;