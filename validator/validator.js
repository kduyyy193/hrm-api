const {check} = require('express-validator');

let validateUser = () => {
  return [ 
    check('name', 'name does not empty').not().isEmpty(),
    check('sex', 'sex does not empty').not().isEmpty(),
    check('address', 'address does not empty').not().isEmpty(),
    check('date', 'date does not empty').not().isEmpty().isISO8601('yyyy-mm-dd'),
    check('dateJoined', 'dateJoined does not empty').not().isEmpty().isISO8601('yyyy-mm-dd'),
    check('group', 'group does not empty').not().isEmpty(),
    check('hobby', 'hobby does not empty').not().isEmpty(),
    check('description', 'description does not empty').not().isEmpty(),
    check('salary', 'salary does not empty').not().isEmpty(),
  ]; 
}

// let validateLogin = () => {
//   return [ 
//     check('user.email', 'Invalid does not Empty').not().isEmpty(),
//     check('user.email', 'Invalid email').isEmail(),
//     check('user.password', 'password more than 6 degits').isLength({ min: 6 })
//   ]; 
// }


module.exports = {validateUser};
