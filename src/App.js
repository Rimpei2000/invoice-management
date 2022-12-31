import { useState } from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilRuler } from '@fortawesome/free-solid-svg-icons';
import FormBlock from './components/FormBlock';
import InvoiceList from './components/InvoiceList';

function App() {
  const [openFormBlock, setOpenFormBlock] = useState(false);
  const [invoices, setInvoices] = useState([]);

  const openForm = () => {
    setOpenFormBlock(!openFormBlock)
  }

  return (
    <>
      <InvoiceList 
        currentInvoices={invoices} 
        setCurrentInvoices={setInvoices}
      />
      <Button className='btn btn-lg btn-success' onClick={openForm}> 
        <FontAwesomeIcon icon={faPencilRuler}/> {openFormBlock ? "Close Form": "Open Form"}
      </Button>
      {
        openFormBlock 
          && 
        <FormBlock
          currentInvoices={invoices} 
          setCurrentInvoices={setInvoices} 
        />
      }
    </>
  );
}

export default App;
