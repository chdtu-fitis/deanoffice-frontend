const studentMock = {
  id: 12,
  payment: 'BUDGET',
  student: {
    id: 123,
    name: 'Test',
    nameEng: 'Test eng',
    surname: 'Surname',
    surnameEng: 'Surname eng',
    patronimic: 'Patronimic',
    patronimicEng: 'Patronimic eng',
    sex: 'male',
    birthDate: new Date().toLocaleDateString(),
    registrationAddress: 'Address1',
    actualAddress: 'Address2',
    telephone: null,
  },
  recordBookNumber: '123qweqwe',
  studentGroup: {
    name: 'KT-141',
    id: 1234
  },
};

export default new Array(20)
  .fill(studentMock)
  .map((elem, id) => ({ ...elem, id }))
