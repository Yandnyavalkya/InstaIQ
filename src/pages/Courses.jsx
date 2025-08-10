import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios
import { useAdmin } from "../context/AdminContext";
import { useAppContext } from "../context/AppContext";

// Define your backend base URL from environment variables using import.meta.env
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";
console.log("Backend URL (Courses Page):", import.meta.env.VITE_BACKEND_URL); // Log the URL for debugging

// Original static data (will be replaced by fetched data for main courses)
// Keeping it commented out for reference, but the component will use fetched data.
 const coursesData = [
   {
     img: "/assets/images/courses/course1.jpg",
    title: "ALL INDIA PLACEMENT APTITUDE TEST",
    rating: 5.0,
    ratingsCount: 1,
    provider: "Insta iQ",
    price: "Free",
    oldPrice: null,
    membership: false,
    badge: "FREE",
  },
     {
     img: "/assets/images/courses/course2.jpg",
    title: "PLACEMENT APTITUDE COURSE",
    rating: null,
    ratingsCount: null,
    provider: "Insta Education",
    price: "₹6,999",
    oldPrice: "₹9,999",
    membership: true,
    badge: "Included in Membership",
  },
     {
     img: "/assets/images/courses/course3.jpg",
    title: "ADVANCE EXCEL & DATA ANALYSIS",
    rating: null,
    ratingsCount: null,
    provider: "Insta Education",
    price: "₹4,500",
    oldPrice: null,
    membership: true,
    badge: "Included in Membership",
  },
     {
     img: "/assets/images/courses/course4.jpg",
    title: "TCS NQT - MOCK TEST",
    rating: 5.0,
    ratingsCount: 1,
    provider: "Insta Education",
    price: "₹99",
    oldPrice: "₹2,999",
    membership: true,
    badge: "Included in Membership",
  },
     {
     img: "/assets/images/courses/course5.jpg",
    title: "COGNIZANT ASSESSMENT COURSE",
    rating: null,
    ratingsCount: null,
    provider: "Insta Education",
    price: null,
    oldPrice: null,
    membership: true,
    badge: "Included in Membership",
  },
     {
     img: "/assets/images/courses/course6.jpg",
    title: "ACCENTURE MOCK TEST",
    rating: null,
    ratingsCount: null,
    provider: "Insta Education",
    price: null,
    oldPrice: null,
    membership: false,
    badge: null,
  },
     {
     img: "/assets/images/courses/course7.jpg",
    title: "WIPRO MOCK TEST",
    rating: null,
    ratingsCount: null,
    provider: "Insta Education",
    price: "₹199",
    oldPrice: "₹499",
    membership: true,
    badge: "Included in Membership",
  },
     {
     img: "/assets/images/courses/course8.jpg",
    title: "INFOSYS MOCK TEST",
    rating: null,
    ratingsCount: null,
    provider: "Insta Education",
    price: "₹149",
    oldPrice: "₹399",
    membership: true,
    badge: "Included in Membership",
  },
     {
     img: "/assets/images/courses/course9.jpg",
    title: "HCL MOCK TEST",
    rating: null,
    ratingsCount: null,
    provider: "Insta Education",
    price: "₹99",
    oldPrice: "₹299",
    membership: true,
    badge: "Included in Membership",
  },
];

// Extract actual categories from course data
const extractCategories = (courses) => {
  const categorySet = new Set();
  courses.forEach(course => {
    // Extract category from course title or add based on content
    if (course.title.includes('PLACEMENT') || course.title.includes('APTITUDE')) {
      categorySet.add('Aptitude');
    } else if (course.title.includes('EXCEL') || course.title.includes('DATA')) {
      categorySet.add('Data Analysis');
    } else if (course.title.includes('MOCK TEST') || course.title.includes('ASSESSMENT')) {
      categorySet.add('Assessment');
    } else if (course.title.includes('TCS') || course.title.includes('COGNIZANT') || 
               course.title.includes('ACCENTURE') || course.title.includes('WIPRO') || 
               course.title.includes('INFOSYS') || course.title.includes('HCL')) {
      categorySet.add('Company Specific');
    } else {
      categorySet.add('General');
    }
  });
  return ['All Courses', ...Array.from(categorySet).sort()];
};

const categories = extractCategories(coursesData);

 const recentCourses = [
   {
     img: "/assets/images/blog/recent-blog/pic1.jpg",
    title: "Introduction InstaIQ",
    price: "₹120",
    oldPrice: "₹190",
    provider: "Insta iQ",
  },
     {
     img: "/assets/images/blog/recent-blog/pic3.jpg",
    title: "English For Tomorrow",
    price: "Free",
    oldPrice: null,
    provider: "Insta Education",
  },
];

const COURSES_PER_PAGE = 6;

