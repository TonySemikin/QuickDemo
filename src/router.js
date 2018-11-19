const path = require('path');
const cors = require('cors');
const { jobs } = require('../mockData/mockData');

function fetchData(level) {
  let randIndex = Math.floor(Math.random() * jobs[level].length);
  return jobs[level][randIndex];
}

module.exports = function (app) {
  app.get('/dashboard/getsomejob/:id', cors(), function (req, res) {
    let response = fetchData(req.params.id);
    res.send(response);
  });
};
