import {Component, OnInit} from '@angular/core';
import {GradeService} from '../../services/grade.service';
import {GroupService} from '../../services/group.service';
import {StudentGroup} from '../../models/StudentGroup';
import {CourseForGroupService} from '../../services/course-for-group.service';
import {Grade} from '../../models/Grade';
import {StudentDegree} from '../../models/StudentDegree';
import {CourseForGroup} from '../../models/CourseForGroup';

@Component({
    selector: 'grade',
    templateUrl: './grade.component.html',
    styleUrls: ['./grade.component.scss'],
    providers: [GradeService, GroupService, CourseForGroupService]
})
export class GradeComponent implements OnInit {
    groups: StudentGroup[];
    selectGroup: StudentGroup;
    selectSemester = 1;
    courses: any = [];
    studentsDegree: any = [];
    loading = false;
    errorsMessage = [];
    insertEmptyGradesList = [];

    constructor(private gradeService: GradeService,
                private groupService: GroupService,
                private courseForGroupService: CourseForGroupService) {
    }

    ngOnInit() {
        this.groupService.getGroups().subscribe((groups: StudentGroup[]) => this.groups = groups);
    }

    setStudentGroup(group: StudentGroup): void {
        this.selectGroup = group;
        this.getGrades();
    }

    setSemester(selectSemester: number): void {
        this.selectSemester = selectSemester;
        this.getGrades();
    }

    getGrades(): void {
        if (!this.selectGroup) return;
        this.sendRequestForSelectionOfStudentsAssessmentsCoursesForGroup(this.selectSemester, this.selectGroup.id);
    }

    joinGradesForStudents(grades: any, students: any, courses: any) {
        const studentsTemp = [];
        const emptyGrades = [];
        for (let q = 0; q < students.length; q++) {
            const student = students[q];
            student.grades = [];
            for (let w = 0; w < courses.length; w++) {
                let check = false;
                for (let e = 0; e < grades.length; e++) {
                    if (students[q].id === grades[e].student.id && grades[e].course.id === courses[w].course.id) {
                        check = true;
                        student.grades.push(grades[e]);
                        break;
                    }
                }
                if (!check) {
                    student.grades.push({ empty: true });
                    emptyGrades.push({
                        points: 0,
                        course: {
                            id: courses[w].course.id
                        },
                        studentDegree: {
                            id: students[q].id
                        }
                    });
                }
            }
            studentsTemp.push(student);
        }
        return { studentsTemp, emptyGrades };
    }

    sendRequestForSelectionOfStudentsAssessmentsCoursesForGroup(semester: number, groupId: number): void {
        this.loading = false;
        this.gradeService.getGradesByGroupIdAndBySemester(groupId, semester).subscribe((grades: Grade[]) => {
            this.groupService.getGroupStudents(`${groupId}`).subscribe((students: StudentDegree[]) => {
                this.courseForGroupService.getCoursesForGroupAndSemester(groupId, semester).subscribe((courses: CourseForGroup[]) => {
                    this.checkForErrorsAfterQueryingDataFetches(courses, students, grades);
                    const joinGrades = this.joinGradesForStudents(grades, students, courses);
                    this.studentsDegree = joinGrades.studentsTemp || [];
                    this.insertEmptyGradesList = joinGrades.emptyGrades || [];
                    this.courses = courses || [];
                    this.loading = true;
                    console.log(this.studentsDegree);
                });
            });
        });
    }

    checkForErrorsAfterQueryingDataFetches(courses: any, students: any, grades: any): void {
        if (courses[0] && students[0] && grades[0]) {
            this.errorsMessage = [];
        } else {
            this.errorsMessage = [];
            if (!courses[0]) {
                this.errorsMessage.push('Немає предметів для обраної групи студентів, в даному семестрі.');
            }
            if (!grades[0]) {
                this.errorsMessage.push('Немає оцінок для обраної групи студентів, в даному семестрі.');
            }
            if (!students[0]) {
                this.errorsMessage.push('Не знайдено студентів в обраній групі.');
            }
        }
    }

    addEmtyGrades() {
        console.log(this.insertEmptyGradesList);
    }

}