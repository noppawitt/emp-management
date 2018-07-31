const AccessControl = require('../models/AccessControl');
const AssetType = require('../models/AssetType');
const Asset = require('../models/Asset');
const Certificate = require('../models/Certificate');
const Contract = require('../models/Contract');
const Degree = require('../models/Degree');
const Department = require('../models/Department');
const Faculty = require('../models/Faculty');
const Level = require('../models/Level');
const Major = require('../models/Major');
const Position = require('../models/Position');
const University = require('../models/University');

exports.fetchMastertable = async (req, res, next) => {
  const masterTable = {};
  masterTable.accessTypes = await AccessControl.findAll();
  masterTable.assetTypes = await AssetType.findAll();
  masterTable.assets = await Asset.findAll();
  masterTable.certificates = await Certificate.findAll();
  masterTable.contracts = await Contract.findAll();
  masterTable.degrees = await Degree.findAll();
  masterTable.departments = await Department.findAll();
  masterTable.faculties = await Faculty.findAll();
  masterTable.levels = await Level.findAll();
  masterTable.majors = await Major.findAll();
  masterTable.positions = await Position.findAll();
  masterTable.universities = await University.findAll();
  res.json(masterTable);
};
