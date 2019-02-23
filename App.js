import React, {Component} from 'react'
import {ScrollView, StyleSheet, Text, ToastAndroid, View} from 'react-native'
import uuidv4 from 'uuid'
import TextForm from './Components/TextForm'
import Todo from './Components/Todo'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#181818',
    },
    card: {
        color: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: '#333333',
        padding: 5,
        width: '99%',
        margin: 5,
    },
    textLabel: {
        textAlign: 'center',
        backgroundColor: '#323232',
        color: '#888888',
        width: '100%',
        marginBottom: 5,
    },
});

let id = 1;
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            text: '',
            disableButton: true,
        }
    }
    newTodo = () => {
        this.setState(() => {
            return {
                todos: [...this.state.todos, {id: id++, text: this.state.text,}],
                text: '',
                disableButton: true,
            }
        });
        ToastAndroid.show('New TODO added!', ToastAndroid.SHORT);
    };
    deleteTodo = id => {
        this.setState({
            todos: this.state.todos.filter(todo => todo.id !== id),
        });
        ToastAndroid.show(`TODO: ${id} deleted successfully!`, ToastAndroid.SHORT);
    };
    toggleCheck = id => {
        let status = 'done';
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id !== id) return todo;
                if (todo.checked) status = 'undone';
                return {
                    id: todo.id,
                    text: todo.text,
                    checked: !todo.checked,
                }
            })
        });
        ToastAndroid.show(`TODO: ${id} marked as ${status}!`, ToastAndroid.SHORT);
    };
    checkLength = (value) => {
        if(value.length >= 10) this.setState({disableButton: false,});
        else this.setState({disableButton: true,})
    };
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textLabel}> Total TODOs: {this.state.todos.length} </Text>
                <Text style={styles.textLabel}> Checked TODOs: {this.state.todos.filter(todo => todo.checked).length} </Text>
                <TextForm
                    text={this.state.text}
                    isDisabled={this.state.disableButton}
                    handleChangeText={
                        text => {
                            this.checkLength(text);
                            this.setState({text,})
                        }
                    }
                    handleNewTODO={this.newTodo}
                />
                <ScrollView style={this.state.todos.length ? styles.card : 'none'}>
                    {this.state.todos.map(
                        todo => {
                            return (
                                <Todo
                                    key={uuidv4()} todo={todo}
                                    todoStyle={todo.checked ? {backgroundColor: '#555555',} : {backgroundColor: '#777777',}}
                                    todoTextStyle={todo.checked ? {textDecorationLine: 'line-through', color: '#888888',} : {textDecorationLine: 'none', color: '#dddddd',}}
                                    onSwitch={() => this.toggleCheck(todo.id)}
                                    onDelete={() => this.deleteTodo(todo.id)}
                                />
                            )
                        })}
                </ScrollView>
            </View>
        )
    }
}