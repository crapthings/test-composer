Test.remove({})

const test = () => _.times(1000, n => ({
  title: faker.lorem.sentences(),
  type: _.sample(['a', 'b', 'c'])
}))

Test.batchInsert(test())

Meteor.publish('test1', function () {
  return Test.find({ type: 'a' })
})

Meteor.publish('test2', function () {
  return Test.find({ type: 'b' })
})

Meteor.publish('test3', function () {
  return Test.find({ type: 'c' })
})

Meteor.methods({
  test1() {
    return Test.find().fetch()
  },

  addTest() {
    Test.batchInsert(test())
    return 'done'
  }
})
