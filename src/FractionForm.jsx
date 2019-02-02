// src/FractionForm.jsx

import React from 'react'
import PropTypes from 'prop-types'
import { Container, Col, Form as BS4Form, FormGroup, Button } from 'reactstrap'
import { Form } from 'react-final-form'
import QuantityInput from './QuantityInput.jsx'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
  await sleep(300)
  window.alert(JSON.stringify(values, 0, 2))
}

const renderFractionForm = ({
  handleSubmit,
  form,
  submitting,
  pristine,
  values
}) => (
  <Container>
    <BS4Form>
      <FormGroup>
        <Col>
          <QuantityInput name="quantity" />
        </Col>
      </FormGroup>
      <FormGroup>
        <Col>
          <Button color="primary" onClick={handleSubmit} disabled={false}>
            Submit
          </Button>
        </Col>
      </FormGroup>
      <FormGroup>
        <pre>{JSON.stringify(values, 0, 2)}</pre>
      </FormGroup>
    </BS4Form>
  </Container>
)

const validateFractionForm = values => {
  const errors = {}
  const errRequiredMsg = field =>
    `A valid "${field}" is required. Please provide one.`
  if (!values.quantity) {
    errors.quantity = errRequiredMsg('quantity')
  }

  return errors
}

const FractionForm = () => (
  <Form
    onSubmit={onSubmit}
    render={renderFractionForm}
    validate={validateFractionForm}
  />
)

export default FractionForm
