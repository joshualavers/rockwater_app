import React, { Component } from 'react';
import { View, Text, Keyboard, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { CardSection, Input, Button, Spinner, Card } from './common';
import { emailChanged, passwordChanged, loginUser } from '../actions';

class LoginForm extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;

    this.props.loginUser({ email, password });
    Keyboard.dismiss(); //close keyboard on Android
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)} style={{ backgroundColor: 'rgba(0,0,0,0)' }}>
        Login
      </Button>
    );
  }

  renderError() {
    if (this.props.error) {
      return (
        <View style={{ backgroundColor: 'white' }}>
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <ImageBackground
          source={{ uri: 'http://www.hometeamnl.ca/myfiles/Fotolia_22392883_M.jpg' }}
          style={styles.backgroundImage}
        >
          <Card>
           <CardSection style={styles.inputStyle}>
              <Input
                label="Email"
                placeholder="email@gmail.com"
                onChangeText={this.onEmailChange.bind(this)}
                value={this.props.email}
              />
            </CardSection>
            <CardSection style={styles.inputStyle}>
              <Input
                secureTextEntry
                label="Password"
                placeholder="password"
                onChangeText={this.onPasswordChange.bind(this)}
                value={this.props.password}
              />
            </CardSection>

            {this.renderError()}

            <CardSection style={styles.inputStyle}>
              {this.renderButton()}
            </CardSection>
          </Card>
        </ImageBackground>
      </View>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  containerStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  inputStyle: {
    backgroundColor: 'rgba(0,0,0,0.4)'
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;

  return { email, password, error, loading };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser })(LoginForm);
