import React, { useState, useEffect } from "react";
import { ITeacher } from "../../store/slices/teachers/teachersSlice";

interface TeachersSearchProps {
  teachers: ITeacher[];
  onSearch: (filteredTeachers: ITeacher[]) => void;
}

export default function TeachersSearch({ teachers, onSearch }: TeachersSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filtered = teachers.filter(
      (teacher) =>
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (teacher.nameEn && teacher.nameEn.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    onSearch(filtered);
  }, [searchTerm, teachers, onSearch]);

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search teachers by name..."
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
