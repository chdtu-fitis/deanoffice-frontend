import {StudentService} from './student.service';
import {GeneralService} from './general.service';
import {SpecializationService} from './specialization.service';
import {SpecialityService} from './speciality.service';
import {GroupService} from './group.service';
import {DiplomaSupplementService} from './diploma-supplement.service';
import {AuthenticationService} from './auth/authentication.service';
import {ExamReportService} from './exam-report.service';
import {CourseForGroupService} from './course-for-group.service';
import {DepartmentService} from './department.service';
import {GradeService} from './grade.service';
import {FileService} from './file-service';
import {DegreeService} from './degree.service';

import {AdministrationGuard, DashboardGuard, LoginGuard} from './auth/auth.guard';
import {PersonalFileGradesStatementService} from './personal-file-grades-statement.service';
import {AcademicCertificateService} from './academic-certificate.service';
import {EdeboService} from './edebo.service';
import {CurrentUserService} from './auth/current-user.service';
import {ThesisInputService} from './thesis-input.service';
import {StudentStipendService} from './student-stipend.service';
import {FacultyService} from './faculty.service';
import {DebtorStatisticsService} from './debtor-statistics.service';
import {StudyYearFinishService} from './study-year-finish.service';
import {TeacherService} from './teacher.service';
import {EdeboDiplomaNumberService} from './edebo-diploma-number.service';
import {CourseService} from './course.service';
import {PositionService} from './position.service';
import {ConsolidatedExamReportService} from './consolidated-exam-report.service';
import {AdministrationToolService} from './administration-tool.service';
import {CreditService} from './credit.service';
import {ScientificDegreeService} from "./scientific-degree.service";
import {SelectiveCourseService} from "./selective-course.service";
import {FieldOfKnowledgeService} from './field-of-knowledge.service';
import {SelectiveCourseStatisticsService} from './selective-course-statistics.service';
import {SelectiveCourseAnomalyService} from './selective-course-anomaly.service';
import {TableFilterNameAndTrainingCycleService} from './table-filter-name-and-training-cycle';
import {DataShareService} from './data-share.service';

export const SERVICES = [
  DegreeService,
  GroupService,
  StudentService,
  DiplomaSupplementService,
  GeneralService,
  CourseForGroupService,
  CourseService,
  ExamReportService,
  SpecialityService,
  FileService,
  GradeService,
  SpecialityService,
  SpecializationService,
  DepartmentService,
  PersonalFileGradesStatementService,
  EdeboService,
  EdeboDiplomaNumberService,
  AcademicCertificateService,
  AuthenticationService,
  CurrentUserService,
  ThesisInputService,
  StudentStipendService,
  FacultyService,
  DebtorStatisticsService,
  TeacherService,
  PositionService,
  StudyYearFinishService,
  PositionService,
  ConsolidatedExamReportService,
  AdministrationToolService,
  CreditService,
  ScientificDegreeService,
  SelectiveCourseService,
  FieldOfKnowledgeService,
  SelectiveCourseStatisticsService,
  SelectiveCourseAnomalyService,
  TableFilterNameAndTrainingCycleService,
  DataShareService,
];

export const GUARDS = [
  DashboardGuard,
  LoginGuard,
  AdministrationGuard,
];
