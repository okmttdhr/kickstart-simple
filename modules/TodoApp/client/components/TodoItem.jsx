import { Component, PropTypes } from 'react';
import classNames from 'classnames'

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
        {this.props.task.private ? 'Make this Public' : 'Make this Private'}
      </button>
    );
  }

  render() {
    return (
      <li className={classNames({
        'checked': this.props.task.checked,
        'private': this.props.task.private,
      })}>
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
