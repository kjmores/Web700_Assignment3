const fs = require('fs');
const path = require('path');

var studentsFilePath = path.join('data', 'Refsnes', '..', 'students.json');
var coursesFilePath = path.join('data', 'Refsnes', '..', 'courses.json');


class Data {
  constructor(students, courses) {
    this.students = students;
    this.courses = courses;
  }
}

let dataCollection = null;
function initialize() {
  return new Promise((resolve, reject) => {
      fs.readFile(studentsFilePath, 'utf8', (studErr, studentDataFile) => {
      fs.readFile(coursesFilePath, 'utf8', (courseErr, courseDataFile) => {
        studentErrMessage = 'Unable to read students.json';
        courseErrMessage = 'Unable to read courses.json';
        if(studErr&&courseErr){
          reject( studentErrMessage + ' and '+ courseErrMessage);          
          return;
        }else if(studErr){
          reject(studentErrMessage);          
          return;
        }else if (courseErr) {
          reject(courseErrMessage);
          return;
        }else{
          const students = JSON.parse(studentDataFile);
          const courses = JSON.parse(courseDataFile);  
          dataCollection = new Data(students, courses);          
          resolve();
        }
      });
    });
  });
}


function getAllStudents() {
  return new Promise((resolve, reject) => {
    if (dataCollection.students.length > 0) {
      resolve(dataCollection.students);
    } else {
      reject("No results returned");
    }
  });
}

function getCourses() {
  return new Promise((resolve, reject) => {
    if (dataCollection.courses.length > 0) {
      resolve(dataCollection.courses);
    } else {
      reject("No results returned");
    }
  });
}

function getTAs() {
  return new Promise((resolve, reject) => {
    if (dataCollection.students.length > 0) {
      const tas = dataCollection.students.filter(student => student.TA === true);
      resolve(tas);
    } else {
      reject("No results returned");
    }
  });
}

function getStudentsByCourse(courseID) {
  return new Promise((resolve, reject) => {
    if (dataCollection.students.length > 0) {
      const studentListBycourses = dataCollection.students.filter(student => student.course === courseID);
      resolve(studentListBycourses);
    } else {
      reject("No results returned");
    }
  });
}

function getStudentByNum(studeNUm) {
  return new Promise((resolve, reject) => {
    if (dataCollection.students.length > 0) {
      const studentListByNum = dataCollection.students.filter(student => student.studentNum === studeNUm);
      resolve(studentListByNum);
    } else {
      reject("No results returned");
    }
  });
}

module.exports = {
  initialize,
  getAllStudents,
  getTAs,
  getCourses,
  getStudentsByCourse,
  getStudentByNum
};
