var Datastore = require('nedb');
let db = new Datastore({ filename: 'data.db' });

db.loadDatabase(function (error) {
  if (error != null) {
    console.log('FATAL: local database could not be loaded. Caused by: ' + error);
    throw error;
  }
  console.log('INFO: local database loaded successfully.');
});

function createData() {
  const title = document.getElementById('add-form_title').value;
  const deadline = new Date(document.getElementById('add-form_deadline').value);
  const priority = document.getElementById('add-form_priority').value;
  const timescale = document.getElementById('add-form_timescale').value;
  const doc = {
    title: title,
    deadline: deadline,
    priority: priority,
    timescale: timescale,
  };

  db.insert(doc, function (error, newDoc) {
    if (error != null) {
      console.log('ERROR: saving document: ' + JSON.stringify(doc) + '. Caused by: ' + error);
      throw error;
    }
    console.log('INFO: successfully saved document: ' + JSON.stringify(newDoc));
  });
}

function readData(id) {
  db.findOne({ _id: id }, (error, docs) => {

  });
}

function updateData(id, doc) {
  const query = { _id: id };
  const update = {
    $set: doc
  }
  db.update(query, update, {}, function (error, numReplaced) {
    if (error != null) {
      console.log('ERROR: updating document: ' + JSON.stringify(doc) + '. Caused by: ' + error);
      throw error;
    }
    console.log('INFO: successfully updated document: ' + JSON.stringify(doc));
  })
}

function deleteData(id) {
  const query = { _id: id };
  db.remove(query, {}, function (error, numDeleted) {
    if (error != null) {
      console.log('error: deleting document. ID of the document: ' + id);
      throw error;
    }
    console.log('INFO: successfully deleted document. ID of the document: ' + id);
  })
}

function reloadList() {
  db.find({}, (error, docs) => {
    for (const task of docs) {
      console.log(task);
      console.log('title: ' + task.title);
      console.log('deadline: ' + task.deadline);
      
    }
  });
}

function GetDatas() {
  db.find({}, (error, docs) => {
    console.log(docs);
  });
}

