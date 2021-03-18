var SortableTable = require('@riversun/sortable-table');
var Datastore = require('nedb');
let db = new Datastore({ filename: 'data.db' });

db.loadDatabase(function (error) {
  if (error != null) {
    console.log('FATAL: local database could not be loaded. Caused by: ' + error);
    throw error;
  }
  console.log('INFO: local database loaded successfully.');
  reloadList();
});

function createData() {
  const title = document.getElementById('add-form_title').value;
  const deadline = new Date(document.getElementById('add-form_deadline').value);
  const priority = 4 - document.getElementById('add-form_priority').value;
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
  reloadList();
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
    const tasks = [];
    const parent_div = document.querySelector('.sortable-table');
    if (!(parent_div.hasChildNodes())) {
      const tasklist_table = document.createElement('table');
      const tasklist_header = document.createElement('thead');
      const tasklist_header_tr = document.createElement('tr');

      const tasklist_header_title = document.createElement('th');
      const title_content = document.createTextNode('Title');
      tasklist_header_title.appendChild(title_content);
      tasklist_header_title.setAttribute('data-id', 'title');

      const tasklist_header_deadline = document.createElement('th');
      const deadline_content = document.createTextNode('Deadline');
      tasklist_header_deadline.appendChild(deadline_content);
      tasklist_header_deadline.setAttribute('data-id', 'deadline');
      tasklist_header_deadline.setAttribute('sortable', '');

      const tasklist_header_priority = document.createElement('th');
      const priority_content = document.createTextNode('Priority');
      tasklist_header_priority.appendChild(priority_content);
      tasklist_header_priority.setAttribute('data-id', 'priority');
      tasklist_header_priority.setAttribute('sortable', '');

      const tasklist_header_timescale = document.createElement('th');
      const timescale_content = document.createTextNode('Timescale');
      tasklist_header_timescale.appendChild(timescale_content);
      tasklist_header_timescale.setAttribute('data-id', 'timescale');
      tasklist_header_timescale.setAttribute('sortable', '');

      tasklist_header_tr.append(
        // tasklist_header_id,
        tasklist_header_title, tasklist_header_deadline,
        tasklist_header_priority, tasklist_header_timescale
      );
      tasklist_header.appendChild(tasklist_header_tr);

      tasklist_table.appendChild(tasklist_header);
      tasklist_table.setAttribute('id', 'tasklist');
      parent_div.appendChild(tasklist_table);
    }
    var id = 0;
    for (const task of docs) {
      task.id = id;
      task.deadline = 
        `${task.deadline.getFullYear()}/` +
        `${(task.deadline.getMonth()+1 < 10) ? "0" + (task.deadline.getMonth() + 1) : (task.deadline.getMonth() + 1)}/` +
        `${(task.deadline.getDate() < 10) ? "0" + task.deadline.getDate() : task.deadline.getDate()} ` +
        `${(task.deadline.getHours() < 10) ? "0" + task.deadline.getHours() : task.deadline.getHours()}:` +
        `${(task.deadline.getMinutes() < 10) ? "0" + task.deadline.getMinutes() : task.deadline.getMinutes()}`;
      tasks.push(task);
      id = id + 1;
    }

    const sortableTable = new SortableTable();
    sortableTable.setTable(document.querySelector('#tasklist'));
    sortableTable.setData(tasks);
    sortableTable.events()
      .on('sort', (event) => {
        console.log(`[SortableTable#onSort]
      event.colId=${event.colId}
      event.sortDir=${event.sortDir}
      event.data=\n${JSON.stringify(event.data)}`);
      });
  });
}

function GetDatas() {
  db.find({}, (error, docs) => {
    console.log(docs);
  });
}

