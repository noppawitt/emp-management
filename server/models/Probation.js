const db = require('../db/');

const Probation = {};

Probation.findById = (id) => (
    db.manyOrNone("SELECT CONCAT(i.first_name, ' ', i.last_name) as full_name, d.name as department, i.user_id, po.name as position, CONCAT(w.level_id, '. ', l.name) as level"
    + ", w.start_date, w.probation_date, bo.boss_name as supervisor" +
    " FROM public.employee_work w, public.employee_info i, public.departments d, public.positions po, public.levels l, " +
    "(SELECT i.user_id ,CONCAT(i.first_name, ' ', i.last_name) as boss_name FROM public.employee_info i, public.employee_work w WHERE i.user_id = w.boss_id) bo " +
    "WHERE i.user_id = $1 AND w.position_id = po.id AND w.department_id = d.id AND bo.user_id = w.boss_id AND w.level_id = l.id " +
    "ORDER BY i.user_id ASC", [id])
)

module.exports = Probation;