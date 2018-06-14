const db = require('../db/');

const Probation = {};

Probation.findById = (id) => (
    db.manyOrNone('SELECT first_name, department_id, i.user_id, position_id, level_id, start_date, probation_date '
    + 'FROM public.employee_work w, public.employee_info i WHERE i.user_id = $1' +
    ' ORDER BY i.user_id ASC', [id])
)

module.exports = Probation;