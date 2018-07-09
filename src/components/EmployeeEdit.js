import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Communications from 'react-native-communications'
import { employeeCreate } from '../actions'
import { Card, CardSection, Button, Confirm } from './common'
import EmployeeForm from './EmployeeForm'
import { employeeUpdate, employeeSave, employeeDelete } from '../actions'

class EmployeeEdit extends Component {

  state = {
    showModal: false
  }

  componentDidMount() {
    _.each(this.props.employee, (value, prop) => {
      this.props.employeeUpdate({ prop, value })
    })
  }

  onTextPress() {
    const { name, phone, shift } = this.props

    Communications.text(phone, `Hey, ${name}. Your upcoming shift is on ${shift}.`)
  }

  onSavePress() {
    const { name, phone, shift } = this.props
    //update the appropriate entry - based on the pre-populated uid in props
    this.props.employeeSave({ name, phone, shift: shift || "Monday", uid: this.props.employee.uid })
  }

  onAccept(){
    const { uid } = this.props.employee

    this.props.employeeDelete({ uid })
    this.setState({showModal: false})
  }

  onDecline(){
    this.setState({showModal: false})
  }

  render(){
    return(
      <Card>
        <EmployeeForm {...this.props}/>
        <CardSection>
          <Button onPress={this.onSavePress.bind(this)}>
            Save Changes
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={this.onTextPress.bind(this)}>
            Text Schedule
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={() => this.setState({showModal: !this.state.showModal})}>
            Fire {this.props.name}
          </Button>
        </CardSection>

        <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
        >
          Are you sure you want to fire {this.props.name}?
        </Confirm>
      </Card>
    )
  }
}

const mapStateToProps = state => {
  const { name, phone, shift } = state.employeeForm // employeeForm reducer state

  return { name, phone, shift }
}

export default connect(mapStateToProps, {
  employeeUpdate, 
  employeeSave,
  employeeDelete
})(EmployeeEdit)