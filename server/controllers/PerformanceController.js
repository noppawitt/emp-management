const Performance = require('../models/Performance');

exports.find = (req,res,next) => {
  console.log('fetch perf')
  Performance.findById(req.query.id)
    .then((performance) => {
        res.json(performance);
    })
    .catch(next);
};

exports.create = (req,res,next) => {
  console.log('create perf')
  const newPerformanceInfo = req.body.performanceInfo;
  Performance.insertPerformance(newPerformanceInfo)
    .then(() => {
        Performance.findById(req.body.performanceInfo.employeeID)
          .then((performance)=>{
            res.json(performance)
          });
    })
    .catch(next);
};

exports.update = (req,res,next) => {
  console.log('update performance');
    const newPerformanceInfo = req.body.performanceInfo;
    Performance.updatePerformance(newPerformanceInfo)
      .then(() => {
        console.log("Test Probation");
        Performance.findById(req.body.performanceInfo.employeeID)
          .then((performance)=>{
            res.json(performance)
          });
      })
      .catch(next);
};
