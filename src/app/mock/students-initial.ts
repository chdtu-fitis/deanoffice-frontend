const studentMock = {
  id: 1514,
  student: {
    id: 861,
    name: 'Юрій',
    surname: 'Абдулаєв',
    patronimic: 'Юрійович',
    telephone: null,
    birthDate: new Date().toLocaleDateString(),
  },
  studentGroup: {
    id: 473,
    name: 'МПЗ-1704',
  },
  payment: 'BUDGET',
};

export default new Array(20)
  .fill(studentMock)
  .map((elem, id) => ({ ...elem, id, 'student.surname': elem.surname + id }))

