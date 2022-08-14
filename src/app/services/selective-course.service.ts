import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SelectiveCourse} from '../models/SelectiveCourse';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';
import {forObservable} from '../components/shared/httpErrors';
import {Observable, of} from 'rxjs';
import {SelectiveCoursesYearParameters} from '../models/SelectiveCoursesYearParameters';
import {SelectiveCoursesStudentDegree} from '../models/SelectiveCoursesStudentDegree';
import {SelectiveCoursesStudentDegreeSubstitution} from '../models/SelectiveCoursesStudentDegreeSubstitution';
import {ImportSelectiveCourses} from "../components/selective-course/import-csv/model/ImportSelectiveCourses";
import {TypeCycle} from "../models/TypeCycle";
import {ImportSelectiveCourseForSave} from "../components/selective-course/import-csv/model/ImportSelectiveCourseForSave";
import {UpdateSelectiveCourses} from "../components/selective-course/import-csv/model/UpdateSelectiveCourses";
import {UpdateDiplomaAnalytics} from "../models/edebo-diploma-number/updateDiplomaAnalytics";

const SELECTIVE_COURSE_URL: string = environment.apiUrl + '/selective-courses';

@Injectable()
export class SelectiveCourseService {
  constructor(private httpClient: HttpClient) {
  }

  getSelectiveCourses(studyYear: string, degreeId: number, semester: number, all?: boolean): Observable<SelectiveCourse[]> {
    all = Boolean(all);
    return this.httpClient.get<SelectiveCourse[]>(
      `${SELECTIVE_COURSE_URL}?studyYear=${studyYear}&degreeId=${degreeId}&semester=${semester}&all=${all}`)
      .pipe(catchError(forObservable('Отримання списку вибіркових предметів', [])));
  }

  getSelectiveCoursesWithStudentsCount(studyYear: string, degreeId: number, semester: number, all?: boolean): Observable<SelectiveCourse[]> {
    all = Boolean(all);
    return this.httpClient.get<SelectiveCourse[]>(
      `${SELECTIVE_COURSE_URL}/students-count?studyYear=${studyYear}&degreeId=${degreeId}&semester=${semester}&all=${all}`)
      .pipe(catchError(forObservable('Отримання списку вибіркових предметів', [])));
  }

  getSelectiveCoursesForThisAcademicYear(degreeId: number, semester: number): Observable<SelectiveCourse[]> {
    return this.httpClient.get<SelectiveCourse[]>(
      `${SELECTIVE_COURSE_URL}?degreeId=${degreeId}&semester=${semester}&thisYear=true`)
      .pipe(catchError(forObservable('Отримання списку вибіркових предметів', [])));
  }

  createSelectiveCourse(body) {
    return this.httpClient.post(`${SELECTIVE_COURSE_URL}`, body);
  }

  updateSelectiveCourse(id, body) {
    return this.httpClient.put(`${SELECTIVE_COURSE_URL}/${id}`, body);
  }

  deleteSelectiveCourse(id) {
    return this.httpClient.delete(`${SELECTIVE_COURSE_URL}/${id}`);
  }

  getSelectiveCourseStudents(selectiveCourseId: number, forFaculty: boolean): any {
    return this.httpClient.get(`${SELECTIVE_COURSE_URL}/course-students?selectiveCourseId=${selectiveCourseId}&forFaculty=${forFaculty}`);
  }

  disqualifySelectiveCourses(semester: number, degreeId: number) {
    return this.httpClient.patch(`${SELECTIVE_COURSE_URL}/disqualification?semester=${semester}&degreeId=${degreeId}`, null);
  }

  createYearParameters(yearParametersEarlyPeriod: SelectiveCoursesYearParameters, yearParametersLatePeriod: SelectiveCoursesYearParameters) {
    const body = [yearParametersEarlyPeriod, yearParametersLatePeriod];
    return this.httpClient.post(`${environment.apiUrl}/selective-courses-year-parameters`, body);
  }

  getYearParameters(studyYear: string): Observable<SelectiveCoursesYearParameters[]> {
    return this.httpClient.get<SelectiveCoursesYearParameters[]>(`${environment.apiUrl}/selective-courses-year-parameters?year=${studyYear}`);
  }

  getStudentCoursesBySurname(all: boolean, studyYear: string, surname: string): Observable<SelectiveCoursesStudentDegree[]> {
    return this.httpClient.get<SelectiveCoursesStudentDegree[]>(
      `${SELECTIVE_COURSE_URL}/student-courses-by-surname?all=${all}&studyYear=${studyYear}&surname=${surname}`);
  }

  substituteSelectiveCoursesForStudentDegree(selectiveCoursesStudentDegreeSubstitution: SelectiveCoursesStudentDegreeSubstitution): Observable<any> {
    return this.httpClient.patch(`${SELECTIVE_COURSE_URL}/substitution`, selectiveCoursesStudentDegreeSubstitution);
  }

  assignMultipleCoursesForMultipleStudents(body) {
    return this.httpClient.post(`${SELECTIVE_COURSE_URL}/registration/multiple`, body);
  }

  uploadImportedSelectiveCoursesData(data: FormData): Observable<ImportSelectiveCourses> {
    return this.httpClient.post<ImportSelectiveCourses>(`${SELECTIVE_COURSE_URL}/csv-import-file`, data)
       .pipe(catchError(forObservable<ImportSelectiveCourses>('upload Selective Courses')))
  }

  addImportedSelectiveCourses(datta: ImportSelectiveCourseForSave[]) {
    return this.httpClient.post<UpdateSelectiveCourses>(`${SELECTIVE_COURSE_URL}/csv-import-save`, datta)
      .pipe(catchError(forObservable<UpdateSelectiveCourses>('save selective courses')))
  }

}
