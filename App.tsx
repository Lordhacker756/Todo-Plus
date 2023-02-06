import React, {useState, useLayoutEffect, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  Image,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

function App(): JSX.Element {
  const [todos, setTodos] = useState([
    'Try adding some tasks for your awesome day! 💫',
  ]);

  useLayoutEffect(() => {
    AsyncStorage.getItem('todos').then(todos => {
      if (todos) {
        setTodos(JSON.parse(todos));
        console.log(todos);
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const [task, setTask] = useState('');

  const addTask = () => {
    task && setTodos(prevTasks => [task, ...prevTasks]);
  };

  const removeTask = (index: number) => {
    const newTodos = todos.filter((todo, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Todos 📝</Text>
      </View>
      <View style={styles.todoEntry}>
        <TextInput
          style={styles.input}
          placeholder="Enter Task!"
          onChangeText={text => setTask(text)}
        />
        <Button color="black" title="Add Task" onPress={addTask} />
      </View>
      <View style={styles.taskHeader}>
        <Text style={styles.taskText}>Tasks ✏</Text>
      </View>

      {!(todos.length === 0) ? (
        <FlatList
          style={styles.taskContainer}
          data={todos}
          renderItem={todoData => {
            return (
              <View key={todoData.index} style={styles.todoContainer}>
                <Text>{todoData.item}</Text>
                <Button
                  color="gray"
                  title="Delete"
                  onPress={() => removeTask(todoData.index)}
                />
              </View>
            );
          }}
        />
      ) : (
        <View style={styles.emptyDiv}>
          <Image source={require('./empty.jpg')} style={{}} />
          <Text style={styles.emptyText}>Add Some Tasks UwU</Text>
        </View>
      )}
      {/* </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  text: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'normal',
  },
  todoEntry: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    backgroundColor: 'gray',
    flex: 3,
    height: 40,
    padding: 10,
    borderRadius: 5,
  },
  taskBtn: {
    flex: 1,
    margin: 10,
    backgroundColor: 'white',
    color: 'black',
  },
  taskHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    padding: 20,
  },
  taskText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  taskContainer: {
    display: 'flex',
    width: '100%',
    paddingHorizontal: 5,
    marginBottom: 20,
  },
  todoContainer: {
    display: 'flex',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    padding: 15,
    gap: 10,
    width: '100%',
    marginBottom: 10,
  },
  emptyDiv: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
  },
  taskParent: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default App;
