// src/components/NumberInput.jsx

import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { Input, FormFeedback } from 'reactstrap'
import { Field } from 'react-final-form'
import parseDecimalNumber from 'parse-decimal-number'

// language dependent thousands and decimal separators
// the fisrt char is the thousands separator, the second is the decimal separator
const decimaleSeparatorsMap = {
  nl: '.,',
  fr: '.,',
  en: ',.'
}

// TODO What about 1 1/2
// TODO implement jest test cases
function parseQuantity(quantityString, language) {
  // cleanup the spaces
  quantityString = quantityString.replace(/\s+/, '')
  // define the structure of an invalid quantity
  const INVALID_QUANTITY = {
    value: null,
    string: quantityString,
    type: 'INVALID'
  }
  // get the language specific decimal and thousands separators
  const separators = decimaleSeparatorsMap[language]
  // console.log(`separators: ${separators}`)
  // Check if it is a number
  const number = parseDecimalNumber(quantityString, separators)
  if (!isNaN(number)) {
    // OK it's a number
    return {
      value: number,
      string: quantityString,
      type: 'NUMBER'
    }
  }
  // check if it is maybe a fraction()
  const fractionRegExp = /^\s*(\d+)\s*[/]\s*(\d+)\s*$/
  const fractionMatch = quantityString.match(fractionRegExp)
  console.log(`fractionMatch: ${JSON.stringify(fractionMatch)}`)
  if (!fractionMatch) {
    // not a fraction
    return INVALID_QUANTITY
  }
  // It's a fraction
  const [, nominatorStr, denominatorStr] = fractionMatch
  const [numerator, denominator] = [
    Number(nominatorStr),
    Number(denominatorStr)
  ]
  if (denominator === 0) {
    return INVALID_QUANTITY
  }
  if (numerator === denominator) {
    return {
      value: 1,
      string: quantityString,
      type: 'NUMBER'
    }
  }
  if (denominator === 1) {
    return {
      value: numerator,
      string: quantityString,
      type: 'NUMBER'
    }
  }
  return {
    value: [numerator, denominator],
    string: quantityString,
    type: 'FRACTION'
  }
}

// use fraction.js, parse-fraction (optionally math.js to parse and format fractions)
// OR use "1/3 cup", "1/2 cup" "1/4 cup" as separate units, in analogy to using "gr" and "kg"
const QuantityInputAdapter = ({ input, meta, ...rest }) => {
  console.log(
    `QuantityInputAdpater input.value: ${JSON.stringify(input.value)}`
  )
  return (
    <Fragment>
      <Input
        onChange={event => {
          console.log(`onChange value: `, event.target.value)
          input.onChange(event.target.value)
        }}
        value={input.value}
        type="text"
        invalid={meta.error && meta.touched}
        valid={meta.touched && !meta.error}
        {...rest}
      />
      {meta.error && meta.touched && (
        <FormFeedback style={{ display: 'block' }}>{meta.error}</FormFeedback>
      )}
    </Fragment>
  )
}

QuantityInputAdapter.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.string.isRequired
  })
}

const QuantityInput = ({ name, language, ...rest }) => {
  return (
    <Field
      name={name}
      component={QuantityInputAdapter}
      parse={value => {
        console.log(`value in Field Parse: ${JSON.stringify(value)}`)
        return parseQuantity(value, language)
      }}
      format={value => {
        console.log(`value in Field Format: ${JSON.stringify(value)}`)
        return value ? value.string : ''
      }}
      {...rest}
    />
  )
}

QuantityInput.defaultProps = {
  language: 'nl'
}

QuantityInput.propTypes = {
  name: PropTypes.string.isRequired,
  language: PropTypes.string
}

export default QuantityInput
