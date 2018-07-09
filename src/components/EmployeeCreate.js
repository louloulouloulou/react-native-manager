import React, { Component } from 'react'
import { connect } from 'react-redux'
import { employeeCreate, employeeFormClear } from '../actions'
import { Card, CardSection, Button} from './common'
import EmployeeForm from './EmployeeForm'

class EmployeeCreate extends Component {

  componentDidMount(){
    this.props.employeeFormClear()
  }

  onButtonPress() {
    const { name, phone, shift } = this.props

    this.props.employeeCreate({ name, phone, shift: shift || "Monday" })
  }

  render(){
    return(
      <Card>
        <EmployeeForm/>
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Add
          </Button>
        </CardSection>
      </Card>
    )
  }
}

const mapStateToProps = state => {
  const { name, phone, shift } = state.employeeForm // employeeForm reducer state

  return { name, phone, shift }
}

export default connect(mapStateToProps, {
  employeeCreate, employeeFormClear
})(EmployeeCreate)