const Courses = () => {
  const { courses: adminCourses } = useAdmin();
  const { dispatch } = useAppContext();
  const [allFetchedCourses, setAllFetchedCourses] = useState([]); // Stores all courses from API
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Courses");
  const [page, setPage] = useState(1);

  // Use courses from AdminContext for real-time updates
  useEffect(() => {
    setLoading(true);
    console.log("Courses page - Admin courses:", adminCourses);
    if (adminCourses && adminCourses.length > 0) {
      // Map admin courses to display format
      const mappedCourses = adminCourses.map(course => ({
        _id: course._id,
        img: course.imageUrl,
        imageUrl: course.imageUrl, // Keep both for compatibility
        title: course.title,
        provider: "Insta Education",
        price: course.price === 0 ? "Free" : `₹${course.price.toLocaleString()}`,
        oldPrice: null,
        membership: course.price > 0,
        badge: course.price === 0 ? "FREE" : "Included in Membership",
        rating: course.rating,
        ratingsCount: course.enrollments,
        description: course.description,
      }));
      setAllFetchedCourses(mappedCourses);
    } else {
      // Fallback to static data
      setAllFetchedCourses(coursesData.map((course, idx) => ({ 
        ...course, 
        _id: idx,
        imageUrl: course.img // Add imageUrl for consistency
      })));
    }
    setLoading(false);
  }, [adminCourses]); // Re-run when admin courses change

  // Filter courses by search and category (now based on fetched data)
  const filteredCourses = allFetchedCourses.filter(
    (course) => {
      const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase());
      
      if (selectedCategory === "All Courses") {
        return matchesSearch;
      }
      
      // Category-specific filtering logic
      const matchesCategory = (() => {
        switch (selectedCategory) {
          case 'Aptitude':
            return course.title.includes('PLACEMENT') || course.title.includes('APTITUDE');
          case 'Data Analysis':
            return course.title.includes('EXCEL') || course.title.includes('DATA');
          case 'Assessment':
            return course.title.includes('MOCK TEST') || course.title.includes('ASSESSMENT');
          case 'Company Specific':
            return course.title.includes('TCS') || course.title.includes('COGNIZANT') || 
                   course.title.includes('ACCENTURE') || course.title.includes('WIPRO') || 
                   course.title.includes('INFOSYS') || course.title.includes('HCL');
          case 'General':
            return !course.title.includes('PLACEMENT') && !course.title.includes('APTITUDE') &&
                   !course.title.includes('EXCEL') && !course.title.includes('DATA') &&
                   !course.title.includes('MOCK TEST') && !course.title.includes('ASSESSMENT') &&
                   !course.title.includes('TCS') && !course.title.includes('COGNIZANT') &&
                   !course.title.includes('ACCENTURE') && !course.title.includes('WIPRO') &&
                   !course.title.includes('INFOSYS') && !course.title.includes('HCL');
          default:
            return true;
        }
      })();
      
      return matchesSearch && matchesCategory;
    }
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredCourses.length / COURSES_PER_PAGE);
  const paginatedCourses = filteredCourses.slice(
    (page - 1) * COURSES_PER_PAGE,
    page * COURSES_PER_PAGE
  );

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setPage(1); // Reset to first page on category change
  };

  return (
    <div className="page-content bg-white">
      {/* Banner */}
      <div
        className="page-banner ovbl-dark"
        style={{ backgroundImage: "url(assets/images/banner/banner3.jpg)" }}
      >
        <div className="container">
          <div className="page-banner-entry">
            <h1 className="text-white">Our Courses</h1>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="content-block">
        <div className="section-area section-sp1">
          <div className="container">
            <div className="row">
                             {/* Search and Filter Section */}
               <div className="col-12 m-b30">
                 <div className="row align-items-end">
                                       <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                      <div className="widget courses-search-bx placeani">
                        <div className="form-group">
                          <div className="input-group">
                            <label style={{ 
                              position: 'absolute', 
                              top: '-20px', 
                              left: '0', 
                              fontSize: '14px', 
                              color: '#fff',
                              zIndex: 1,
                              backgroundColor: 'transparent'
                            }}>
                              Search Courses
                            </label>
                            <input
                              name="dzName"
                              type="text"
                              className="form-control"
                              placeholder="Search for courses..."
                              value={search}
                              onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1); // Reset to first page on search
                              }}
                              style={{
                                backgroundColor: '#2a2a2a',
                                border: '1px solid #444',
                                color: '#fff',
                                padding: '12px 15px',
                                borderRadius: '8px'
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                   <div className="col-lg-8 col-md-6 col-sm-12 mb-3">
                     <div className="widget widget_archive">
                       <h5 className="widget-title style-1">Filter by Category</h5>
                       <div className="d-flex flex-wrap gap-2">
                         {categories.map((cat) => (
                           <button
                             key={cat}
                             className={`btn ${selectedCategory === cat ? "btn-primary" : "btn-outline-primary"} btn-sm`}
                             onClick={() => handleCategoryClick(cat)}
                             style={{ marginBottom: '5px' }}
                           >
                             {cat}
                           </button>
                         ))}
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
              {/* Course Grid */}
              <div className="col-12">
                <div className="row">
                  {loading ? (
                    <div className="col-12 text-center text-muted">Loading courses...</div>
                  ) : error ? (
                    <div className="col-12 text-center text-danger">{error}</div>
                  ) : paginatedCourses.length === 0 ? (
                    <div className="col-12 text-center text-muted">No courses found matching your criteria.</div>
                  ) : (
                    paginatedCourses.map((course) => (
                      <div className="col-md-6 col-lg-4 col-sm-6 m-b30" key={course._id}> {/* Use _id for key */}
                        <div className="cours-bx d-flex flex-column h-100" style={{
                          minHeight: 350,
                          background: '#1e1e1e !important',
                          borderRadius: 12,
                          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                          overflow: 'hidden', // Ensure border-radius clips image
                          border: '1px solid #333'
                        }}>
                          <div style={{ background: '#1e1e1e' }}>
                            <div style={{ position: "relative" }}>
                                                             <img
                                 src={course.imageUrl || course.img || "/assets/images/courses/course1.jpg"}
                                 alt={course.title}
                                 className="card-img-top"
                                 style={{ borderTopLeftRadius: 16, borderTopRightRadius: 16, height: 180, objectFit: "cover" }}
                                 onError={(e) => {
                                   e.target.src = "/assets/images/courses/course1.jpg";
                                 }}
                               />
                              {course.membership && (
                                <span style={{ position: "absolute", top: 12, left: 12, background: "#e67e22", color: "#fff", borderRadius: 6, padding: "2px 10px", fontSize: 13 }}>
                                  {course.badge}
                                </span>
                              )}
                              {course.badge === "FREE" && (
                                <span style={{ position: "absolute", top: 12, right: 12, background: "#27ae60", color: "#fff", borderRadius: 6, padding: "2px 10px", fontSize: 13 }}>
                                  {course.badge}
                                </span>
                              )}
                            </div>
                            <div className="card-body" style={{ padding: '16px', flexGrow: 1, background: '#1e1e1e !important' }}>
                              <h5 className="card-title" style={{ fontWeight: 500, fontSize: 18, minHeight: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                                <Link to={`/course-details/${course._id}`} style={{ color: '#fff' }}>{course.title}</Link> {/* Use _id for Link */}
                              </h5>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: "#bbb", fontSize: 15 }}>
                                <span>{course.provider}</span>
                                {course.rating && (
                                  <div className="rating-bx" style={{ display: 'flex', alignItems: 'center' }}>
                                    <ul className="media-post" style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', alignItems: 'center' }}>
                                      {Array.from({ length: 5 }).map((_, i) => (
                                        <li key={i}><i className={`fa fa-star${i < course.rating ? '' : '-o'}`} style={{ color: '#f3b632', marginRight: 2, fontSize: 12 }}></i></li>
                                      ))}
                                      <li style={{ marginLeft: 5, fontSize: 12, color: '#bbb' }}>({course.ratingsCount})</li>
                                    </ul>
                                  </div>
                                )}
                              </div>
                              <div style={{ fontWeight: 600, fontSize: 18, marginTop: 8, color: '#fff' }}>
                                {course.oldPrice && <span style={{ textDecoration: "line-through", color: "#888", marginRight: 8 }}>{course.oldPrice}</span>}
                                {course.price}
                              </div>
                            </div>
                          </div>
                                                     <div style={{ marginTop: "auto", padding: '0 16px 16px 16px', background: '#1e1e1e !important' }}>
                                                           <Link to={`/course-details/${course._id}`} className="btn w-100" style={{ 
                                borderRadius: 10,
                                minWidth: 120,
                                minHeight: 40,
                                fontWeight: 600,
                                border: 'none',
                                background: '#2563eb',
                                color: '#fff',
                                transition: 'background 0.2s',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                                display: 'inline-block',
                                textTransform: 'none'
                              }}>
                                Buy Now
                              </Link>
                           </div>
                        </div>
                      </div>
                    ))
                  )}
                  {/* Pagination (dynamic) */}
                  {totalPages > 1 && (
                    <div className="col-lg-12 m-b20">
                      <div className="pagination-bx rounded-sm gray clearfix">
                        <ul className="pagination">
                          <li className={`previous${page === 1 ? " disabled" : ""}`}>
                            <button onClick={() => setPage(page - 1)} disabled={page === 1} style={{ background: "none", border: "none" }}>
                              <i className="ti-arrow-left"></i> Prev
                            </button>
                          </li>
                          {Array.from({ length: totalPages }).map((_, i) => (
                            <li key={i} className={page === i + 1 ? "active" : ""}>
                              <button onClick={() => setPage(i + 1)} style={{ background: "none", border: "none" }}>{i + 1}</button>
                            </li>
                          ))}
                          <li className={`next${page === totalPages ? " disabled" : ""}`}>
                            <button onClick={() => setPage(page + 1)} disabled={page === totalPages} style={{ background: "none", border: "none" }}>
                              Next <i className="ti-arrow-right"></i>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* End Course Grid */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
