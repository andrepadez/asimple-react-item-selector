import React from 'react'
import { render } from 'react-dom'
import ItemSelector from '../../lib'
import data from './mock-data.json'
import './styles.css'

const Example = () => (
  <div className="item-selector-example">
    <h1>Related DataTables I</h1>
    <div className="item-selector">
      <ItemSelector columns={['title', 'year']} index="imdbID" items={data.shows} onSubmit={onSubmit} />
    </div>
  </div>
)

const onSubmit = function() {
  console.log('submitted', this.state.items)
}

render(<Example />, document.getElementById('app'))
