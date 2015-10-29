import { Component } from 'react';
import ReactMixin from 'react-mixin';

import TodoHeader from './components/TodoHeader';
import TodoList from './components/TodoList';

import Tasks from 'TodoApp/collections/Tasks';

@ReactMixin.decorate(ReactMeteorData)
export default class TodoMain extends Component {

  state = {
    hideCompleted: false
  }

  // Meteor とつながれる
  getMeteorData() {

    // Without the autopublish package,
    // we will have to specify explicitly
    // what the server sends to the client.
    // The functions in Meteor that do this
    // are `Meteor.publish` and `Meteor.subscribe`.
    Meteor.subscribe('tasks');

    let taskFilter = {};

    // 完了したタスクを隠すか否かをリアクティブに監視できる
    if (this.state.hideCompleted) {
      taskFilter.checked = {$ne: true};
    }

    const tasks = Tasks.find(taskFilter, {sort: {createdAt: -1}}).fetch();
    const incompleteCount = Tasks.find({checked: {$ne: true}}).count();

    return {
      tasks,
      incompleteCount,

      // user もとれるのか
      user: Meteor.user()

    };
  }

  handleToggleHideCompleted = (e) => {
    this.setState({ hideCompleted: e.target.checked });
  }

  render() {
    if (!this.data.tasks) {
      // loading
      return null;
    }

    return (
        <div className="container">
          <TodoHeader
              incompleteCount={this.data.incompleteCount}
              hideCompleted={this.state.hideCompleted}
              toggleHideCompleted={this.handleToggleHideCompleted}
          />
          <TodoList tasks={this.data.tasks} />
        </div>
    );
  }
};
