// "use client"

// import { useState } from "react";

// const Form = () => {
//   const [studentData, setStudentData] = useState({
//     name: "",
//     regNumber: "",
//     department: "",
//     level: "",
//     email: "",
//     phone: "",
//     address: "",
//     feesPaid: false,
//     profilePic: "",
//     password: "",
//   });

//   const [studentLoading, setStudentLoading] = useState(false);
//   const [studentMessage, setStudentMessage] = useState("");

//   const handleCreateStudent = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setStudentLoading(true);
//     setStudentMessage("");

//     try {
//       // Simulate API call
//       setTimeout(() => {
//         setStudentMessage("Student created successfully!");
//         setStudentLoading(false);
//       }, 2000);
//     } catch (error) {
//       setStudentMessage("Error creating student.");
//       setStudentLoading(false);
//     }
//   };

//   return (
//     <div className="md:w-[50%] w-full bg-white shadow-lg rounded-lg p-6">
//       <h2 className="text-lg font-bold text-green-600">Create Student</h2>
//       <p className="text-xs font-light text-gray-600 mb-4">
//         Fill in the student details and set a password.
//       </p>

//       {/* Profile Picture Preview */}
//       {studentData.profilePic && (
//         <div className="flex justify-center mb-4">
//           <img
//             src={studentData.profilePic}
//             alt="Profile"
//             className="w-20 h-20 rounded-full border"
//           />
//         </div>
//       )}

//       <form onSubmit={handleCreateStudent} className="space-y-2">
//         <input
//           type="text"
//           value={studentData.name}
//           onChange={(e) => setStudentData({ ...studentData, name: e.target.value })}
//           placeholder="Full Name"
//           className="w-full p-2 border rounded"
//           required
//         />

//         <input
//           type="text"
//           value={studentData.regNumber}
//           onChange={(e) => setStudentData({ ...studentData, regNumber: e.target.value })}
//           placeholder="Registration Number"
//           className="w-full p-2 border rounded"
//           required
//         />

//         <input
//           type="text"
//           value={studentData.department}
//           onChange={(e) => setStudentData({ ...studentData, department: e.target.value })}
//           placeholder="Department"
//           className="w-full p-2 border rounded"
//           required
//         />

//         <input
//           type="text"
//           value={studentData.level}
//           onChange={(e) => setStudentData({ ...studentData, level: e.target.value })}
//           placeholder="Level"
//           className="w-full p-2 border rounded"
//           required
//         />

//         <input
//           type="email"
//           value={studentData.email}
//           onChange={(e) => setStudentData({ ...studentData, email: e.target.value })}
//           placeholder="Email"
//           className="w-full p-2 border rounded"
//           required
//         />

//         <input
//           type="text"
//           value={studentData.phone}
//           onChange={(e) => setStudentData({ ...studentData, phone: e.target.value })}
//           placeholder="Phone Number"
//           className="w-full p-2 border rounded"
//           required
//         />

//         <input
//           type="text"
//           value={studentData.address}
//           onChange={(e) => setStudentData({ ...studentData, address: e.target.value })}
//           placeholder="Address"
//           className="w-full p-2 border rounded"
//           required
//         />

//         <input
//           type="text"
//           value={studentData.profilePic}
//           onChange={(e) => setStudentData({ ...studentData, profilePic: e.target.value })}
//           placeholder="Profile Picture URL"
//           className="w-full p-2 border rounded"
//         />

//         <label className="flex items-center space-x-2">
//           <input
//             type="checkbox"
//             checked={studentData.feesPaid}
//             onChange={(e) => setStudentData({ ...studentData, feesPaid: e.target.checked })}
//           />
//           <span className="text-sm text-gray-600">Fees Paid</span>
//         </label>

//         <input
//           type="password"
//           value={studentData.password}
//           onChange={(e) => setStudentData({ ...studentData, password: e.target.value })}
//           placeholder="Password"
//           className="w-full p-2 border rounded"
//           required
//         />

//         <button
//           type="submit"
//           className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition"
//           disabled={studentLoading}
//         >
//           {studentLoading ? "Creating..." : "Create Student"}
//         </button>

//         {studentMessage && (
//           <p className={`text-xs text-${studentMessage.includes("success") ? "green" : "red"}-500 text-center`}>
//             {studentMessage}
//           </p>
//         )}
//       </form>
//     </div>
//   );
// };

