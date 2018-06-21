import React from 'react'
import { render } from 'react-dom'
import { composeAll, composeWithTracker } from '@lvfang/mantra-core'

const tracker1 = (props, onData) => {
  console.log('tracker1')

  if (Meteor.subscribe('test1').ready()) {
    const test1 = Test.find().fetch()
    onData(null, { test1 })
  } else {
    onData(null, {})
  }
}

const tracker2 = (props, onData) => {
  console.log('tracker2')

  if (Meteor.subscribe('test2').ready()) {
    const test2 = Test.find().fetch()
    onData(null, { test2 })
  }

  onData(null, {})
}

const tracker3 = (props, onData) => {
  console.log('tracker3')

  if (Meteor.subscribe('test3').ready()) {
    const test3 = Test.find().fetch()
    onData(null, { test3 })
  } else {
    onData(null, {})
  }
}

const component = props => <button onClick={() => Meteor.call('addTest')}>insert test</button>

const Comp = composeAll(
  composeWithTracker(tracker1),
  composeWithTracker(tracker2),
  composeWithTracker(tracker3),
)(component)

Meteor.startup(function() {
  const div = document.createElement('div')
  document.body.appendChild(div)
  render(<Comp />, div)
})
