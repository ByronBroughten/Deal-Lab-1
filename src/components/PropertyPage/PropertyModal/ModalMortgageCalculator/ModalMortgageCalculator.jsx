import {useSelector, useDispatch} from 'react-redux';
import { useState } from 'react';
// import { TextField, Button, Input } from '@mui/material';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';

function ModalMortgageCalculator() {
    const dispatch = useDispatch();
    const propertyOfInterest = useSelector((store) => store.propertyOfInterest);
    const mortgageCalculator = useSelector(store => store.mortgageCalculator);
    const [downPayment, setDownPayment] = useState(Object.keys(mortgageCalculator) && `$${mortgageCalculator.down_payment}`);
    const [downPaymentPercentage, setDownPaymentPercentage] = useState(Object.keys(mortgageCalculator) && `${(mortgageCalculator.down_payment_percentage * 100)}%`);
    const [closingCosts, setClosingCosts] = useState(Object.keys(mortgageCalculator) && `$${mortgageCalculator.closing_costs}`);
    const [closingCostsPercentage, setClosingCostsPercentage] = useState(Object.keys(mortgageCalculator) && `${(mortgageCalculator.closing_costs_percentage * 100)}%`);
    const [interestRate, setInterestRate] = useState(Object.keys(mortgageCalculator) && `${Number(mortgageCalculator.interest_rate).toFixed(2)}%`);
    const [loanTerm, setLoanTerm] = useState(Object.keys(mortgageCalculator) && mortgageCalculator.loan_term);
    
    const formattedCurrency = (value) => {
        const number = parseFloat(value);
        return `$${number.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    };

    const loanAmount = (Object.keys(propertyOfInterest).length && 
                        formattedCurrency(Number(propertyOfInterest.property[0].purchase_price)));

    console.log('mortgage calculator:', mortgageCalculator);
    

    return (
        <div className="container">
            <div className="mortgageCalculatorDiv">

                <div className="mortgageCalculatorFormDiv">
                    <form className="mortgageCalculatorForm">
                        <label>Down Payment:</label>
                        <br />
                        <input label="Down Payment"
                                id="standard-helperText"
                                // variant="standard"
                                // size='small'
                                value={downPayment}
                                onChange={e => setDownPayment(e.target.value)}
                                sx={{width: '160px', margin: '5px 5px 5px 0px'}}  />
                        <br />
                        <label>Down Payment Percentage:</label>
                        <br />
                        <input 
                                id="standard-helperText"
                                // variant="standard"
                                // size='small'
                                value={downPaymentPercentage}
                                onChange={e => setDownPaymentPercentage(e.target.value)}
                                sx={{width: '60px', }}  />
                        <br />
                        <label>Interest Rate:</label>
                        <br />
                        <input label="Interest Rate" 
                                id="standard-helperText"
                                // variant="standard"
                                // size='small'
                                value={interestRate}
                                onChange={e => setInterestRate(e.target.value)}
                                sx={{width: '160px', margin: '5px 5px 5px 0px'}}  />
                        <br />
                        <label>Closing Costs:</label>
                        <br />
                        <input label="Closing Costs" 
                                id="standard-helperText"
                                // variant="standard"
                                // size='small' 
                                value={closingCosts}
                                onChange={e => setClosingCosts(e.target.value)}
                                sx={{width: '160px', margin: '5px 5px 5px 0px'}} />
                        <br />
                        <label> Closing Cost Percentage:</label>
                        <input 
                                id="standard-helperText"
                                // variant="standard"
                                // size='small'
                                value={closingCostsPercentage}
                                onChange={e => setClosingCostsPercentage(e.target.value)}
                                sx={{width: '60px'}}  />

                        <form size='small' variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <label>Loan Term <br /></label>
                            <select labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={loanTerm}
                                onChange={e => setLoanTerm(e.target.value)}>
                                <option value=""></option>
                                <option value={15}>15 Yr</option>
                                <option value={20}>20 Yr</option>
                                <option value={30}>30 Yr</option>
                            </select>
                        </form>

                        <button className="modal-btn-2">Calculate</button>
                    </form>
                </div>

                <div className="mortgageCalculatorLoan">
                    {Object.keys(mortgageCalculator) && 
                        <>
                        <p className="mortgageCalculatorLoanItems">Loan Amount: {loanAmount}</p>
                        <p className="mortgageCalculatorLoanItems">Base Loan Amount: {formattedCurrency(Number(mortgageCalculator.base_loan_amount))}</p>
                        <p className="mortgageCalculatorLoanItems">Loan Interest Rate (Annual): {Number(mortgageCalculator.interest_rate_annual).toFixed(2)}%</p>
                        <p className="mortgageCalculatorLoanItems">Loan Interest Rate (Monthly): {Number(mortgageCalculator.interest_rate_monthly).toFixed(2)}%</p>
                        <p className="mortgageCalculatorLoanItems">Interest Payment (Monthly): ${mortgageCalculator.interest_payment_monthly}</p>
                        </>
                    }
                </div>

            </div>
        </div>
    )

}

export default ModalMortgageCalculator;

// store: 'mortgageCalculator'
// propertyId = propertyOfInterest.property[0].id