// export default Form;



// import React from "react";
// import { Input } from "@/components/ui/input";
// // import ClassSelector from "@/components/ClassSelector";
// import ClassSelector from './ClassSelector';
// interface StudentData {
//   name: string;
//   regNumber: string;
//   department: string;
//   level: string;
//   email: string;
//   phone: string;
//   address: string;
//   feesPaid: boolean;
//   profilePic: string;
//   currentClassId: string;
// }

// interface StudentFormProps {
//   studentData: StudentData;
//   setStudentData: React.Dispatch<React.SetStateAction<StudentData>>;
//   handleCreateStudent: (e: React.FormEvent) => void;
//   handleClassChangeStudent: (classId: string) => void;
//   studentLoading: boolean;
//   studentMessage: string;
// }

// const StudentForm: React.FC<StudentFormProps> = ({
//   studentData,
//   setStudentData,
//   handleCreateStudent,
//   handleClassChangeStudent,
//   studentLoading,
//   studentMessage,
// }) => {
//   return (
//     <div className="md:w-[50%] w-full">
//       <h2 className="text-lg font-bold text-red-600">Create Student</h2>
//       <p className="text-xs font-light text-gray-600 mb-4">
//         Register a student with the required details.
//       </p>
//       <form onSubmit={handleCreateStudent}>
//         <Input
//           type="text"
//           value={studentData.name}
//           onChange={(e) => setStudentData({ ...studentData, name: e.target.value })}
//           placeholder="Full Name"
//           className="mb-2"
//           required
//         />
//         <Input
//           type="text"
//           value={studentData.regNumber}
//           onChange={(e) => setStudentData({ ...studentData, regNumber: e.target.value })}
//           placeholder="Registration Number"
//           className="mb-2"
//           required
//         />
//         <Input
//           type="text"
//           value={studentData.department}
//           onChange={(e) => setStudentData({ ...studentData, department: e.target.value })}
//           placeholder="Department"
//           className="mb-2"
//           required
//         />
//         <Input
//           type="text"
//           value={studentData.level}
//           onChange={(e) => setStudentData({ ...studentData, level: e.target.value })}
//           placeholder="Level (e.g., 200 Level)"
//           className="mb-2"
//           required
//         />
//         <Input
//           type="email"
//           value={studentData.email}
//           onChange={(e) => setStudentData({ ...studentData, email: e.target.value })}
//           placeholder="Email"
//           className="mb-2"
//           required
//         />
//         <Input
//           type="text"
//           value={studentData.phone}
//           onChange={(e) => setStudentData({ ...studentData, phone: e.target.value })}
//           placeholder="Phone Number"
//           className="mb-2"
//           required
//         />
//         <Input
//           type="text"
//           value={studentData.address}
//           onChange={(e) => setStudentData({ ...studentData, address: e.target.value })}
//           placeholder="Address"
//           className="mb-2"
//           required
//         />
//         <div className="mb-2">
//           <label className="text-sm font-medium">Fees Paid:</label>
//           <select
//             value={studentData.feesPaid.toString()}
//             onChange={(e) => setStudentData({ ...studentData, feesPaid: e.target.value === "true" })}
//             className="block w-full border px-3 py-2 rounded-md"
//           >
//             <option value="true">Yes</option>
//             <option value="false">No</option>
//           </select>
//         </div>
//         <Input
//           type="text"
//           value={studentData.profilePic}
//           onChange={(e) => setStudentData({ ...studentData, profilePic: e.target.value })}
//           placeholder="Profile Picture URL"
//           className="mb-2"
//         />
//         <ClassSelector
//           currentClassId={studentData.currentClassId}
//           setStudentData={handleClassChangeStudent}
//         />
//         <button
//           type="submit"
//           className="bg-[#000080] text-white hover:text-red-600 text-xs font-bold py-2 px-4 rounded mt-4"
//           disabled={studentLoading}
//         >
//           {studentLoading ? "Creating..." : "Create Student"}
//         </button>
//         {studentMessage && (
//           <p className={`font-bold text-xs text-${studentMessage.includes("success") ? "green" : "red"}-500`}>
//             {studentMessage}
//           </p>
//         )}
//       </form>
//     </div>
//   );
// };

// export default StudentForm;
