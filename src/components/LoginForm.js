import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import { Card, CardSection, Input, Button, Spinner } from './common'
import { emailChanged, passwordChanged, loginUser } from '../actions'

class LoginForm extends Component {

  onEmailChange(email){
    this.props.emailChanged(email)
  }

  onPasswordChange(password){
    this.props.passwordChanged(password)
  }

  onLoginPress(){
    const { email, password } = this.props

    this.props.loginUser({ email, password })
  }

  renderError(){
    if(this.props.error){
      return (
        <View style={{ backgroundColor: 'white' }}>
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
        </View>
      )
    }
  }

  renderButton(){
    if(this.props.loading){
      return <Spinner size="large" />
    }

    return(
      <Button onPress={this.onLoginPress.bind(this)}>
        Log In
      </Button>
    )
  }

	render(){
		return(
			<Card>
				<CardSection>
					<Input
						label="Email"
						placeholder="yourname@email.com"
						autoCapitalize="none"
            onChangeText={this.onEmailChange.bind(this)}
					  value={this.props.email}
          />
				</CardSection>
				
				<CardSection>
					<Input
						secureTextEntry
						label="Password"
						placeholder="password"
						autoCapitalize="none"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
					/>
				</CardSection>

        {this.renderError()}

				<CardSection>
	       {this.renderButton()}
				</CardSection>
			</Card>
		)
	}
}

const mapStateToProps = state => {
  // state.auth is what houses data because of how we link in reducers.index
  const { email, password, error, loading } = state.auth

  return { email, password, error, loading }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
}

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm)