export class EmptyGrade {
    points: number;
    empty: boolean;
    courseId: number;
    studentDegreeId: number;
    onTime: boolean;

    constructor(points: number, empty: boolean, courseId: number, studentDegreeId: number, onTime: boolean) {
        this.points = points;
        this.empty = empty;
        this.courseId = courseId;
        this.studentDegreeId = studentDegreeId;
        this.onTime = onTime;
    }
}