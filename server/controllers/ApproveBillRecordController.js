const ApproveBillRecordControl = require('../models/ApproveBillRecord');

const findDetail = (approveidset, res) => {
  ApproveBillRecordControl.findDetail(approveidset)
    .then((dataapprove) => {
      let i = 0;
      approveidset.forEach((q) => {
        approveidset[i].data = dataapprove[i];
        i += 1;
      });
      res.json(approveidset);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.findAll = (req, res, next) => {
  const userid = req.user.id;
  // console.log(userid);
  if (req.user.id === 10001) {
    ApproveBillRecordControl.findAll(userid)
      .then(approveidset => findDetail(approveidset, res))
      .catch((err) => {
        console.log(err);
      });
  }
  else {
    ApproveBillRecordControl.findUserBill(userid)
      .then(approveidset => findDetail(approveidset, res))
      .catch((err) => {
        console.log(err);
      });
  }
};

const findApproveDataRecord = (res, next, output, userid, data, recId, comment) => {
  ApproveBillRecordControl.findApproveDataRecord(output.approveRecordId, output.createdUser)
    .then((record) => {
      console.log(record);

      let statusNumber;
      const firstApprover = parseInt(record[0].approveStatus, 10);
      const secondApprover = parseInt(record[1].approveStatus, 10);
      console.log(firstApprover);
      console.log(secondApprover);

      if (firstApprover === 0 && secondApprover === 0) {
        statusNumber = 0;
      }
      else if ((firstApprover === 0 && secondApprover === 1) || (firstApprover === 1 && secondApprover === 0)) {
        statusNumber = 1;
      }
      else if ((firstApprover === 0 && secondApprover === 2) || (firstApprover === 2 && secondApprover === 0)) {
        statusNumber = 2;
      }
      else if ((firstApprover === 1 && secondApprover === 2) || (firstApprover === 2 && secondApprover === 1)) {
        statusNumber = 2;
      }
      else if (firstApprover === 1 && secondApprover === 1) {
        statusNumber = 3;
      }
      else if (firstApprover === 2 && secondApprover === 2) {
        statusNumber = 2;
      }
      else {
        const approveStatusNumber = 999;
      }
      // 0 = pending; 1 = 1st complete; 2 = reject; 3 = complete
      console.log(statusNumber);
      console.log(record[0].approveRecordId);
      ApproveBillRecordControl.updateBillRecordByStatus(statusNumber, record[0].approveRecordId, userid, comment)
        .then((op) => {
          // console.log(userid);
          ApproveBillRecordControl.findAll(userid)
            .then((approveidset) => {
              // res.json([dataapprove])
              ApproveBillRecordControl.findDetail(approveidset)
                .then((dataapprove) => {
                  let i = 0;
                  approveidset.forEach((q) => {
                    approveidset[i].data = dataapprove[i];
                    i += 1;
                  });
                  res.json(approveidset);
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((next));
};

exports.updateStatus = (req, res, next) => {
  const userid = req.user.id;
  const data = req.body.approvement;
  const recId = req.body.id;
  const { comment } = req.body;
  const { type } = req.body;
  console.log(req.body);

  ApproveBillRecordControl.updateApproveData(data, recId, userid)
    .then((output) => {
      console.log(output);
      if (type === 1) {
        console.log('MD');
        ApproveBillRecordControl.updateBillApprovementMD(data, recId, userid)
          .then(() => findApproveDataRecord(res, next, output, userid, data, recId, comment))
          .catch(next);
      }
      else if (type === 0) {
        console.log('BOSS');

        ApproveBillRecordControl.updateBillApprovementBoss(data, recId, userid)
          .then(() => findApproveDataRecord(res, next, output, userid, data, recId, comment))
          .catch(next);
      }
    })
    .catch(next);
};
