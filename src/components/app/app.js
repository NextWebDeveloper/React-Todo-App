import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {

  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch')
    ],
    search: '',
    filter: 0 // 0 - all, 1 - active, 2 - done
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  }

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex(x => x.id === id);
    const oldItem = arr[idx];
    const newItem = {...oldItem, [propName]: !oldItem[propName]};

    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ];
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      }
    })
  }

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      }
    })
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newArray = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ];

      return {
        todoData: newArray
      };
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      const newArr = [
        ...todoData,
        newItem
      ];

      return {
        todoData: newArr
      };
    });
  };

  onSearchChanged = (e) => {
    this.setState({
      search: e.target.value.toLowerCase()
    })
  }

  onFilterClicked = (val) => {
    this.setState({
      filter: val
    })
  }

  render() {

    const { todoData, search, filter } = this.state;
    const doneCount = todoData.filter(item => item.done).length;
    const todoCount = todoData.length - doneCount;

    const todos = todoData.filter( item => {

      const checkSearch = item.label.toLowerCase().includes(search)

      let checkFilter = true;

      switch(filter) {
        case 1:
          checkFilter = item.done === false
          break;
        case 2:
          checkFilter = item.done === true
          break;
      }

      return checkSearch && checkFilter;
    })

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChanged={ this.onSearchChanged }/>
          <ItemStatusFilter 
            onFilterClicked={ this.onFilterClicked }
            activeFilter={ filter }/>
        </div>

        <TodoList
          todos={ todos }
          onDeleted={ this.deleteItem } 
          onToggleImportant={ this.onToggleImportant } 
          onToggleDone={ this.onToggleDone }/>

        <ItemAddForm onItemAdded={this.addItem}/>
      </div>
    );
  }
};