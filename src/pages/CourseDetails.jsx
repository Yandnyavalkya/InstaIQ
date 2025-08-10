import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useAdmin } from "../context/AdminContext";

 // Fallback static data for when admin courses are not available
 const fallbackCourses = [
   {
     _id: "0",
     img: "/assets/images/courses/course1.jpg",
    title: "ALL INDIA PLACEMENT APTITUDE TEST",
    rating: 5.0,
    ratingsCount: 1,
    provider: "Insta Education",
    price: "Free",
    oldPrice: null,
    membership: false,
    badge: "FREE",
    description: "A free, national-level aptitude test for students to assess their placement readiness. Includes Quantitative, Logical, and Verbal sections. Conducted by Insta iQ.",
    details: [
      "Covers Quantitative, Logical, and Verbal Aptitude",
      "Open to all students",
      "Get a detailed performance report",
      "Completely free of cost"
    ]
  },
     {
     _id: "1",
     img: "/assets/images/courses/course2.jpg",
    title: "PLACEMENT APTITUDE COURSE",
    rating: null,
    ratingsCount: null,
    provider: "Insta Education",
    price: "₹6,999",
    oldPrice: "₹9,999",
    membership: true,
    badge: "Included in Membership",
    description: "Comprehensive course to master all placement aptitude topics. Includes video lectures, practice tests, and live sessions.",
    details: [
      "Covers all major placement aptitude topics",
      "Video lectures and practice questions",
      "Live doubt sessions",
      "Certificate on completion"
    ]
  },
     {
     _id: "2",
     img: "/assets/images/courses/course3.jpg",
    title: "ADVANCE EXCEL & DATA ANALYSIS",
    rating: null,
    ratingsCount: null,
    provider: "Insta Education",
    price: "₹4,500",
    oldPrice: null,
    membership: true,
    badge: "Included in Membership",
    description: "Learn advanced Excel skills and data analysis techniques for business and research. Includes hands-on projects.",
    details: [
      "Advanced Excel formulas and tools",
      "Data visualization and dashboards",
      "Real-world data analysis projects",
      "Suitable for business and research"
    ]
  },
     {
     _id: "3",
     img: "/assets/images/courses/course4.jpg",
    title: "TCS NQT - MOCK TEST",
    rating: 5.0,
    ratingsCount: 1,
    provider: "Insta Education",
    price: "₹99",
    oldPrice: "₹2,999",
    membership: true,
    badge: "Included in Membership",
    description: "Simulate the real TCS NQT exam with this mock test. Get instant results and detailed solutions.",
    details: [
      "Based on latest TCS NQT pattern",
      "Instant result and feedback",
      "Detailed solutions for all questions",
      "Affordable price"
    ]
  },
     {
     _id: "4",
     img: "/assets/images/courses/course5.jpg",
    title: "COGNIZANT ASSESSMENT COURSE",
    rating: null,
    ratingsCount: null,
    provider: "Insta Education",
    price: null,
    oldPrice: null,
    membership: true,
    badge: "Included in Membership",
    description: "Prepare for Cognizant's recruitment process with targeted practice and expert guidance.",
    details: [
      "Cognizant-specific aptitude and coding practice",
      "Interview preparation",
      "Expert guidance and tips",
      "Included in membership"
    ]
  },
     {
     _id: "5",
     img: "/assets/images/courses/course6.jpg",
    title: "ACCENTURE MOCK TEST",
    rating: null,
    ratingsCount: null,
    provider: "Insta Education",
    price: null,
    oldPrice: null,
    membership: false,
    badge: null,
    description: "Take a mock test for Accenture's recruitment exam. Practice real questions and improve your chances.",
    details: [
      "Accenture exam pattern questions",
      "Timed test environment",
      "Performance analysis",
      "Ideal for final preparation"
    ]
  },
     {
     _id: "6",
     img: "/assets/images/courses/course7.jpg",
    title: "WIPRO MOCK TEST",
    rating: null,
    ratingsCount: null,
    provider: "Insta Education",
    price: "₹199",
    oldPrice: "₹499",
    membership: true,
    badge: "Included in Membership",
    description: "Prepare for Wipro's recruitment process with this comprehensive mock test. Practice real questions and improve your performance.",
    details: [
      "Wipro-specific exam pattern",
      "Timed mock test environment",
      "Detailed performance analysis",
      "Included in membership"
    ]
  },
     {
     _id: "7",
     img: "/assets/images/courses/course8.jpg",
    title: "INFOSYS MOCK TEST",
    rating: null,
    ratingsCount: null,
    provider: "Insta Education",
    price: "₹149",
    oldPrice: "₹399",
    membership: true,
    badge: "Included in Membership",
    description: "Master Infosys recruitment with targeted practice tests. Get familiar with their unique question patterns and time management.",
    details: [
      "Infosys exam pattern questions",
      "Real-time test simulation",
      "Performance tracking and analytics",
      "Included in membership"
    ]
  },
     {
     _id: "8",
     img: "/assets/images/courses/course9.jpg",
    title: "HCL MOCK TEST",
    rating: null,
    ratingsCount: null,
    provider: "Insta Education",
    price: "₹99",
    oldPrice: "₹299",
    membership: true,
    badge: "Included in Membership",
    description: "Ace HCL's recruitment process with our specialized mock test. Practice with questions designed to match their exact pattern.",
    details: [
      "HCL-specific question patterns",
      "Timed test environment",
      "Instant results and feedback",
      "Included in membership"
    ]
  }
];

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext();
  const { courses: adminCourses } = useAdmin();
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Scroll to top when component mounts and set loading
  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    // Simulate a small delay to prevent flickering
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, [id]);

  // Find course from admin courses or fallback to static data
  let course = null;
  
  // Debug logging
  console.log("CourseDetails - ID:", id);
  console.log("CourseDetails - Admin courses:", adminCourses);
  
  // First, try to find course from fallback data (this ensures we always have a course)
  course = fallbackCourses.find(c => c._id === id) || fallbackCourses[parseInt(id, 10)];
  
  // If admin courses are available, try to enhance with admin data
  if (adminCourses && adminCourses.length > 0) {
    const adminCourse = adminCourses.find(c => c._id === id);
    if (adminCourse) {
      // Merge admin data with fallback data
      course = {
        ...course, // Fallback data as base
        ...adminCourse, // Admin data takes precedence
        imageUrl: adminCourse.imageUrl || course.img, // Use admin image if available
        description: adminCourse.description || course.description,
        details: adminCourse.details || course.details
      };
    }
  }

  if (loading) {
    return (
      <div className="page-content bg-white">
        <div className="container" style={{ padding: 80, textAlign: "center" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="page-content bg-white">
        <div className="container" style={{ padding: 80, textAlign: "center" }}>
          <h2>Course Not Found</h2>
          <p>The course you are looking for does not exist.</p>
          <Link to="/courses" className="btn btn-primary">Back to Courses</Link>
        </div>
      </div>
    );
  }

  const handleBuyNow = () => {
    // Add to cart and navigate to checkout
    const courseToAdd = { ...course, cartId: id };
    console.log("Adding course to cart:", courseToAdd);
    dispatch({ type: "ADD_TO_CART", payload: courseToAdd });
    
    // Show added message briefly
    setAdded(true);
    
    // Navigate to checkout page after a short delay
    setTimeout(() => {
      navigate('/checkout');
    }, 500);
  };

  return (
    <div className="page-content bg-white">
      <div className="page-banner ovbl-dark" style={{ backgroundImage: "url(assets/images/banner/banner3.jpg)" }}>
        <div className="container">
          <div className="page-banner-entry">
            <h1 className="text-white">{course.title}</h1>
          </div>
        </div>
      </div>
      <div className="content-block">
        <div className="section-area section-sp1">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-12 col-sm-12">
                                 <div className="course-details">
                   {/* Debug info */}
                   {console.log("Course image sources:", {
                     imageUrl: course.imageUrl,
                     img: course.img,
                     finalSrc: course.imageUrl || course.img || "assets/images/courses/course1.jpg"
                   })}
                   <img 
                     src={course.imageUrl || course.img || "/assets/images/courses/course1.jpg"} 
                     alt={course.title} 
                     style={{ 
                       maxWidth: "100%", 
                       borderRadius: 8, 
                       marginBottom: 24,
                       minHeight: "200px",
                       objectFit: "cover"
                     }} 
                     onError={(e) => {
                       console.log("Image failed to load, using fallback");
                       e.target.src = "/assets/images/courses/course1.jpg";
                     }}
                     onLoad={(e) => {
                       console.log("Image loaded successfully:", e.target.src);
                     }}
                   />
                  <h2>{course.title}</h2>
                  <div style={{ color: "#888", fontSize: 15, marginBottom: 8 }}>
                    {course.instructor || course.provider || "Insta Education"}
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 16 }}>
                    {course.oldPrice && <span style={{ textDecoration: "line-through", color: "#888", marginRight: 8 }}>{course.oldPrice}</span>}
                    {course.price === 0 ? "Free" : course.price}
                  </div>
                  <p>{course.description}</p>
                  {course.details && (
                    <ul>
                      {course.details.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {added && <div style={{ color: 'green', marginTop: 10 }}>Added to cart!</div>}
                </div>
              </div>
              <div className="col-lg-4 col-md-12 col-sm-12">
                <div className="course-sidebar">
                  <div className="widget">
                    <h5 className="widget-title">Course Info</h5>
                    <ul>
                      <li>Provider: <span>{course.instructor || course.provider || "Insta Education"}</span></li>
                      <li>Price: <span>{course.price === 0 ? "Free" : course.price}</span></li>
                      {course.oldPrice && <li>Old Price: <span>{course.oldPrice}</span></li>}
                      {course.badge && <li>Badge: <span>{course.badge}</span></li>}
                      {course.rating && <li>Rating: <span>{course.rating} ({course.enrollments || course.ratingsCount || 0} ratings)</span></li>}
                    </ul>
                  </div>
                                     <div className="widget">
                     <button onClick={handleBuyNow} className="btn btn-block btn-primary" style={{
                       background: 'linear-gradient(135deg, #4c1864 0%, #6a1b9a 100%)',
                       border: 'none',
                       padding: '12px 24px',
                       fontSize: '16px',
                       fontWeight: '600'
                     }}>
                       Buy Now for {course.price === 0 ? "Free" : course.price}
                     </button>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails; 