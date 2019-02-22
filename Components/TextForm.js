import React from 'react'
import {View, TextInput, Button, StyleSheet} from 'react-native'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
    button: {
        margin: 10,
    },
    textInputStyle: {
        color: 'red',
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        width: "80%",
        marginBottom: 10,
    },
})

const TextForm = props => (
    <View>
        <View style={styles.textInputStyle}>
        <TextInput 
            placeholder={'Enter text... length {min: 10, max: 120}'} 
            maxLength={120} 
            multiline = {true}
            numberOfLines = {3}
            textBreakStrategy = {'highQuality'}
            onChangeText={props.handleChangeText}
            value={props.text}
        />
        </View>
        <View style={styles.button}>
            <Button style={styles.button} disabled={props.isDisabled} onPress={props.handleNewTODO} title="+ Add New" />
        </View>
    </View>
)

TextForm.protoTypes = {
    text: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    handleChangeText: PropTypes.func.isRequired,
    handleNewTODO: PropTypes.func.isRequired,
}

export default TextForm