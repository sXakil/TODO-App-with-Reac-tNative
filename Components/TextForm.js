import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
    card: {
        color: 'white',
        borderRadius: 10,
        backgroundColor: '#3c3f41',
        padding: 15,
        minWidth: '90%',
        alignItems: 'center',
        marginBottom: 5,
    },
    button: {
        margin: 8,
    },
    textInputView: {
        borderBottomColor: '#ffffff',
        borderBottomWidth: 1,
        width: "80%",
        marginBottom: 10,
    },
    textInputStyle: {
        color: '#ffffff',
    },
    buttonStyle: {
        backgroundColor: '#888888',
    },
    titleStyle: {
        color: '#dddddd',
    },
    disabledButtonStyle: {
        backgroundColor: "#555555"
    },
    disabledTitleStyle: {
        color: '#888888'
    }
});

const TextForm = props => (
    <View style={styles.card}>
        <View style={styles.textInputView}>
            <TextInput
                style={styles.textInputStyle}
                placeholder={'Enter text... (min 10, max 120)'}
                placeholderTextColor={'lightgrey'}
                maxLength={120}
                multiline={true}
                numberOfLines={3}
                textBreakStrategy={'highQuality'}
                onChangeText={props.handleChangeText}
                value={props.text}
            />
        </View>
        <View style={styles.button}>
            <Button
                style={styles.button}
                buttonStyle={styles.buttonStyle}
                titleStyle={styles.titleStyle}
                disabledStyle={styles.disabledButtonStyle}
                disabledTitleStyle={styles.disabledTitleStyle}
                disabled={props.isDisabled}
                onPress={props.handleNewTODO}
                title="+ Add New"
            />
        </View>
    </View>
);

TextForm.protoTypes = {
    text: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    handleChangeText: PropTypes.func.isRequired,
    handleNewTODO: PropTypes.func.isRequired,
};

export default TextForm