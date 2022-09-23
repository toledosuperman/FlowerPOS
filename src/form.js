import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function OrderForm() {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Order Number</Form.Label>
        <Form.Control type="Order Number"/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Customer Name</Form.Label>
        <Form.Control type="Customer Name"/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Customer Address</Form.Label>
        <Form.Control type="Customer Address"/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Customer City</Form.Label>
        <Form.Control type="Customer City"/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Customer State</Form.Label>
        <Form.Control type="Customer State"/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Customer Zip</Form.Label>
        <Form.Control type="Customer Zip"/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Customer Phone</Form.Label>
        <Form.Control type="Customer Phone"/>
      </Form.Group>

    </Form>
  );
}

export default BasicExample;