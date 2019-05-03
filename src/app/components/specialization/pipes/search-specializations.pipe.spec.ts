import { SearchSpecializationsPipe } from './search-specializations.pipe';

describe('SearchSpecializationsPipe', () => {
  it('createTeacher an instance', () => {
    const pipe = new SearchSpecializationsPipe();
    expect(pipe).toBeTruthy();
  });
});
