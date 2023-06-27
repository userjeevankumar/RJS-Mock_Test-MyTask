import {Component} from 'react'
import {v4} from 'uuid'

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
    filteredTask: [],
    selectedFilteredText: '',
  }

  componentDidMount = () => {
    this.renderTasks()
  }

  onChangeInput = event => {
    this.setState({inputValue: event.target.value})
  }

  onChangeButton = event => {
    this.setState({taskButton: event.target.value})
  }

  onChangeSelect = event => {
    const {selectedFilteredText} = this.state
    this.setState({selectedFilteredText: event.target.value})
    console.log(selectedFilteredText)
  }

  onClickFilter = () => {
    const {addedTasks, selectedFilteredText} = this.state
    if (addedTasks.length > 0) {
      console.log(addedTasks[0].taskType)
      console.log(addedTasks[0].item)
      const newTask = addedTasks.filter(
        eachSelect => selectedFilteredText === eachSelect.taskType,
      )
      this.setState({
        filteredTask: newTask,
        isFilterActive: true,
      })
    }
    const {filteredTask} = this.state

    console.log(filteredTask)
    console.log(selectedFilteredText)
  }

  /*
  renderFilteredTags = () => {
    const {selectedFilteredText, filteredText} = this.state

    const {addedTasks} = this.state
    const userChoiceObjectList = addedTasks.filter(
      choice => choice.taskType === selectedFilteredText,
    )
    this.setState({filteredText: userChoiceObjectList})

    if (filteredText.length === 0) {
      return (
        <ul className="tags-list">
          {filteredText.map(eachItem => (
            <li className="task-display" key={eachItem.id}>
              <p className="tag-item">{eachItem.item}</p>
              <p className="tag-name">{eachItem.taskType}</p>
            </li>
          ))}
        </ul>
      )
    }
    return (
      <div>
        {
          (addedTasks.length !== 0 ? this.renderAddTask() : this.renderTasks(),
          this.setState({filteredText: ''}))
        }
      </div>
    )
  }
*/
  /*
   const renderCategoriesList = () => {
      const {selectedFilteredText} = this.state
      return tagsList.map(category => {
      const onClickCategoryItem = () => changeCategory(
          this.setState({selectedFilteredText:category.categoryId})
          )
      const isActive = category.categoryId === selectedFilteredText
      const isFilterActive = isActive
        ? true
        : false

      return (
        <li
          className="category-item"
          key={category.categoryId}
          onClick={onClickCategoryItem}
        >
          {category.name}
        </li>
      )
    })
  }
  
renderTagsListCategories=()=>{
       <>
     <h1 className="heading-tag">Tags</h1>
      <ul className="categories-list">{renderCategoriesList()}</ul>
    </>
} */

  onClickAddTask = event => {
    event.preventDefault()
    const {inputValue, taskButton} = this.state
    const addNewItem = {
      id: v4(),
      item: inputValue,
      taskType: taskButton,
    }

    this.setState(prevState => ({
      addedTasks: [...prevState.addedTasks, addNewItem],
      inputValue: '',
      taskButton: tagsList[0].displayText,
      isFilterActive: false,
      selectedFilteredText: '',
      /* filteredText: [], */
    }))
  }

  /*
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
  } */

  /* renderAllTasks = () => {
    const {addedTasks, selectedFilteredText} = this.state
    if (selectedFilteredText !== '') {
      const newTask = addedTasks.filter(
        eachTask => eachTask.taskType === selectedFilteredText,
      )

      return this.setState({addedTasks: newTask})
    }
    return addedTasks
  } */

  renderTasks = () => {
    const {filteredTask, isFilterActive, addedTasks} = this.state
    if (isFilterActive) {
      return (
        <ul className="tags-list">
          {filteredTask.map(eachItem => (
            <li className="task-display" key={eachItem.optionId}>
              <p className="tag-item">{eachItem.item}</p>
              <p className="tag-name">{eachItem.taskType}</p>
            </li>
          ))}
        </ul>
      )
    }

    return (
      <ul className="tags-list">
        {addedTasks.map(eachItem => (
          <li className="task-display" key={eachItem.optionId}>
            <p className="tag-item">{eachItem.item}</p>
            <p className="tag-name">{eachItem.taskType}</p>
          </li>
        ))}
      </ul>
    )
  }

  renderAddTask = () => (
    <div>
      <p className="no-task-head">No Tasks Added Yet</p>
    </div>
  )

  render() {
    const {
      addedTasks,
      selectedFilteredText,
      taskButton,
      inputValue,
    } = this.state
    console.log(addedTasks.length)

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
                  key={eachOption.optionId}
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
                  <button
                    key={eachItem.optionId}
                    value={selectedFilteredText}
                    onChange={this.onChangeSelect}
                    onClick={this.onClickFilter}
                    type="button"
                  >
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
