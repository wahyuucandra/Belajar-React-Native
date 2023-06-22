import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const TodoItem = ({todo, chooseTodo, deleteTodo}) => {
  return (
    <Pressable
        onPress={() => {
            chooseTodo(todo)
        }}
    >
        <View style={styles.item}>
            <Text>{todo.title}</Text>
            <Ionicons name="trash" size={20} color="red" onPress={() => {
                deleteTodo(todo)
            }}/>
        </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    item: {
        padding: 8,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 4,
        flexDirection: "row",
        justifyContent: "space-between"
    }
})

export default TodoItem