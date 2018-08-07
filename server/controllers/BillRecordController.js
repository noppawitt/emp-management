const BillRecordControl = require('../models/BillRecordControl');

exports.findByUserId = (req, res, next) => {
  const bodyId = req.body.dataId;
  BillRecordControl.findByUserId(bodyId)
    .then((billrecordsbyuserId) => {
      res.json(billrecordsbyuserId);
    })
    .catch(next);
};

exports.findByDetailId = (req, res, next) => {
  const bodyId = req.body.dataid;
  // console.log(req.body.dataid);
  BillRecordControl.findBilldataById(bodyId)
    .then((billrecordsbyuserId) => {
      BillRecordControl.getImage(bodyId)
        .then((image) => {
          res.json([billrecordsbyuserId, image]);
        });
    })
    .catch(next);
};

exports.createErpDetail = (req, res, next) => {
  const userId = req.user.id;
  const dataId = req.body.user[0].idbill;
  const databody = req.body.user[2].fieldlist;
  const delbill = BillRecordControl.deleteErpDetail(dataId);
  const readdbill = BillRecordControl.createErpDetail(dataId, databody, userId);
  Promise.all([readdbill])
    .then((data) => {
      // console.log(data);
      res.json(data);
    });
};

exports.create = (req, res, next) => {
  // console.log(req.body);
  const recordbody = req.body.billrecord[0].data;
  const databody = req.body.billrecord[1].fieldlist;
  // console.log(req.body.billrecord[1].fieldlist);
  BillRecordControl.createBillRecord(recordbody, req.user.id)
    .then((billrecordcreate) => {
      const record = billrecordcreate.id;
      // console.log(record);
      BillRecordControl.createBillData2(record, databody, req.user.id)
        .then((billdata) => {
          BillRecordControl.createApproveBill(record, req.user.id)
            .then((approvebill) => {
              const approvebillRecId = approvebill.id;
              // console.log(approvebillRecId);
              BillRecordControl.findApprover(req.user.id)
                .then((approverarray) => {
                  approverarray.push({ bossId: 10001 });
                  // console.log(approverarray);
                  BillRecordControl.createApproveData(approvebillRecId, approverarray, req.user.id)
                    .then((outputbill) => {
                      res.json(record);
                    }).catch(next);
                }).catch(next);
            }).catch(next);
        }).catch(next);
      // const billapprove = BillRecordControl.createApproveBill(record, req.user.id);
      // .then(approvebillRecId => {
      // })
      // .catch(next);
    })
    .catch(next);
};

exports.deleteByBillId = (req, res, next) => {
  const recordId = req.body.id;
  // console.log(recordId);
  BillRecordControl.findApprovementId(recordId)
    .then((appId) => {
      BillRecordControl.deleteByBillId(recordId, appId.id)
        .then((data) => {
          console.log(data);
          res.json(data);
        })
        .catch(next);
    })
    .catch(next);
};

exports.findAll = (req, res, next) => {
  const userId = req.user.id;
  BillRecordControl.findApprovement()
    .then((fetchApprove) => {
      BillRecordControl.findUser(userId)
        .then((fetchuser) => {
          BillRecordControl.findAll(userId)
            .then((fetchall) => {
              const fetching = [];
              fetching.push({ fetchuser });
              fetching.push({ fetchall });
              fetching.push({ fecthapprove: fetchApprove });
              BillRecordControl.findBilldata()
                .then((fetchoutput) => {
                  let i = 0;
                  fetching[1].fetchall.forEach((element) => {
                    fetching[1].fetchall[i].data = [];
                    fetchoutput.forEach((element2) => {
                      if (element.id === element2.billRecordId) {
                        fetching[1].fetchall[i].data.push({ element2 });
                      }
                    });
                    i += 1;
                  });
                  // fetching.push(fetchoutput);
                  res.json(fetching);
                }).catch(next);
            })
            .catch(next);
        })
        .catch(next);
    })
    .catch(next);
};

exports.findAllRecordErp = (req, res, next) => {
  const userId = req.user.id;
  BillRecordControl.findUser(userId)
    .then((dataUser) => {
      BillRecordControl.findAll(userId)
        .then((dataErpRecord) => {
          const fetching = [];
          fetching.push({ fetchuser: dataUser });
          fetching.push({ fetchall: dataErpRecord });
          BillRecordControl.findBillDataById(dataErpRecord)
            .then((dataErpdetailRecord) => {
              for (let i = 0; i < fetching[1].fetchall.length; i += 1) {
                fetching[1].fetchall[i].data = [];
                fetching[1].fetchall[i].data.push(dataErpdetailRecord[i][0]);
                // console.log(dataErpdetailRecord[i][0])
              }
              BillRecordControl.findChildOfApprover(userId)
                .then((countChild) => {
                  // console.log(countChild);
                  let countBool = true;
                  if (countChild.count > 0) {
                    countBool = true;
                  }
                  else {
                    countBool = false;
                  }
                  fetching.push({ approveBoolean: countBool });
                  res.json(fetching);
                });
            });
        })
        .catch(next);
    })
    .catch(next);
};
