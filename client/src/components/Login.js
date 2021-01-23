import React, { useState } from 'react';
import axios from 'axios'
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';

const Login = (props) => {

  const initialState = {
    username: '',
    password: ''
  }
const [credentials, setCredentials] = useState(initialState)

const [errorMessage, setErrorMessage] = useState('')

const onChangeHandler = (e) => {
  setCredentials({...credentials, [e.target.name]: e.target.value})
}

const onSubmitHandler = (e) => {
  e.preventDefault()
  console.log('submitted');
  axios.post('http://localhost:5000/api/login', credentials)
  .then(res => {
    localStorage.setItem('token', res.data.payload)
    props.history.push('/list')
  })
  
  .catch(err => setErrorMessage(err.message))
}



  return (
    <Container className="themed-container">
    <Form onSubmit={onSubmitHandler}>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="username" className="mr-sm-2">Username</Label>
        <Input type="text" name="username" id="userName" placeholder="enter name" onChange={onChangeHandler}/>
      </FormGroup>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="loginPassword" className="mr-sm-2">Password</Label>
        <Input type="password" name="password" id="loginPassword" placeholder="enter password" onChange={onChangeHandler}/>
      </FormGroup>
      <Button>Submit</Button>
    </Form>
    {errorMessage ? <h3>{errorMessage}: Invalid Credentials</h3> : <span></span>}
    </Container>
  );
}

export default Login;