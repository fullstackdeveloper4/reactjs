import React , {useState} from "react";
import { Card } from 'react-bootstrap';
import { useSelector } from "react-redux";
import DimentionComponent from "../components/DimentionComponent";
import FromTo from "../components/FromTo";
import QuoteDetail from "../components/QuoteDetail";
import Alert from '@mui/material/Alert';
import '../styles/quote.css'
import Alertify from "./Alertify";
// import Main from "./Main";

const FormContainer = ({ className, children , type , setType , message , setMessage}) => {
  return (
    <div className="quote-container">
      <div className="container">
      {(type==="error" || type==="success") && <Alertify  message={message} type={type} setMessage={setMessage}  setType={setType} />}
        <Card>
          <Card.Body className="p-0">
            {children}
          </Card.Body>
        </Card>
      </div>
    </div>
  )
};

const Quote = () => {
  const quoteDetail = useSelector(state => state.auth.quoteDetail);
  const [tax , setTax] = useState("")
  const [type , setType]= useState("")
  const [message , setMessage]= useState("")
  return (
    
    <>
      <FormContainer className="mb-4" message={message} type={type}  setType={setType}  setMessage={setMessage}>
        <FromTo setTax={setTax} message={message} type={type}  setType={setType} setMessage={setMessage}/>
      </FormContainer>
      {quoteDetail && quoteDetail.from_address ?
        <FormContainer className="mb-4">
          <DimentionComponent />
        </FormContainer>
      : ""}
      {(quoteDetail && quoteDetail.price) ? 
          <FormContainer className="mb-4">
          <QuoteDetail />
        </FormContainer>
      : ""}
      </>
  )
}

export default Quote;
