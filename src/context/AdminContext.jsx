import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AdminContext = createContext();

// Initial static data for fallback - ALL ORIGINAL COURSES
const initialCourses = [
  {
    _id: "1",
    title: "ALL INDIA PLACEMENT APTITUDE TEST",
    description: "Comprehensive aptitude test preparation for campus placements",
    price: 0,
    duration: "3 months",
    category: "Aptitude",
    instructor: "Insta iQ",
    imageUrl: "assets/images/courses/course1.jpg",
    status: "active",
    enrollments: 1250,
    rating: 4.8,
    createdAt: "2024-01-01"
  },
  {
    _id: "2",
    title: "PLACEMENT APTITUDE COURSE",
    description: "Complete course covering all aspects of placement aptitude",
    price: 6999,
    duration: "6 months",
    category: "Aptitude", 
    instructor: "Insta Education",
    imageUrl: "assets/images/courses/course2.jpg",
    status: "active",
    enrollments: 890,
    rating: 4.7,
    createdAt: "2024-01-05"
  },
  {
    _id: "3",
    title: "ADVANCE EXCEL & DATA ANALYSIS",
    description: "Master Excel and data analysis for business intelligence",
    price: 4500,
    duration: "4 months",
    category: "Technical",
    instructor: "Insta Education",
    imageUrl: "assets/images/courses/course3.jpg",
    status: "active",
    enrollments: 650,
    rating: 4.9,
    createdAt: "2024-01-10"
  },
  {
    _id: "4",
    title: "TCS NQT - MOCK TEST",
    description: "Comprehensive mock test for TCS National Qualifier Test preparation",
    price: 99,
    duration: "1 month",
    category: "Mock Test",
    instructor: "Insta Education",
    imageUrl: "assets/images/courses/course4.jpg",
    status: "active",
    enrollments: 520,
    rating: 5.0,
    createdAt: "2024-01-12"
  },
  {
    _id: "5",
    title: "COGNIZANT ASSESSMENT COURSE",
    description: "Prepare for Cognizant assessment with comprehensive study materials and practice tests",
    price: 1999,
    duration: "2 months",
    category: "Assessment",
    instructor: "Insta Education",
    imageUrl: "assets/images/courses/course5.jpg",
    status: "active",
    enrollments: 340,
    rating: 4.6,
    createdAt: "2024-01-15"
  },
  {
    _id: "6",
    title: "ACCENTURE MOCK TEST",
    description: "Mock test series designed specifically for Accenture placement preparation",
    price: 499,
    duration: "3 weeks",
    category: "Mock Test",
    instructor: "Insta Education",
    imageUrl: "assets/images/courses/course6.jpg",
    status: "active",
    enrollments: 280,
    rating: 4.5,
    createdAt: "2024-01-18"
  },
  {
    _id: "7",
    title: "WIPRO MOCK TEST",
    description: "Complete mock test preparation for Wipro recruitment process",
    price: 199,
    duration: "2 weeks",
    category: "Mock Test",
    instructor: "Insta Education",
    imageUrl: "assets/images/courses/course7.jpg",
    status: "active",
    enrollments: 410,
    rating: 4.4,
    createdAt: "2024-01-20"
  },
  {
    _id: "8",
    title: "INFOSYS MOCK TEST",
    description: "Specialized mock tests for Infosys Mysore and other Infosys recruitment drives",
    price: 149,
    duration: "2 weeks",
    category: "Mock Test",
    instructor: "Insta Education",
    imageUrl: "assets/images/courses/course8.jpg",
    status: "active",
    enrollments: 380,
    rating: 4.3,
    createdAt: "2024-01-22"
  },
  {
    _id: "9",
    title: "HCL MOCK TEST",
    description: "Mock test series for HCL Technologies recruitment with detailed solutions",
    price: 99,
    duration: "1 week",
    category: "Mock Test",
    instructor: "Insta Education",
    imageUrl: "assets/images/courses/course9.jpg",
    status: "active",
    enrollments: 220,
    rating: 4.2,
    createdAt: "2024-01-25"
  }
];

