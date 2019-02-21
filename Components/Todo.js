import React from 'react'
import {Text, View, Button, Switch, StyleSheet} from 'react-native'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
    todoStyles: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 10,
        paddingTop: 10,
        backgroundColor: '#ffffff',
        marginBottom: 1,
    },
    todoTextStyle: {
        paddingStart: 10,
        paddingEnd: 10,
    },
    todoButtonStyle: {
        paddingRight: 5,
    },
})

const Todo = props => (
    <View style={styles.todoStyles}>
      <Switch onValueChange={props.onSwitch} value={props.todo.checked} />
      <Text style={[props.textStyle, styles.todoTextStyle]}>{props.todo.text}</Text>
      <View style={styles.todoButtonStyle}>
        <Button onPress={props.onDelete} title=" delete " />
      </View>
    </View>
)

Todo.propTypes = {
    todo: PropTypes.shape({
        text: PropTypes.string.isRequired,
        checked: PropTypes.bool,
    }),
    onSwitch: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
}

export default Todo