export interface ScannedDocument {
  courseName: string;
  groupName: string;
  students: ScannedDocumentStudent[];
}

export interface ScannedDocumentStudent {
  name: string;
  grade: number;
}
