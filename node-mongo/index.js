const MongoClient = require('mongodb').MongoClient, // 连接mongodb的工具
  assert = require('assert'),
  url = 'mongodb://localhost:27017/',
  dbname = 'conFusion',
  dboper = require('./operations')

MongoClient.connect(url, (err, client) => {
  assert.equal(err, null)
  console.log('connect correctly to server')
  const db = client.db(dbname)
  const collection = db.collection('dishes')
  // collection.insertOne({name: 'top', description: 'value'}, (err, result) => {
  //   assert.equal(err, null)
  //   console.log('after insert:\n')
  //   console.log(result.ops)
  //   collection.find({}).toArray((err, docs) => {
  //     assert.equal(err, null)
  //     console.log(`found:\n`)
  //     console.log(docs)
  //     db.dropCollection('dishes', (err, result) => {
  //       assert.equal(err, null)
  //       client.close()
  //     })
  //   })
  // })
  dboper.insertDocument(db, {name: 'gg', description: 'test'}, 'dishes', (result) => {
    console.log(`insert document: \n ${result.ops}`)
    dboper.findDocument(db, 'dishes', (docs) => {
      console.log(`found document: \n ${docs}`)
      dboper.updateDocument(db, {name: 'gg'}, {description: 'new test'}, 'dishes', r => {
        console.log(`update document: \n ${r.result}`)
        dboper.findDocument(db, 'dishes', docs => {
          console.log(`found update document: \n ${docs}`)
          db.dropCollection('dishes', r => {
            console.log(`dropped collection: ${r}`)
            client.close()
          })
        })
      })
    })
  })
})
