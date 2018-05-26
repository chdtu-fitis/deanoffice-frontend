import {Component, OnInit, ViewChild} from '@angular/core';
import {GradeService} from '../../services/grade.service';
import {GroupService} from '../../services/group.service';
import {StudentGroup} from '../../models/StudentGroup';
import {CourseForGroupService} from '../../services/course-for-group.service';
import {Grade} from '../../models/Grade';
import {StudentDegree} from '../../models/StudentDegree';
import {CourseForGroup} from '../../models/CourseForGroup';
import {StudentService} from '../../services/student.service';
import {EmptyGrade} from './EmptyGrade';

@Component({
    selector: 'app-grade',
    templateUrl: './grade.component.html',
    styleUrls: ['./grade.component.scss'],
    providers: [GradeService, GroupService, StudentService, CourseForGroupService]
})
export class GradeComponent implements OnInit {
    @ViewChild('gradeTable') gradeTable;
    groups: StudentGroup[];
    selectGroup: StudentGroup;
    selectSemester = 1;
    courses: any = [];
    studentsDegree: any = [];
    loading = false;
    errorsMessage = [];
    emptyGradesList = [];
    gradesUpdate = [];

    constructor(private gradeService: GradeService,
                private groupService: GroupService,
                private studentService: StudentService,
                private courseForGroupService: CourseForGroupService) {
    }

    ngOnInit() {
        this.getGroups();
    }

    getGroups(): void {
        this.groupService.getGroups().subscribe((groups: StudentGroup[]) => {
            this.groups = groups;
        });
    }

    setStudentGroup(group: StudentGroup): void {
        this.selectGroup = group;
        this.gradeTable.resetGrades();
    }

    setSemester(selectSemester: number): void {
        this.selectSemester = selectSemester;
    }

    getGrades(): void {
        if (!this.selectGroup) return;
        this.updateRequest(this.selectSemester || 1, this.selectGroup.id);
    }

    updateRequest(semester: number, groupId: number): void {
        this.loading = false;
        this.gradeService.getGradesByGroupIdAndBySemester(groupId, semester).subscribe((grades: Grade[]) => {
            this.studentService.getStudentsByGroupId(groupId).subscribe((studentsDegree: StudentDegree[]) => {
                this.courseForGroupService.getCoursesForGroupAndSemester(groupId, semester).subscribe((courses: CourseForGroup[]) => {
                    this.updateGradesAndStudentsAndCourses(grades, studentsDegree, courses);
                });
            });
        });
    }

    updateGradesAndStudentsAndCourses(grades, studentsDegree, courses): void {
        this.checkForErrorsAfterQueryingDataFetches(courses, studentsDegree, grades);
        const joinGrades = this.joinGradesForStudents(grades, studentsDegree, courses);
        this.setStudentDegree(joinGrades.studentsTemp || []);
        this.setEmptyGradesList(joinGrades.emptyGrades || []);
        this.setCourses(courses || []);
        this.clearUpdateGrades();
        this.loading = true;
    }

    joinGradesForStudents(grades: any, students: any, courses: any): any {
        const studentsTemp = [];
        const emptyGrades = [];
        for (const studentDegree of students) {
            const student = studentDegree;
            student.grades = [];
            for (const course of courses) {
                const grade = this.joinGrades(studentDegree, grades, course);
                if (grade.empty) {
                    emptyGrades.push(grade);
                }
                student.grades.push(grade);
            }
            studentsTemp.push(student);
        }
        return {studentsTemp, emptyGrades};
    }

    joinGrades(studentDegree: any, grades: any, course: any): any {
        let check = false;
        for (const grade of grades) {
            if (studentDegree.id === grade.studentDegreeId && grade.courseId === course.course.id) {
                check = true;
                if (!grade.points) {
                    grade.points = null;
                }
                return grade;
            }
        }
        if (!check) return new EmptyGrade(null, true, course.course.id, studentDegree.id, false);
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

    addErrorMessage(err, clear): void {
        if (clear) this.errorsMessage = [];
        this.errorsMessage.push(err);
    }

    checkForErrorsAfterQueryingDataFetches(courses: any, students: any, grades: any): void {
        if (courses.length && students.length && grades.length) {
            this.errorsMessage = [];
        } else {
            this.errorsMessage = [];
            if (!courses.length) {
                this.addErrorMessage('Немає предметів для обраної групи студентів, в даному семестрі.', false);
            }
            if (!grades.length) {
                this.addErrorMessage('Немає оцінок для обраної групи студентів, в даному семестрі.', false);
            }
            if (!students.length) {
                this.addErrorMessage('Не знайдено студентів в обраній групі.', false);
            }
        }
    }

    setErrorsFromTable(error: string): void {
        error ? this.addErrorMessage(error, true) : this.errorsMessage = [];
    }

    addGradesForUpdate(grades): void {
        this.gradesUpdate = grades;
    }

    clearUpdateGrades(): void {
        this.gradesUpdate = [];
    }

    updateGradesForGroup(): void {
        this.gradeService.updateGrades(this.fixEntytyGrades(this.gradesUpdate)).subscribe(grades => {
            this.getGrades();
            this.gradeTable.resetGrades();
        });
    }

    fillInWithZerosGrades(): void {
        this.gradeService.updateGrades(this.fixEntytyGrades(this.emptyGradesList)).subscribe(grades => {
            this.getGrades();
        });
    }

    fixEntytyGrades(grades) {
        if (!grades.length) return [];
        const tempGrades = [];
        for (const grade of grades) {
            tempGrades.push(this.gradeEntity(grade));
        }
        return tempGrades;
    }

    gradeEntity(grade: any) {
        const tempGrade: any = {
            studentDegree: {
                id: grade.studentDegreeId || grade.studentDegree.id
            },
            course: {
                id: grade.courseId || grade.course.id
            },
            points: grade.points,
            onTime: grade.onTime || false
        };
        if (grade.id) tempGrade.id = grade.id;

        return tempGrade;
    }
}
