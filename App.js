import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, ToastAndroid} from 'react-native'
import uuidv4 from 'uuid'
import TextForm from './Components/TextForm'
import Todo from './Components/Todo'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddddff',
  },
  textLabel: {
    textAlign: 'center',
    backgroundColor: 'royalblue',
    color: 'white',
    width: '100%',
    marginBottom: 5,
  },
})


let id = 1
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [],
      text: '',
      disableButton: true,
    }
  }
  newTodo = () => {
    this.setState(() => {
      let newTodos = {
        todos: [...this.state.todos, { id: id++, text : this.state.text,}],
        text: '',
        disableButton: true,
      }
      return newTodos
  })
    ToastAndroid.show('New TODO added!', ToastAndroid.SHORT);
  }
  deleteTodo = id => {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id),
    })
    ToastAndroid.show(`TODO: ${id} deleted successfully!`, ToastAndroid.SHORT);
  }
  toggleCheck = id => {
    let status = 'done'
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id !== id) return todo
        if (todo.checked) status = 'undone'
        return {
          id: todo.id,
          text: todo.text,
          checked: !todo.checked,
        }
      })
    })
    ToastAndroid.show(`TODO: ${id} marked as ${status}!`, ToastAndroid.SHORT);
  }
  checkLength = (value) => {
      if(value.length >= 10) this.setState({disableButton: false,})
      else this.setState({disableButton: true,})
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textLabel}> Total TODOs: {this.state.todos.length} </Text>
        <Text style={styles.textLabel}> Checked TODOs: {this.state.todos.filter(todo => todo.checked).length} </Text>
        <TextForm 
          text={this.state.text}
          isDisabled={this.state.disableButton}
          handleChangeText={text => {
              this.checkLength(text)
              this.setState({text,})
            }
          }
          handleNewTODO={this.newTodo}
        />
        <ScrollView style={{width: "98%"}}>
            {this.state.todos.map(todo => {
            return (
                <Todo 
                    key={uuidv4()} todo={todo} 
                    todoStyle={todo.checked ? {backgroundColor: '#ffdddd',}  : {backgroundColor: '#ffffff',}} 
                    onSwitch={() => this.toggleCheck(todo.id)} 
                    onDelete={() => this.deleteTodo(todo.id)}
                />
            )})}
        </ScrollView>
      </View>
    )
  }
}