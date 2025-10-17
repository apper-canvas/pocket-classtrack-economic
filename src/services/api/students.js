import studentsData from "@/services/mockData/students.json";

let students = [...studentsData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getStudents = async () => {
  await delay(300);
  return [...students];
};

export const getStudentById = async (id) => {
  await delay(200);
  return students.find(student => student.Id === parseInt(id));
};

export const createStudent = async (studentData) => {
  await delay(400);
  const maxId = students.length > 0 ? Math.max(...students.map(s => s.Id)) : 0;
  const newStudent = {
    ...studentData,
    Id: maxId + 1
  };
  students.push(newStudent);
  return { ...newStudent };
};

export const updateStudent = async (id, studentData) => {
  await delay(350);
  const index = students.findIndex(student => student.Id === parseInt(id));
  if (index !== -1) {
    students[index] = { ...students[index], ...studentData };
    return { ...students[index] };
  }
  throw new Error("Student not found");
};

export const deleteStudent = async (id) => {
  await delay(250);
  const index = students.findIndex(student => student.Id === parseInt(id));
  if (index !== -1) {
    const deletedStudent = students.splice(index, 1)[0];
    return { ...deletedStudent };
  }
  throw new Error("Student not found");
};