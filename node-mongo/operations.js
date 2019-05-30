const assert = require('assert')
exports.insertDocument = (db, document, collection, callback) => {
  const coll = db.collection(collection)
  coll.insert(document, (err, result) => {
    assert.equal(err, null)
    console.log(`inserted ${result.result} document into the collection ${collection}`)
    callback(result)
  })
}

exports.findDocument = (db, collection, callback) => {
  const coll = db.collection(collection)
  coll.find({}).toArray((err, docs) => {
    assert.equal(err, null)
    callback(docs)
  })
}

exports.removeDocument = (db, document, collection, callback) => {
  const c = db.collection(collection)
  c.deleteOne(document, (err, r) => {
    assert.equal(err, null)
    console.log(`remove the document ${document}`)
    callback(r)
  })
}

exports.updateDocument = (db, document, update, collection, callback) => {
  const c = db.collection(collection)
  c.updateOne(document, {$set: update}, null, (err, r) => {
    assert.equal(err, null)
    console.log(`update the document with ${update}`)
  })
}