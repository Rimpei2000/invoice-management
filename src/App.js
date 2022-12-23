import { useEffect, useState } from 'react';
import { Table, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faPencilRuler} from '@fortawesome/free-solid-svg-icons';
import FormBlock from './components/FormBlock';

function App() {

  const [isLoading, setIsLoading] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [openFormBlock, setOpenFormBlock] = useState(false);

  useEffect(() => {
    const fetchData = async() => {
      const response = await fetch(process.env.AWS_URL);
      const data = await response.json();
      setInvoices(data);
      setIsLoading(false);
    }
    fetchData()
  }, []);

  const remove = (id) => {
    setInvoices(invoices.filter(i => i.Id !== id));
  }

  const openForm = () => {
    setOpenFormBlock(!openFormBlock)
  }

  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  return (
    <>
      
    <div className="container border border-secondary rounded center">
      <div className="row">
        <div className='col-12'>
          <h4>Pending Invoices</h4>
        </div>
      </div>
      <div className='row'>
        <div className='.col-xs-12 center text-center'>
          <Table dark responsive striped bordered hover>
            <thead>
              <tr>
                <th>Vendor</th>
                <th>Amount</th>
                <th>Invoice Number</th>
                <th>Date</th>
                <th colSpan="2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.length === 0 ? <tr><td colSpan='6'>All caught up!</td></tr> 
              : invoices.map(invoice => (
                <tr key={invoice.Id}>
                  <td>{invoice.Vendor}</td>
                  <td>{invoice.Amount}</td>
                  <td>{invoice.Invoice}</td>
                  <td>{invoice.Date}</td>
                  <td>
                    <Button className='btn btn-lg btn-success' onClick={() => remove(invoice.Id)}> 
                      <FontAwesomeIcon icon={faThumbsUp}/> OK
                    </Button>
                  </td>
                  <td>
                    <Button className='btn btn-lg btn-danger' onClick={() => remove(invoice.Id)}>
                      <FontAwesomeIcon icon={faThumbsDown}/>NOK
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
    <Button className='btn btn-lg btn-success' onClick={openForm}> 
      <FontAwesomeIcon icon={faPencilRuler}/> {openFormBlock ? "Close Form": "Open Form"}
    </Button>
    {
      openFormBlock && <FormBlock />
    }
    </>
  );
}

export default App;
