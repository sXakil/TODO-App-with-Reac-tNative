import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, ScrollView} from 'react-native';
import uuidv4 from 'uuid/v4';
import Todo from './Components/Todo'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
let id = 0

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [],
    }
  }
  componentDidMount() {
    this.interval = setInterval(() => {id += 100}, 1000)
  }
  newTodo = () => {
    const text = 'The TODO - ' + id;
    this.setState({
      todos: [...this.state.todos, { id: id++, text,}],
    })
  }
  deleteTodo = id => {
    clearInterval(this.interval)
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id),
    })
  }
  toggleCheck = id => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id !== id) return todo
        return {
          id: todo.id,
          text: todo.text,
          checked: !todo.checked,
        }
      })
    })
  }
  render() {
    let crossOff = {}
    return (
      <View style={styles.container}>
        <Text> Total TODOs: {this.state.todos.length} </Text>
        <Text> Checked TODOs: {this.state.todos.filter(todo => todo.checked).length} </Text>
        <View style={styles.button}>
          <Button onPress={this.newTodo} title="+ Add New" />
        </View>
        <ScrollView style={{width: "98%"}}>
          {this.state.todos.map(todo => {
            crossOff = todo.checked ? {textDecorationLine: 'line-through'}  : {textDecorationLine: 'none'}
            return (
              <Todo 
                key={uuidv4()} todo={todo} textStyle={crossOff} 
                onSwitch={() => this.toggleCheck(todo.id)} 
                onDelete={() => this.deleteTodo(todo.id)}
              />
            )})}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddddff',
  },
  button: {
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 5,
  },
})