const initialEvents = [
  {
    _id: "1",
    title: "Webinar on Generative AI",
    description: "An AI-driven system that recommends tailored study plans, practice tests, and resources based on user performance, role preferences, and career goals.",
    date: "15",
    month: "July",
    time: "9:00am 10:00am",
    location: "Nagpur, India",
    capacity: 100,
    price: "₹1,500",
    category: "Webinar",
    img: "assets/images/event/1.png",
    status: "upcoming",
    registrations: 75,
    createdAt: "2024-01-01"
  },
  {
    _id: "2", 
    title: "Resume Building Bootcamp",
    description: "An online tool to create professional resumes and is a hands-on workshop where participants learn how to create job-winning resumes tailored for campus placements,with templates optimized for ATS.",
    date: "21",
    month: "August", 
    time: "11:00am 12:00am",
    location: "Nagpur, India",
    capacity: 50,
    price: "₹800",
    category: "Bootcamp",
    img: "assets/images/event/2.png",
    status: "upcoming",
    registrations: 42,
    createdAt: "2024-01-05"
  },
  {
    _id: "3",
    title: "Aptitude Mastery to Succeed in Competitive Exams",
    description: "Specialized training modules focused on quantitative aptitude, logical reasoning, critical thinking and verbal ability to excel in campus placement tests and competitive exams.",
    date: "29",
    month: "August",
    time: "9:00am 10:00am", 
    location: "Nagpur, India",
    capacity: 80,
    price: "₹1,200",
    category: "Training",
    img: "assets/images/event/3.png",
    status: "upcoming",
    registrations: 80,
    createdAt: "2024-01-10"
  },
  {
    _id: "4",
    title: "Job Matching and Placement Portal",
    description: "A portal that matches students with job opportunities based on test scores, skills, and company preferences, integrated with recruiters or platforms like LinkedIn.",
    date: "9",
    month: "September",
    time: "7:00am 8:00am",
    location: "Nagpur, India",
    capacity: 60,
    price: "₹500",
    category: "Workshop",
    img: "assets/images/event/4.png",
    status: "upcoming",
    registrations: 35,
    createdAt: "2024-01-12"
  },
  {
    _id: "5",
    title: "Interview Preparation",
    description: "Targeted modules to prepare students for technical and HR interviews through mock interviews, question banks, and behavioral tips, focusing on top recruiters'.",
    date: "2",
    month: "October",
    time: "7:00am 8:00am",
    location: "Nagpur, India",
    capacity: 40,
    price: "₹750",
    category: "Workshop",
    img: "assets/images/event/5.png",
    status: "upcoming",
    registrations: 28,
    createdAt: "2024-01-15"
  },
  {
    _id: "6",
    title: "Communication Assessment",
    description: "A dedicated assessment module offering comprehensive evaluation of communication skills, verbal ability, and presentation techniques, designed to be engaging, time-efficient, and progressively challenging for daily practice.",
    date: "29",
    month: "October",
    time: "7:00am 8:00am",
    location: "Nagpur, India",
    capacity: 50,
    price: "Free",
    category: "Assessment",
    img: "assets/images/event/6.png",
    status: "upcoming",
    registrations: 35,
    createdAt: "2024-01-18"
  }
];

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

export const AdminProvider = ({ children }) => {
  const [courses, setCourses] = useState(initialCourses);
  const [events, setEvents] = useState(initialEvents);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data from backend or use fallback
  useEffect(() => {
    fetchCoursesData();
  }, []);

  const fetchCoursesData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/courses`);
      const fetchedCourses = response.data.map(course => ({
        _id: course._id,
        title: course.title,
        description: course.description || "",
        price: course.price,
        duration: course.duration || "",
        category: course.category || "General",
        instructor: course.instructor || "Insta Education",
        imageUrl: course.imageUrl,
        status: course.status || "active",
        enrollments: course.enrollments || 0,
        rating: course.rating || 0,
        createdAt: course.createdAt || new Date().toISOString().split('T')[0]
      }));
      setCourses(fetchedCourses);
    } catch (err) {
      console.error("Error fetching courses:", err);
      // Use fallback data
      setCourses(initialCourses);
    } finally {
      setLoading(false);
    }
  };

  // Course management functions
  const addCourse = async (courseData) => {
    try {
      // Try to add to backend first
      const response = await axios.post(`${API_BASE_URL}/courses`, courseData);
      const newCourse = response.data;
      setCourses(prev => [...prev, newCourse]);
      return { success: true, course: newCourse };
    } catch (error) {
      // If backend fails, add locally with a temporary ID
      const newCourse = {
        _id: `temp_${Date.now()}`,
        ...courseData,
        enrollments: 0,
        rating: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setCourses(prev => [...prev, newCourse]);
      return { success: true, course: newCourse };
    }
  };

  const updateCourse = async (courseId, updatedData) => {
    try {
      // Try to update on backend first
      await axios.put(`${API_BASE_URL}/courses/${courseId}`, updatedData);
      setCourses(prev => prev.map(course => 
        course._id === courseId ? { ...course, ...updatedData } : course
      ));
      return { success: true };
    } catch (error) {
      // If backend fails, update locally
      setCourses(prev => prev.map(course => 
        course._id === courseId ? { ...course, ...updatedData } : course
      ));
      return { success: true };
    }
  };

  const deleteCourse = async (courseId) => {
    try {
      // Try to delete from backend first
      await axios.delete(`${API_BASE_URL}/courses/${courseId}`);
      setCourses(prev => prev.filter(course => course._id !== courseId));
      return { success: true };
    } catch (error) {
      // If backend fails, delete locally
      setCourses(prev => prev.filter(course => course._id !== courseId));
      return { success: true };
    }
  };

  // Event management functions
  const addEvent = (eventData) => {
    const newEvent = {
      _id: `event_${Date.now()}`,
      ...eventData,
      registrations: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setEvents(prev => [...prev, newEvent]);
    return { success: true, event: newEvent };
  };

  const updateEvent = (eventId, updatedData) => {
    setEvents(prev => prev.map(event => 
      event._id === eventId ? { ...event, ...updatedData } : event
    ));
    return { success: true };
  };

  const deleteEvent = (eventId) => {
    setEvents(prev => prev.filter(event => event._id !== eventId));
    return { success: true };
  };

  // Get statistics for dashboard
  const getStats = () => {
    return {
      totalCourses: courses.length,
      activeCourses: courses.filter(c => c.status === 'active').length,
      totalEvents: events.length,
      upcomingEvents: events.filter(e => e.status === 'upcoming').length,
      totalEnrollments: courses.reduce((sum, course) => sum + (course.enrollments || 0), 0),
      totalRevenue: courses.reduce((sum, course) => sum + (course.price * (course.enrollments || 0)), 0),
      averageRating: courses.reduce((sum, course) => sum + (course.rating || 0), 0) / courses.length || 0
    };
  };

  const value = {
    courses,
    events,
    loading,
    error,
    addCourse,
    updateCourse,
    deleteCourse,
    addEvent,
    updateEvent,
    deleteEvent,
    getStats,
    refreshCourses: fetchCoursesData
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export default AdminContext;