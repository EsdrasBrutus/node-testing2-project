
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('students')
    .truncate()
    .then(function () {
      return knex('students').insert([
        {id: 1, name: 'student_1', grade:10},
        {id: 2, name: 'student_2', grade:11},
        {id: 3, name: 'student_3', grade:12}
      ]);
    });
};
