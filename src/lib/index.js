import React, { Component } from 'react'
import { string, arrayOf, shape, func } from 'prop-types'
import DataTable from 'asimple-react-data-table'

class ItemSelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: {
        selected: [],
        deselected: [...props.items]
      }
    }

    this.handleSelectionChange = this.handleSelectionChange.bind(this)
    this.onSubmit = props.onSubmit.bind(this)
  }

  handleSelectionChange(ev) {
    const action = ev.target.dataset.action
    const newState = { items: { selected: [], deselected: [] } }
    let origin, target

    switch (action) {
      case 'add':
        origin = 'deselected'
        target = 'selected'
        break
      case 'remove':
        origin = 'selected'
        target = 'deselected'
        break
    }

    newState.items[target] = [...this.state.items[target], ...this.state.items[origin].filter(item => item.$checked$)]
    newState.items[origin] = [...this.state.items[origin].filter(item => !item.$checked$)]
    newState.items[target].forEach(item => (item.$checked$ = null))
    newState.items[origin].forEach(item => (item.$checked$ = null))

    this.setState(newState)
  }

  render() {
    return (
      <div className="related-data-tables">
        <div className="data-table">
          <button data-action="add" onClick={this.handleSelectionChange}>
            Add
          </button>
          <DataTable
            id="deselected"
            columns={this.props.columns}
            items={this.state.items.deselected}
            index={this.props.index}
            checkboxes
          />
        </div>
        <div className="data-table">
          <button data-action="remove" onClick={this.handleSelectionChange}>
            Remove
          </button>
          <DataTable
            id="selected"
            columns={this.props.columns}
            items={this.state.items.selected}
            index={this.props.index}
            checkboxes
          />
        </div>
        <div className="submit">
          <button onClick={this.onSubmit}>Submit</button>
        </div>
      </div>
    )
  }
}

ItemSelector.defaultProps = {
  columns: [],
  items: [],
  onSubmit: function noop() {}
}
ItemSelector.propTypes = {
  index: string.isRequired,
  columns: arrayOf(string),
  items: arrayOf(shape),
  onSubmit: func
}

export default ItemSelector
