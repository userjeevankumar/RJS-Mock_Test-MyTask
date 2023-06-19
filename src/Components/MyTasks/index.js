import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class MyTasks extends Component {
  state = {
    addedTasks: [],
    taskButton: tagsList[0].displayText,
    inputValue: '',
    isFilterActive: false,
    filteredText: '',
    selectedFilteredText: '',
  }

  onChangeInput = event => {
    this.setState({inputValue: event.target.value})
  }

  onChangeButton = event => {
    this.setState({taskButton: event.target.value})
  }

  onClickFilter = eachItem => {
    const {isFilterActive} = this.state
    this.setState({
      isFilterActive: !isFilterActive,
      selectedFilteredText: eachItem.displayText,
    })
    console.log(isFilterActive)
  }

  getFilteredAppointmentsList = () => {
    const {filteredText, selectedFilteredText, isFilterActive} = this.state
    if (isFilterActive) {
      return filteredText.filter(
        eachTransaction => eachTransaction.displayText === selectedFilteredText,
      )
    }
    return filteredText
  }

  renderFilteredTags = () => {
    const addedFilter = this.getAddedFilter()

    return (
      <ul className="tags-list">
        {addedFilter.map(eachItem => (
          <li className="task-display" key={eachItem.id}>
            <p className="tag-item">{eachItem.item}</p>
            <p className="tag-name">{eachItem.taskType}</p>
          </li>
        ))}
      </ul>
    )
  }

  onClickAddTask = event => {
    event.preventDefault()
    const {inputValue, taskButton} = this.state
    const addNewItem = {
      id: uuidv4(),
      item: inputValue,
      taskType: taskButton,
    }

    this.setState(prevState => ({
      addedTasks: [...prevState.addedTasks, addNewItem],
      inputValue: '',
      taskButton: tagsList[0].displayText,
    }))
  }

  renderAllTasks = () => {
    const {addedTasks} = this.state
    return (
      <ul className="tags-list">
        {addedTasks.map(eachItem => (
          <li className="task-display" key={eachItem.id}>
            <p className="tag-item">{eachItem.item}</p>
            <p className="tag-name">{eachItem.taskType}</p>
          </li>
        ))}
      </ul>
    )
  }

  renderTasks = () => {
    const {isFilterActive} = this.state
    return (
      <div>
        {isFilterActive ? this.renderFilteredTags() : this.renderAllTasks()}
      </div>
    )
  }

  renderAddTask = () => (
    <div>
      <h1 className="no-task-head">No Tasks added yet</h1>
    </div>
  )

  render() {
    const {addedTasks, taskButton, inputValue} = this.state

    return (
      <div className="main-container">
        <div className="input-container">
          <h1 className="create-heading">Create a task</h1>
          <form className="form-container" onSubmit={this.onClickAddTask}>
            <label htmlFor="enter-task" className="label">
              Task
            </label>
            <input
              type="text"
              id="enter-task"
              placeholder="Enter the task here"
              className="input"
              value={inputValue}
              onChange={this.onChangeInput}
            />
            <label htmlFor="tags" className="label">
              Tags
            </label>

            <select value={taskButton} onChange={this.onChangeButton} id="tags">
              {tagsList.map(eachOption => (
                <option
                  className="tags-dropdown"
                  key={eachOption.id}
                  value={eachOption.value}
                >
                  {eachOption.displayText}
                </option>
              ))}
            </select>
            <button
              onClick={this.onClickAddTask}
              type="submit"
              className="add-button"
            >
              Add Task
            </button>
          </form>
        </div>
        <div className="tag-List-container">
          <h1 className="heading-tag">Tags</h1>
          <div>
            <ul className="tags-lists">
              {tagsList.map(eachItem => (
                <li className="tag-name-button">
                  <button onClick={this.onClickFilter} type="button">
                    {eachItem.displayText}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="added-tasks-container">
            <h1 className="heading-tag">Tasks</h1>
            <div>
              {addedTasks.length === 0
                ? this.renderAddTask()
                : this.renderTasks()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MyTasks
