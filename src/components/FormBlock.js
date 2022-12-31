import { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import '../App.css';
import axios from 'axios';
import { v1 as uuid } from 'uuid';

const FormBlock = ({ currentInvoices, setCurrentInvoices }) => {
  const [vendor, setVendor] = useState('');
  const [amount, setAmount] = useState(0);
  const [invoiceNumber, setInvoiceNumber] = useState(0);

  const handleVendor = (e) => {
    setVendor(e.target.value);
  }

  const handleAmount = (e) => {
    setAmount(e.target.value);
  }

  const handleInvoiceNumber = (e) => {
    setInvoiceNumber(e.target.value);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const current = new Date();
    const properties = {
      operation: "create",
      payload: {
        Id: uuid(),
        Vendor: vendor,
        Amount: amount.toString(),
        InvoiceNumber: invoiceNumber.toString(),
        Date: `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`
      }
    }
    axios.post(process.env.REACT_APP_AWS, properties)
      .then(res => {        
        setCurrentInvoices(prevState => ([properties.payload, ...prevState]))
      })
      .catch(err => console.log(err))
  }

  return (
    <div className='formDiv'>
      <Form className='form'>
        <FormGroup>
          <Label for='vendor'>Vendor</Label>
          <Input type='string' name='vendor' id='vendor' placeholder='ABC Market' onChange={handleVendor}/>
          <FormText>Type in this item's vendor name.</FormText>
        </FormGroup>
        <FormGroup>
          <Label for='amount'>Amount</Label>
          <Input type='number' name='amount' id='amount' placeholder='100' onChange={handleAmount}/>
          <FormText>Type in the amount of this item.</FormText>
        </FormGroup>
        <FormGroup>
          <Label for='invoiceNumber'>Invoice Number</Label>
          <Input type='number' name='invoiceNumber' id='invoiceNumber' placeholder='0000000' onChange={handleInvoiceNumber}/>
        </FormGroup>
        <Button onClick={submitHandler}>ADD</Button>
      </Form>
    </div>
  )
}

export default FormBlock