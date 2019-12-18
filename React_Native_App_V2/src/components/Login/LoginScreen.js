import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView
} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

//Redux
import { connect } from 'react-redux';
import styles from '../../styles/LoginStyles';
import { loginAction } from '../../actions/authentificationActions';
//Components
import LoginButton from './login_components/LoginButton';
import LoginTextInput from './login_components/LoginTextInput';

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            password: "",
            title: "Norbi's Demo app",
            errorMessage: "",
            currentUser: {}
        }
    }

    onSwipeLeft = () => {
        this.props.navigation.navigate('SignUp')
    }

    handleUserNameChange = (userName) => {
        this.setState({ userName: userName });
    }

    handlePasswordChange = (password) => {
        this.setState({ password: password });
    }

    componentDidMount() {
        this.setState({ currentUser: this.props.currentUser })
    }

    handleLogin = () => {
        if (this.props.loggedIn === false) {
            this.props.login({
                userName: this.state.userName,
                password: this.state.password
            });
        }
        this.props.loggedIn === true ? this.props.navigation.navigate('Details') : null;
        this.setState({ currentUser: this.props.currentUser });
        this.setState({ errorMessage: this.props.errorMessage });
    }

    render() {
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };

        return (
            <GestureRecognizer
                onSwipeLeft={this.onSwipeLeft}
                config={config}
                style={{
                    flex: 1,
                    backgroundColor: this.state.backgroundColor
                }}
            >
                <View style={styles.wrapper}>
                    <ScrollView style={styles.scrollView}>
                        <Text style={styles.loginHeader}>{this.state.title}</Text>
                        <LoginTextInput
                            labelText="User Name"
                            labelTextSize={14}
                            inputType="text"
                            onChangeText={this.handleUserNameChange}
                        />
                        <LoginTextInput
                            labelText="Password"
                            labelTextSize={14}
                            inputType="password"
                            onChangeText={this.handlePasswordChange}
                        />
                    </ScrollView>
                    <Text>{this.state.errorMessage}</Text>
                    <LoginButton handleLogin={this.handleLogin} />
                </View >
            </GestureRecognizer>
        )
    }
}



const mapStateToProps = (state) => {
    return {
        loggedIn: state.authentificationReducers.user.loggedIn,
        currentUser: state.authentificationReducers.user.currentUser,
        errorMessage: state.authentificationReducers.user.loggerrorMessageedIn,
    };
};

const mapDispatchToProps = dispatch => ({
    login: (user) => dispatch(loginAction(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);