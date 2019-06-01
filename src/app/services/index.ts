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

import {DashboardGuard, LoginGuard} from './auth/auth.guard';
import {PersonalFileGradesStatementService} from './personal-file-grades-statement.service';
import {AcademicCertificateService} from './academic-certificate.service';
import {EdeboService} from './edebo.service';
import {CurrentUserService} from './auth/current-user.service';
import {ThesisInputService} from './thesis-input.service';
import {StudentStipendService} from './student-stipend.service';
import {FacultyService} from './faculty.service';
import {DebtorStatisticsService} from './debtor-statistics.service';
import {TeacherService} from './teacher.service';
import {EdeboDiplomaNumberService} from './edebo-diploma-number.service';
import {CourseService} from './course.service';
import {PositionService} from './position.service';
import {ConsolidatedDocumentService} from './consolidated-document.service';

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
  ConsolidatedDocumentService,
];

export const GUARDS = [
  DashboardGuard,
  LoginGuard
];
