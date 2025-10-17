import React, { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Avatar from "@/components/atoms/Avatar";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";

const StudentModal = ({ student, isOpen, onClose, grades = [], attendance = [] }) => {
  const [activeTab, setActiveTab] = useState("profile");

  if (!isOpen || !student) return null;

  const getStatusVariant = (status) => {
    switch (status?.toLowerCase()) {
      case "active": return "success";
      case "inactive": return "error";
      case "at risk": return "warning";
      default: return "default";
    }
  };

  const calculateGPA = () => {
    if (!grades.length) return "N/A";
    const total = grades.reduce((sum, grade) => sum + (grade.score / grade.maxScore) * 4, 0);
    return (total / grades.length).toFixed(2);
  };

  const calculateAttendanceRate = () => {
    if (!attendance.length) return "N/A";
    const present = attendance.filter(a => a.status === "Present").length;
    return `${Math.round((present / attendance.length) * 100)}%`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <Card className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-gradient-to-br from-white to-gray-50/50 mx-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/10 to-info/10 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar
                src={student.photo}
                alt={`${student.firstName} ${student.lastName}`}
                size="xl"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {student.firstName} {student.lastName}
                </h2>
                <p className="text-gray-600">
                  Grade {student.gradeLevel} • {student.class}
                </p>
                <Badge variant={getStatusVariant(student.status)} className="mt-2">
                  {student.status}
                </Badge>
              </div>
            </div>
            <Button onClick={onClose} variant="ghost" size="sm">
              <ApperIcon name="X" className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex px-6">
            {[
              { id: "profile", label: "Profile", icon: "User" },
              { id: "grades", label: "Grades", icon: "BookOpen" },
              { id: "attendance", label: "Attendance", icon: "Calendar" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 border-b-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                }`}
              >
                <ApperIcon name={tab.icon} className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Contact Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <ApperIcon name="Mail" className="h-4 w-4 text-gray-400 mr-3" />
                      <span className="text-gray-600">{student.email}</span>
                    </div>
                    <div className="flex items-center">
                      <ApperIcon name="Phone" className="h-4 w-4 text-gray-400 mr-3" />
                      <span className="text-gray-600">{student.phone}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Parent/Guardian
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <ApperIcon name="User" className="h-4 w-4 text-gray-400 mr-3" />
                      <span className="text-gray-600">{student.parentContact.name}</span>
                    </div>
                    <div className="flex items-center">
                      <ApperIcon name="Phone" className="h-4 w-4 text-gray-400 mr-3" />
                      <span className="text-gray-600">{student.parentContact.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <ApperIcon name="Mail" className="h-4 w-4 text-gray-400 mr-3" />
                      <span className="text-gray-600">{student.parentContact.email}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Academic Summary
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card className="p-4 text-center bg-gradient-to-br from-primary/5 to-info/5">
                    <p className="text-2xl font-bold text-primary">{calculateGPA()}</p>
                    <p className="text-sm text-gray-600">Current GPA</p>
                  </Card>
                  <Card className="p-4 text-center bg-gradient-to-br from-success/5 to-primary/5">
                    <p className="text-2xl font-bold text-success">{calculateAttendanceRate()}</p>
                    <p className="text-sm text-gray-600">Attendance Rate</p>
                  </Card>
                  <Card className="p-4 text-center bg-gradient-to-br from-warning/5 to-error/5">
                    <p className="text-2xl font-bold text-warning">{grades.length}</p>
                    <p className="text-sm text-gray-600">Total Assignments</p>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {activeTab === "grades" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Grades
              </h3>
              {grades.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left p-3 border-b font-semibold text-gray-700">Subject</th>
                        <th className="text-left p-3 border-b font-semibold text-gray-700">Assignment</th>
                        <th className="text-center p-3 border-b font-semibold text-gray-700">Score</th>
                        <th className="text-center p-3 border-b font-semibold text-gray-700">Grade</th>
                        <th className="text-left p-3 border-b font-semibold text-gray-700">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {grades.map((grade) => {
                        const percentage = Math.round((grade.score / grade.maxScore) * 100);
                        const letterGrade = percentage >= 90 ? "A" : percentage >= 80 ? "B" : percentage >= 70 ? "C" : percentage >= 60 ? "D" : "F";
                        const gradeColor = percentage >= 90 ? "text-success" : percentage >= 70 ? "text-warning" : "text-error";
                        
                        return (
                          <tr key={grade.Id} className="hover:bg-gray-50">
                            <td className="p-3 border-b">{grade.subject}</td>
                            <td className="p-3 border-b">{grade.assignment}</td>
                            <td className="p-3 border-b text-center">{grade.score}/{grade.maxScore}</td>
                            <td className={`p-3 border-b text-center font-semibold ${gradeColor}`}>
                              {letterGrade} ({percentage}%)
                            </td>
                            <td className="p-3 border-b text-gray-600">
                              {new Date(grade.date).toLocaleDateString()}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-600 text-center py-8">No grades recorded yet.</p>
              )}
            </div>
          )}

          {activeTab === "attendance" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Attendance History
              </h3>
              {attendance.length > 0 ? (
                <div className="space-y-2">
                  {attendance.slice(-10).reverse().map((record) => (
                    <div key={record.Id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <ApperIcon name="Calendar" className="h-4 w-4 text-gray-400" />
                        <span className="font-medium text-gray-900">
                          {new Date(record.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant={record.status.toLowerCase()}>
                          {record.status}
                        </Badge>
                        {record.notes && (
                          <span className="text-sm text-gray-600">
                            {record.notes}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-center py-8">No attendance records yet.</p>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default StudentModal;