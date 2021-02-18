// // import Datastore from 'nedb'
// var Datastore = require('nedb')
// import path from 'path'
// import { remote } from 'electron'

// export default new Datastore({
//   autoload: true,
//   filename: path.join(remote.app.getPath('userData'), '/data.db')
// })

// function InsertTest () {
//   console.log("test");
//   db.insert([{ a: 5 }, { a: 42 }], function (err, newDocs) {
//     // Two documents were inserted in the database
//     // newDocs is an array with these documents, augmented with their _id
//   });
// }

var Datastore = require('nedb');
let db = new Datastore({ filename: 'data.db' });

db.loadDatabase(function (error) {
  if (error) {
    console.log('FATAL: local database could not be loaded. Caused by: ' + error);
    throw error;
  }
  console.log('INFO: local database loaded successfully.');
});

function GetDatas() {
  db.find({ media: "Blu-ray" }, (error, docs) => {
    console.log(docs);
  });
}

var doc = [
  {
    _id: 'id1',
    name: "Play Station 4",
    developer: { name: "Sony", country: "JP" },
    releaseDate: new Date(2014, 2, 22),
    price: 39980,
    media: "Blu-ray",
    portable: false,
    connectivity: ["HDMI", "USB", "Ethernet", "Wi-Fi", "Bluetooth"],
    peripheral: ["Play Station VR"],
  },
  {
    _id: 'id2',
    name: "Play Station Vita",
    developer: { name: "Sony", country: "JP" },
    releaseDate: new Date(2011, 12, 17),
    price: 24980,
    media: "Card",
    portable: true,
    connectivity: ["Wi-Fi", "Bluetooth", "3G"],
  },
  {
    _id: 'id3',
    name: "Nintendo 3DS",
    developer: { name: "Nintendo", country: "JP" },
    releaseDate: new Date(2011, 2, 26),
    price: 25000,
    media: "Card",
    portable: true,
    connectivity: ["Wi-Fi"],
  },
  {
    _id: 'id4',
    name: "Nintendo Switch",
    developer: { name: "Nintendo", country: "JP" },
    releaseDate: new Date(2017, 3, 3),
    price: 29980,
    media: "Card",
    portable: true,
    connectivity: ["HDMI", "USB", "Wi-Fi", "Bluetooth"],
  },
  {
    _id: 'id5',
    name: "Xbox One",
    developer: { name: "Microsoft", country: "US" },
    releaseDate: new Date(2013, 11, 22),
    price: 39980,
    media: "Blu-ray",
    portable: false,
    connectivity: ["HDMI", "USB", "Ethernet", "Wi-Fi"],
    peripheral: ["Kinect"],
  },
];

function Insert(doc) {
  db.insert(doc, function (error, newDoc) {
    if (error) {
      console.log('ERROR: saving document: ' + JSON.stringify(doc) + '. Caused by: ' + error);
      throw error;
    }
    console.log('INFO: successfully saved document: ' + JSON.stringify(newDoc));
  });
}

