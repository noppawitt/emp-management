const Contract = require('../models/Contract');

exports.create = (req, res, next) => {
  const newContract = req.body.contract;
  Contract.create(newContract, req.user.id)
    .then((result) => {
      Contract.findById(result.id)
        .then((contract) => {
          res.json(contract);
        })
        .catch(next);
    })
    .catch(next);
};

exports.update = (req, res, next) => {
  const editContract = req.body.contract;
  Contract.update(editContract, req.user.id)
    .then((updatedContract) => {
      req.json(updatedContract);
    })
    .catch(next);
};

exports.findAll = (req, res, next) => {
  Contract.findAll()
    .then((contracts) => {
      res.json(contracts);
    })
    .catch(next);
};
