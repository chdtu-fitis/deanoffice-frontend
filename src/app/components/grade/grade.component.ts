import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {GradeService} from '../../services/grade.service';
import {GroupService} from '../../services/group.service';
import {StudentGroup} from '../../models/StudentGroup';
import {CourseForGroupService} from '../../services/course-for-group.service';
import {Grade} from '../../models/Grade';
import {StudentDegree} from '../../models/StudentDegree';
import {CourseForGroup} from '../../models/CourseForGroup';
import {StudentService} from '../../services/student.service';

@Component({
    selector: 'grade',
    templateUrl: './grade.component.html',
    styleUrls: ['./grade.component.scss'],
    providers: [GradeService, GroupService, StudentService, CourseForGroupService]
})
export class GradeComponent implements OnInit {
    mobileQuery: MediaQueryList;
    groups: StudentGroup[];
    selectGroup: StudentGroup;
    selectSemester = 1;
    courses: any = [];
    studentsDegree: any = [];
    loading = false;
    errorsMessage = [];
    emptyGradesList = [];
    gradesUpdate = [];
    private _mobileQueryListener: () => void;

    constructor(private gradeService: GradeService,
                private groupService: GroupService,
                private studentService: StudentService,
                private courseForGroupService: CourseForGroupService,
                changeDetectorRef: ChangeDetectorRef,
                media: MediaMatcher) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit() {
        this.groupService.getGroups().subscribe((groups: StudentGroup[]) => this.groups = groups);
    }

    setStudentGroup(group: StudentGroup): void {
        this.selectGroup = group;
    }

    setSemester(selectSemester: number): void {
        this.selectSemester = selectSemester;
    }

    getGrades(): void {
        if (!this.selectGroup) return;
        this.sendRequestForSelectionOfStudentsAssessmentsCoursesForGroup(this.selectSemester || 1, this.selectGroup.id);
    }

    joinGradesForStudents(grades: any, students: any, courses: any) {
        const studentsTemp = [];
        const emptyGrades = [];
        for (const studentDegree of students) {
            const student = studentDegree;
            student.grades = [];
            for (const course of courses) {
                let check = false;
                for (const grade of grades) {
                    if (studentDegree.id === grade.studentDegree.id && grade.course.id === course.course.id) {
                        check = true;
                        if (!grade.points) { grade.points = 0; }
                        student.grades.push(grade);
                        break;
                    }
                }
                if (!check) {
                    const gradeObject = {
                        points: 0,
                        empty: true,
                        course: {
                            id: course.course.id
                        },
                        studentDegree: {
                            id: studentDegree.id
                        }
                    };
                    student.grades.push(gradeObject);
                    emptyGrades.push(gradeObject);
                }
            }
            studentsTemp.push(student);
        }
        return {studentsTemp, emptyGrades};
    }

    sendRequestForSelectionOfStudentsAssessmentsCoursesForGroup(semester: number, groupId: number): void {
        this.loading = false;
        this.gradeService.getGradesByGroupIdAndBySemester(groupId, semester).subscribe((grades: Grade[]) => {
            this.studentService.getStudentsByGroupId(groupId).subscribe((studentsDegree: StudentDegree[]) => {
                this.courseForGroupService.getCoursesForGroupAndSemester(groupId, semester).subscribe((courses: CourseForGroup[]) => {
                    this.updateGradesAndStudentsAndCourses(grades, studentsDegree, courses);
                });
            });
        });
    }

    updateGradesAndStudentsAndCourses(grades, studentsDegree, courses) {
        this.checkForErrorsAfterQueryingDataFetches(courses, studentsDegree, grades);
        const joinGrades = this.joinGradesForStudents(grades, studentsDegree, courses);
        this.setStudentDegree(joinGrades.studentsTemp || []);
        this.setEmptyGradesList(joinGrades.emptyGrades || []);
        this.setCourses(courses || []);
        this.clearUpdateGrades();
        this.loading = true;
    }

    setStudentDegree(studentsDegree): void {
        this.studentsDegree = studentsDegree;
    }

    setEmptyGradesList(grades): void {
        this.emptyGradesList = grades;
    }

    setCourses(courses): void {
        this.courses = courses;
    }

    addErrorMessage(err, clear) {
        if(clear) this.errorsMessage = [];
        this.errorsMessage.push(err);
    }

    checkForErrorsAfterQueryingDataFetches(courses: any, students: any, grades: any): void {
        if (courses[0] && students[0] && grades[0]) {
            this.errorsMessage = [];
        } else {
            this.errorsMessage = [];
            if (!courses[0]) {
                this.addErrorMessage('Немає предметів для обраної групи студентів, в даному семестрі.', false);
            }
            if (!grades[0]) {
                this.addErrorMessage('Немає оцінок для обраної групи студентів, в даному семестрі.', false);
            }
            if (!students[0]) {
                this.addErrorMessage('Не знайдено студентів в обраній групі.', false);
            }
        }
    }

    setErrorsFromTable(error) {
        error ? this.errorsMessage.push(error) : this.errorsMessage = [];
    }

    addGradesForUpdate(grades) {
        this.gradesUpdate = grades;
    }

    clearUpdateGrades() {
        this.gradesUpdate = [];
    }

    updateGradesForGroup() {
        this.gradeService.updateGrades(this.gradesUpdate).subscribe(grades => {
            this.getGrades();
        })
    }

    fillInWithZerosGrades() {
        this.gradeService.updateGrades(this.emptyGradesList).subscribe(grades => {
            this.getGrades();
        });
    }
}