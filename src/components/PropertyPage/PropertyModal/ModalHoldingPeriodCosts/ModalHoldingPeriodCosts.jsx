import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useState } from 'react';


function ModalHoldingPeriodCosts() {

  const dispatch = useDispatch();

  const propertyOfInterest = useSelector((store) => store.propertyOfInterest);
  const [holdingName, setHoldingName] = useState("");
  const [holdingCost, setHoldingCost] = useState("");

  const addHoldingItem = () => {
    dispatch ({
        type: 'ADD_PROPERTY_HOLDING_ITEM',
        payload: {propertyId: propertyOfInterest.property[0].id, holdingName: holdingName, holdingCost: holdingCost }
    })
    setHoldingName("");
    setHoldingCost("");
}

const deleteHoldingItem = (itemId) => {
  dispatch ({
      type: 'DELETE_PROPERTY_HOLDING_ITEM',
      payload: {itemId: itemId, propertyId: propertyOfInterest.property[0].id}
  })
}

  return (
    <div className="container">
      {Object.keys(propertyOfInterest).length && 
        <>
          <p>Holding Costs:</p>
          <p>Holding Items:</p>
          <input className='holdingItemInput'
            name='holdingItemInput'
            type='text'
            placeholder='holding Name'
            value={holdingName}
            onChange={e => setHoldingName(e.target.value)}
          />
          <input className='holdingCostInput'
            name='holdingCostInput'
            type='text'
            placeholder='holding Cost'
            value={holdingCost}
            onChange={e => setHoldingCost(e.target.value)}
          />
          <button onClick={addHoldingItem}>Add</button>
          <ul>
            <li> Taxes: ${propertyOfInterest.property[0].taxes_yearly/12}</li>
            {propertyOfInterest.holdingItems.map((item) => {
              return (
                <>
                <li key = {item.holding_items_id}>{item.holding_name}: ${item.holding_cost} </li>
                <button onClick={() => {deleteHoldingItem(item.holding_items_id)}}>❌</button>
                </>
              )
            })}
          </ul>
          <p>Holding Period: {propertyOfInterest.property[0].holding_period} Months</p>
        
        </>
      }
    </div>
  );
}

export default ModalHoldingPeriodCosts;