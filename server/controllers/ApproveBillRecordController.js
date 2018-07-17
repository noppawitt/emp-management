const ApproveBillRecordControl = require('../models/ApproveBillRecord');
exports.findAll = (req, res, next) => {
  const userid = req.user.id;
  console.log(userid);
  ApproveBillRecordControl.findAll(userid)
  .then( approveidset => {
    // res.json([dataapprove])
    ApproveBillRecordControl.findDetail(approveidset)
    .then( dataapprove => {
      var i = 0;
      approveidset.forEach( q => {
        approveidset[i].data = dataapprove[i];
        i++;
      });
      res.json(approveidset);
    })
    .catch( err => {
      console.log(err);
    });
  })
  .catch( err =>{
    console.log(err);
  });
   
};

exports.updateStatus = (req,res,next) => {
  const userid = req.user.id;
  const data = req.body.approvement;
  const rec_id = req.body.id;
  const comment = req.body.comment;
  console.log(req.body);
  ApproveBillRecordControl.updateApproveData(data, rec_id, userid)
  .then(output => {
    console.log(output);
    ApproveBillRecordControl.updateBillApprovement(data,rec_id,userid)
    .then( output_billapprove =>{
      ApproveBillRecordControl.findApproveDataRecord(output.approveRecordId,output.createdUser)
      .then( record => {
        var status_number ;
        var first_approver = parseInt(record[0].approveStatus);
        var second_approver = parseInt(record[1].approveStatus);
        if (first_approver === 0 && second_approver === 0) {
          status_number = 0;
        } else if ((first_approver === 0 && second_approver === 1)||(first_approver === 1 && second_approver === 0)) {
          status_number = 1;
        } else if ((first_approver === 0 && second_approver === 2) || (first_approver === 2 && second_approver === 0)) {
          status_number = 2;
        } else if ((first_approver === 1 && second_approver === 2) || (first_approver === 2 && second_approver === 1)) {
          status_number = 2;
        } else if (first_approver === 1 && second_approver === 1) {
          status_number = 3;
        } else if (first_approver === 2 && second_approver === 2) {
          status_number = 2;
        } else {
          approveStatus_number = 999;
        }
        console.log(status_number);
        console.log(record[0].approveRecordId);
        ApproveBillRecordControl.updateBillRecordByStatus(status_number, record[0].approveRecordId, userid, comment)
        .then(op=>{
          res.json(op);
        })
        .catch(err=>{
          console.log(err);
        })
      })
      .catch(next);
    })
    .catch(next);
  })
  .catch(next);
}
