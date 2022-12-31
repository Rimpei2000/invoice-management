import { useEffect, useState } from 'react';
import { Table, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faTrash} from '@fortawesome/free-solid-svg-icons';

const InvoiceList = ({ currentInvoices, setCurrentInvoices }) => {
  const [isLoading, setIsLoading] = useState(false);
  // const [invoices, setInvoices] = useState([]);
  
  useEffect(() => {
      const fetchData = async() => {
          const response = await fetch('https://vm3veob5v9.execute-api.us-east-1.amazonaws.com/Dev/');
          const data = await response.json();
          // setInvoices(data);
          setCurrentInvoices(data);
          setIsLoading(false);
      }
      fetchData()
  }, []);
    
  const remove = (id) => {
    // setInvoices(invoices.filter(i => i.Id !== id));
    setCurrentInvoices(currentInvoices.filter(i => i.Id !== id));
    console.log(currentInvoices)
  }
  
  const accept = (id) => {}
  
  const reject = (id) => {}
    
  if (isLoading) {
    return (
      <div>Loading...</div>
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
                  <th colSpan="3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentInvoices.length === 0 ? <tr><td colSpan='7'>All caught up!</td></tr> 
                : currentInvoices.map(invoice => (
                  <tr key={invoice.Id}>
                    <td>{invoice.Vendor}</td>
                    <td>{invoice.Amount}</td>
                    <td>{invoice.Invoice}</td>
                    <td>{invoice.Date}</td>
                    <td>
                      <Button className='btn btn-lg btn-success' onClick={() => accept(invoice.Id)}> 
                        <FontAwesomeIcon icon={faThumbsUp}/> OK
                      </Button>
                    </td>
                    <td>
                      <Button className='btn btn-lg btn-primary' onClick={() => reject(invoice.Id)}>
                        <FontAwesomeIcon icon={faThumbsDown}/>NOK
                      </Button>
                    </td>
                    <td>
                      <Button className='btn btn-lg btn-danger' onClick={() => remove(invoice.Id)}>
                        <FontAwesomeIcon icon={faTrash}/>DEL
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  )
}

export default InvoiceList