import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FlatList } from 'react-native'
import { employeeFetch } from '../actions'
import ListItem from './ListItem'

class EmployeeList extends Component {

  componentDidMount() {
    this.props.employeeFetch()
  }

  renderItem(employee){
    return <ListItem employee={employee}/>
  }

  render(){
    console.log(this.props)
    return(
      <FlatList
        data={this.props.employees}
        renderItem={this.renderItem}
        keyExtractor={employee => employee.uid.toString()}
      />
    )
  }
}

const mapStateToProps = state => { 
  // for each key:value employee pair, return it as an object in an array
  const employees = _.map(state.employees, (val, uid) => {
    return { ...val, uid}
  })

  return { employees }
}

export default connect(mapStateToProps, { employeeFetch })(EmployeeList)