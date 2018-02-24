const studentMock = {
  id: 1,
  active: true,
  surname: 'Іванов',
  name: 'Іван',
  patronimic: 'Іванович',
  surnameEng: 'Ivanov',
  nameEng: 'Ivan',
  patronimicEng: 'Ivanovych',
  studentGroup: 'КТ-141',
  birthDate: new Date(),
  registrationAdress: 'test test',
  actualAdress: 'test test',
  school: 'test test',
  recordGroupNumber: '123qwe',
  studentCardNumber: '123123',
  telephone: '123123123',
  email: 'qwwe@qwe.qwe',
  fatherName: 'Qwe',
  fatherPhone: 'Qwe',
  fatherInfo: 'qweqwe',
  motherName: 'werer',
  motherPhone: 'werwer',
  motherInfo: 'www',
  notes: '',
  selected: false,
};

export default new Array(20)
  .fill(studentMock)
  .map((elem, id) => ({ ...elem, id, surname: elem.surname + id }))
