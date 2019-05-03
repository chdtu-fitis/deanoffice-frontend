import { AbbreviatedNamePipe } from './abbreviated-name.pipe';

describe('AbbreviatedNamePipe', () => {
  it('createTeacher an instance', () => {
    const pipe = new AbbreviatedNamePipe();
    expect(pipe).toBeTruthy();
  });
});
