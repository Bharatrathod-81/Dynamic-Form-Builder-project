
import React , { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

function App() {


  const [show, setShow] = useState(false);
  const [fields, setFields] = useState([]);
  const [newField, setNewField] = useState({
    fieldTypeId: '',
    fieldText: '',
    options: [],
    width: '40%',
    required: false,
    validation: '',
  });

  useEffect(() => {
    setFields(JSON.parse(localStorage.getItem("setFormData") || "[]"));
  },[]);

  const [options, setOptions] = useState([]);

  const fieldTypes = [
    { typeId: 1, name: "ShortTextResponse" },
    { typeId: 2, name: "LongTextResponse" },
    { typeId: 3, name: "DropDown" },
    { typeId: 4, name: "Checkbox" },
    { typeId: 5, name: "RadioButton" },
    { typeId: 6, name: "Date" },
    { typeId: 7, name: "Note" }
  ];


  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true);


  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setNewField({ ...newField, [name]: value });
  };

  

  const handleOptionChange = (event) => {
    console.log(event.target.value?.split(',').map(e => e.trim()));
    
    setOptions(event.target.value?.split(',').map(e => e.trim()));
  };

  
  const handleAddField = () => {
    const allData = [...fields, { ...newField, options }];
    localStorage.setItem("setFormData", JSON.stringify(allData));
    setFields(allData);
    setNewField({ fieldTypeId: '', fieldText: '', options: [], width: '40%', required: false })
    setOptions([]);
    handleClose();
  };



  return (
    <div className="App">
      <div className="container mt-5">
      <Button variant="primary" onClick={handleShow}>Add New Field</Button>

      

      <div className="mt-4">
        {fields.map((field, index) => (
          <Row key={index} style={{ width: field.width,backgroundColor: 'rgb(195, 233, 242)' , borderRadius:'12px', padding:"5px 3px", margin:'10px 0px'}}>
            <Col className=''>
              <Form.Group>
                <Form.Label className='fw-bold'>{field.fieldText}</Form.Label>
                {field.fieldTypeId === "ShortTextResponse" && <Form.Control type="text" maxLength={60}/>}
                {field.fieldTypeId === "LongTextResponse" && <Form.Control type="text" maxLength={100}/>}
                {field.fieldTypeId === "DropDown" && (
                  <Form.Select>
                    {field.options.map((option, i) => (
                      <option key={i}>{option}</option>
                    ))}
                  </Form.Select>
                )}
                {field.fieldTypeId === "Checkbox" && (
                  field.options.map((option, i) => (
                    <Form.Check key={i} type="checkbox" label={option} />
                  ))
                )}
                {field.fieldTypeId === "RadioButton" && (
                  field.options.map((option, i) => (
                    <Form.Check key={i} type="radio" name={`radio-${index}`} label={option} />
                  ))
                )}
                {field.fieldTypeId === "Date" && <Form.Control type="date"/>}
                {field.fieldTypeId === "Note" && <Form.Control as="textarea" rows={3} />}
              </Form.Group>
            </Col>
          </Row>
        ))}
      </div>

     

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Field</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Field Label</Form.Label>
              <Form.Control type="text" name="fieldText" value={newField.fieldText} onChange={handleFieldChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Field Type</Form.Label>
              <Form.Select name="fieldTypeId" value={newField.fieldTypeId} onChange={handleFieldChange}>
                <option>Select Field Type</option>
                {fieldTypes.map((type) => (
                  <option key={type.typeId} value={type.name}>{type.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Required"
                name="required"
                checked={newField.required}
                onChange={(e) => setNewField({ ...newField, required: e.target.checked })}
              />
            </Form.Group>
            {["DropDown", "Checkbox", "RadioButton"].includes(newField.fieldTypeId) && (
              <div>
                <Form.Group className="mb-3">
              <Form.Label>Field Label</Form.Label>
              <Form.Control type="text" name="fieldText"  onChange={handleOptionChange} />
                  </Form.Group>
              </div>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleAddField}>Add Field</Button>
        </Modal.Footer>
      </Modal>
    </div>
    </div>
  );
}

export default App;
