import { Component, PropTypes } from 'react';

export default class TodoItem extends Component {
  static propTypes = {
    task: PropTypes.object.isRequired
  }

  setChecked(e) {
    // Set the checked property to the opposite of its current value
    Meteor.call('setChecked', this.props.task._id, e.target.checked);
  }

  deleteTask() {
    Meteor.call('deleteTask', this.props.task._id);
  }

  setPrivate() {
    Meteor.call('setPrivate', this.props.task._id, !this.props.task.private);
  }

  renderTogglePrivate() {
    const isTaskOwner = Meteor.userId() !== this.props.task.owner;
    if (isTaskOwner) return null;

    return (
      <button className="toggle-private" onClick={::this.setPrivate}>
      </button>
    );
  }

  render() {
    let itemClass = '';

    if (this.props.task.checked) {
      itemClass += 'checked';
    }

    if (this.props.task.private) {
      itemClass += ' private';
    }

    return (
      <li className={itemClass}>
        <button className="delete" onClick={this.handleDelete.bind(this)}>&times;</button>
        <input type="checkbox" checked={this.props.task.checked} onChange={this.handleChecked.bind(this)} className="toggle-checked" />
        <button
          className="delete"
          onClick={::this.deleteTask}>&times;</button>
        <input
          type="checkbox"
          checked={this.props.task.checked}
          onChange={::this.setChecked}
          className="toggle-checked" />
        {this.renderTogglePrivate()}
        <span className="text">
          <strong>{this.props.task.text}</strong> - by {this.props.task.username}
        </span>
      </li>
    );
  }
}
