import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAdmin } from "../context/AdminContext";

// Define your backend base URL from environment variables using import.meta.env
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";
console.log("Backend URL (Home Page):", import.meta.env.VITE_BACKEND_URL);

// Images (relative to public/assets/) - These are static assets, not from backend
const serviceImages = [
  "assets/images/our-services/pic1.jpg",
  "assets/images/our-services/pic2.jpg",
  "assets/images/our-services/pic3.jpg",
];

const eventImages = [
  "assets/images/event/pic4.jpg",
  "assets/images/event/pic3.jpg",
  "assets/images/event/pic2.jpg",
];
const testimonialImages = [
  "assets/images/testimonials/pic1.jpg",
  "assets/images/testimonials/pic2.jpg",
];
const newsImages = [
  "assets/images/blog/latest-blog/pic1.jpg",
  "assets/images/blog/latest-blog/pic2.jpg",
  "assets/images/blog/latest-blog/pic3.jpg",
];

export const allEvents = [
  {
    img: "assets/images/event/1.png",
    date: "15",
    month: "July",
    title: "AI in Career Guidance Workshop",
    time: "9:00am 10:00am",
    location: "Nagpur , India",
    desc: "An AI-driven system that recommends tailored study plans, practice tests, and resources based on user performance, role preferences , and career goals."
  },
  {
    img: "assets/images/event/2.png",
    date: "21",
    month: "August",
    title: "Resume Building Bootcamp ",
    time: "11:00am 12:00am",
    location: "Nagpur , India",
    desc: "An online tool to create professional resumes and is a hands-on workshop where participants learn how to create job-winning resumes tailored for campus  placements,with templates optimized for ATS."
  },
  {
    img: "assets/images/event/3.png",
    date: "29",
    month: "August",
    title: "Aptitude Mastery to Succeed in Competitive Exams",
    time: "9:00am 10:00am",
    location: "Nagpur , India",
    desc: "Specialized training modules focused on quantitative aptitude, logical reasoning, critical thinking and verbal ability to excel in campus placement tests and competitive exams."
  }
];

// Static fallback for popular courses
const popularCoursesData = [
  {
    img: "assets/images/courses/course1.jpg",
    title: "ALL INDIA PLACEMENT APTITUDE TEST",
    provider: "Insta iQ",
    price: "Free",
    oldPrice: null,
    badge: "FREE",
    _id: 1,
  },
  {
    img: "assets/images/courses/course2.jpg",
    title: "PLACEMENT APTITUDE COURSE",
    provider: "Insta Education",
    price: "₹6,999",
    oldPrice: "₹9,999",
    badge: "Included in Membership",
    _id: 2,
  },
  {
    img: "assets/images/courses/course3.jpg",
    title: "ADVANCE EXCEL & DATA ANALYSIS",
    provider: "Insta Education",
    price: "₹4,500",
    oldPrice: null,
    badge: "Included in Membership",
    _id: 3,
  },
];

const Home = () => {
  const { courses: adminCourses, events: adminEvents } = useAdmin();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use courses and events from AdminContext for real-time updates
  useEffect(() => {
    setLoading(true);
    if (adminCourses && adminCourses.length > 0) {
      // Map admin courses to display format and limit to 3 for homepage
      const mappedCourses = adminCourses
        .filter(course => course.status === 'active')
        .slice(0, 3) // Limit to only 3 courses for homepage
        .map(course => ({
          _id: course._id,
          img: course.imageUrl,
          title: course.title,
          provider: course.instructor || "Insta Education",
          price: course.price === 0 ? "Free" : `₹${course.price.toLocaleString()}`,
          oldPrice: null,
          badge: course.price === 0 ? "FREE" : "Included in Membership",
        }));
      setCourses(mappedCourses);
    } else {
      // Fallback to static data, limit to 3 courses
      setCourses(popularCoursesData.slice(0, 3));
    }
    setLoading(false);
  }, [adminCourses]);

  const homeBtnStyle = {
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
  };

  return (
    <div className="page-content bg-white">
      {/* Hero/Main Slider (static for now) */}
      <section className="rev-slider" style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ width: "100%", maxHeight: 500, position: "relative" }}>
          <img
            src="assets/images/slider/slide1.jpg"
            alt="Hero"
            style={{ width: "100%", maxHeight: 500, objectFit: "cover" }}
          />
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(2,0,11,0.6)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            zIndex: 2
          }}>
            <h2 style={{ fontSize: 50, fontWeight: 700 }}>Welcome To InstaIQ</h2>
            <h4 style={{ fontSize: 24, margin: "10px 0" }}>Master Placement Aptitude & Excel in Your Career</h4>
            <p style={{ maxWidth: 600, textAlign: "center" }}>
              Join thousands of students who have successfully cracked placement tests with our comprehensive aptitude courses, mock tests, and expert guidance.
            </p>
            <div style={{ marginTop: 20 }}>
              <Link to="/courses" className="btn radius-xl" style={{ ...homeBtnStyle, marginRight: 10 }}>BROWSE COURSES</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="section-area section-sp1 bg-fix online-cours" style={{ backgroundImage: "url(assets/images/background/bg1.png)", backgroundSize: "cover", position: "relative" }}>
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="mw800 m-auto">
            <div className="row">
              <div className="col-md-3 col-sm-6">
                <div className="cours-search-bx m-b30">
                  <div className="icon-box">
                    <h3><i className="ti-user"></i><span className="counter">65</span>K+</h3>
                  </div>
                  <span className="cours-search-text">Students Coached</span>
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="cours-search-bx m-b30">
                  <div className="icon-box">
                    <h3><i className="ti-users"></i><span className="counter">17</span>+</h3>
                  </div>
                  <span className="cours-search-text">Client Served</span>
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="cours-search-bx m-b30">
                  <div className="icon-box">
                    <h3><i className="ti-book"></i><span className="counter">10</span>K+</h3>
                  </div>
                  <span className="cours-search-text">Question Bank</span>
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="cours-search-bx m-b30">
                  <div className="icon-box">
                    <h3><i className="ti-layout-list-post"></i><span className="counter">1000</span>+</h3>
                  </div>
                  <span className="cours-search-text">Students Placed</span>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-center mt-5">
              <Link to="/about" className="btn radius-xl" style={{ 
                ...homeBtnStyle, 
                background: '#8B5CF6', 
                fontSize: '18px', 
                padding: '15px 30px',
                borderRadius: '25px',
                boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)'
              }}>
                KNOW ABOUT US
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="section-area section-sp2">
        <div className="container">
          <div className="row">
            <div className="col-md-12 heading-bx left">
              <h2 className="title-head">Upcoming <span>Events</span></h2>
              <p style={{ color: '#fff', fontSize: 18, marginBottom: 24 }}>Upcoming Education Events To Feed Brain.</p>
            </div>
          </div>
          <div className="row">
            {(adminEvents && adminEvents.length > 0 ? adminEvents.filter(e => e.status === 'upcoming').slice(0, 3) : allEvents).map((event, idx) => (
              <div className="col-md-4 col-sm-6" key={idx}>
                <div className="event-bx d-flex flex-column h-100" style={{ minHeight: 340, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#1e1e1e !important', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.07)', width: '100%' }}>
                  <div className="action-box" style={{ position: 'relative' }}>
                    <img src={event.img} alt={event.title} style={{ width: '100%', height: 150, objectFit: 'cover', borderTopLeftRadius: 12, borderTopRightRadius: 12, display: 'block' }} />
                  </div>
                  <div className="info-bx text-center" style={{ padding: 12, background: '#1e1e1e !important' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                      <div className="event-time" style={{ background: '#2563eb', color: '#fff', borderRadius: 8, padding: '8px 16px', marginRight: 10, minWidth: 60 }}>
                        <div className="event-date" style={{ fontSize: 24, fontWeight: 700 }}>{event.date}</div>
                        <div className="event-month" style={{ fontSize: 14 }}>{event.month}</div>
                      </div>
                      <div style={{ textAlign: 'left' }}>
                        <h5 style={{ fontWeight: 600, fontSize: 18, marginBottom: 6, color: '#fff' }}>{event.title}</h5>
                        <ul className="media-post" style={{ padding: 0, margin: 0, listStyle: 'none', fontSize: 13, color: '#bbb' }}>
                          <li style={{ display: 'inline', marginRight: 10 }}><i className="fa fa-clock-o"></i> {event.time}</li>
                          <li style={{ display: 'inline' }}><i className="fa fa-map-marker"></i> {event.location}</li>
                        </ul>
                  </div>
                    </div>
                                            <p style={{ color: '#bbb', fontSize: 15, marginTop: 8 }}>{event.description || event.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: 40 }}>
            <Link to="/events" className="btn" style={homeBtnStyle}>View All Events</Link>
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="section-area section-sp2 popular-courses-bx">
        <div className="container">
          <div className="row">
            <div className="col-md-12 heading-bx left">
              <h2 className="title-head">Popular <span>Courses</span></h2>
              <p style={{ color: '#fff', fontSize: 18, marginBottom: 24 }}>Master placement aptitude with our most popular courses designed by industry experts</p>
            </div>
          </div>
          <div className="row">
            {loading ? (
              <p>Loading courses...</p>
            ) : error ? (
              <p style={{ color: 'red' }}>{error}</p>
            ) : courses.length === 0 ? (
              <p>No courses available at the moment.</p>
            ) : (
              courses.map((course) => (
                <div className="col-md-4 col-sm-6 mb-4" key={course._id}>
                  <div className="cours-bx d-flex flex-column h-100" style={{
                    minHeight: 340,
                    background: '#1e1e1e !important',
                    borderRadius: 12,
                    boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
                    overflow: 'hidden'
                  }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#1e1e1e' }}>
                      <div className="action-box" style={{ position: 'relative' }}>
                        <img src={course.img} alt={course.title} style={{ width: '100%', height: 150, objectFit: 'cover' }} />
                        {course.badge && (
                          <span style={{
                            position: "absolute",
                            top: 12,
                            left: 12,
                            background: course.badge === "FREE" ? "#27ae60" : "#e67e22",
                            color: "#fff",
                            borderRadius: 6,
                            padding: "2px 10px",
                            fontSize: 13,
                            zIndex: 2
                          }}>
                            {course.badge}
                          </span>
                        )}
                      </div>
                      <div className="info-bx text-center" style={{ padding: '12px', flexGrow: 1, background: '#1e1e1e !important' }}>
                        <h5 style={{ fontWeight: 600, fontSize: 18, marginBottom: 6, minHeight: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                          <Link to={`/course-details/${course._id}`} style={{ color: '#fff' }}>{course.title}</Link>
                        </h5>
                        <span style={{ color: '#bbb', fontSize: 15 }}>{course.provider}</span>
                      </div>
                      <div className="price" style={{ margin: '0 12px 12px 12px', textAlign: 'center', fontWeight: 700, fontSize: 22, color: '#fff', background: '#1e1e1e !important' }}>
                        {course.oldPrice && <del style={{ color: '#888', marginRight: 8, fontSize: 16 }}>{course.oldPrice}</del>}
                        <span>{course.price}</span>
                      </div>
                    </div>
                    <div className="d-flex flex-column align-items-center" style={{ padding: '0 12px 12px 12px', background: '#1e1e1e !important' }}>
                      <Link to={`/course-details/${course._id}`} className="btn" style={{ ...homeBtnStyle, width: '100%', margin: 0, borderRadius: 10, textAlign: 'center' }}>Read More</Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="text-center" style={{ marginTop: 40 }}>
            <Link to="/courses" className="btn" style={homeBtnStyle}>View All Courses</Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-area section-sp2 bg-fix ovbl-dark" style={{ backgroundImage: "url(assets/images/background/bg1.jpg)", backgroundSize: "cover" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-white heading-bx left">
              <h2 className="title-head text-uppercase">what people <span>say</span></h2>
              <p>Hear from our clients and students about their experience with InstaIQ</p>
                  </div>
                </div>
          <div className="row">
            {/* Client Feedback Carousel */}
            <div className="col-md-6">
              <div className="testimonial-section">
                <h3 className="text-white text-center mb-4" style={{ fontSize: '24px', fontWeight: '600' }}>Client Feedback</h3>
                <div className="testimonial-carousel">
                  <div className="testimonial-bx" style={{ background: 'rgba(30, 30, 30, 0.9)', borderRadius: '12px', padding: '25px', margin: '10px', border: '1px solid #333' }}>
                    <div className="testimonial-thumb text-center mb-3">
                      <img src="assets/images/testimonials/pic1.jpg" alt="Client" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }} />
            </div>
                    <div className="testimonial-info text-center mb-3">
                      <h5 className="name text-white" style={{ fontSize: '18px', fontWeight: '600' }}>Sarah Johnson</h5>
                      <p className="text-muted">- HR Manager, TechCorp</p>
          </div>
                    <div className="testimonial-content">
                      <p className="text-white" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                        "InstaIQ has transformed our hiring process. The quality of candidates we receive now is exceptional. Their aptitude training programs are industry-leading."
                      </p>
                </div>
              </div>
                  
                  <div className="testimonial-bx" style={{ background: 'rgba(30, 30, 30, 0.9)', borderRadius: '12px', padding: '25px', margin: '10px', border: '1px solid #333' }}>
                    <div className="testimonial-thumb text-center mb-3">
                      <img src="assets/images/testimonials/pic2.jpg" alt="Client" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }} />
                    </div>
                    <div className="testimonial-info text-center mb-3">
                      <h5 className="name text-white" style={{ fontSize: '18px', fontWeight: '600' }}>Michael Chen</h5>
                      <p className="text-muted">- Director, Innovation Labs</p>
                  </div>
                    <div className="testimonial-content">
                      <p className="text-white" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                        "We've been partnering with InstaIQ for over 2 years. Their students consistently demonstrate strong problem-solving skills and technical aptitude."
                      </p>
                </div>
              </div>
                  
                  <div className="testimonial-bx" style={{ background: 'rgba(30, 30, 30, 0.9)', borderRadius: '12px', padding: '25px', margin: '10px', border: '1px solid #333' }}>
                    <div className="testimonial-thumb text-center mb-3">
                      <img src="assets/images/testimonials/pic3.jpg" alt="Client" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }} />
                    </div>
                    <div className="testimonial-info text-center mb-3">
                      <h5 className="name text-white" style={{ fontSize: '18px', fontWeight: '600' }}>Emily Rodriguez</h5>
                      <p className="text-muted">- CEO, StartupXYZ</p>
                  </div>
                    <div className="testimonial-content">
                      <p className="text-white" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                        "The candidates from InstaIQ are well-prepared and ready to contribute from day one. Their training methodology is truly effective."
                      </p>
                </div>
              </div>
            </div>
          </div>
        </div>
            
            {/* Student Feedback Carousel */}
            <div className="col-md-6">
              <div className="testimonial-section">
                <h3 className="text-white text-center mb-4" style={{ fontSize: '24px', fontWeight: '600' }}>Student Feedback</h3>
                <div className="testimonial-carousel">
                  <div className="testimonial-bx" style={{ background: 'rgba(30, 30, 30, 0.9)', borderRadius: '12px', padding: '25px', margin: '10px', border: '1px solid #333' }}>
                    <div className="testimonial-thumb text-center mb-3">
                      <img src="assets/images/testimonials/pic4.jpg" alt="Student" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }} />
            </div>
                    <div className="testimonial-info text-center mb-3">
                      <h5 className="name text-white" style={{ fontSize: '18px', fontWeight: '600' }}>Rahul Sharma</h5>
                      <p className="text-muted">- Placed at Google</p>
          </div>
                    <div className="testimonial-content">
                      <p className="text-white" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                        "InstaIQ's mock tests and practice questions were exactly what I needed. The structured approach helped me crack my dream job at Google!"
                      </p>
                      </div>
                    </div>
                  
                  <div className="testimonial-bx" style={{ background: 'rgba(30, 30, 30, 0.9)', borderRadius: '12px', padding: '25px', margin: '10px', border: '1px solid #333' }}>
                    <div className="testimonial-thumb text-center mb-3">
                      <img src="assets/images/testimonials/pic5.jpg" alt="Student" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }} />
                  </div>
                    <div className="testimonial-info text-center mb-3">
                      <h5 className="name text-white" style={{ fontSize: '18px', fontWeight: '600' }}>Priya Patel</h5>
                      <p className="text-muted">- Placed at Microsoft</p>
                </div>
                    <div className="testimonial-content">
                      <p className="text-white" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                        "The aptitude training at InstaIQ is world-class. The instructors are amazing and the question bank is comprehensive. Highly recommended!"
                      </p>
          </div>
        </div>
                  
                  <div className="testimonial-bx" style={{ background: 'rgba(30, 30, 30, 0.9)', borderRadius: '12px', padding: '25px', margin: '10px', border: '1px solid #333' }}>
                    <div className="testimonial-thumb text-center mb-3">
                      <img src="assets/images/testimonials/pic6.jpg" alt="Student" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }} />
            </div>
                    <div className="testimonial-info text-center mb-3">
                      <h5 className="name text-white" style={{ fontSize: '18px', fontWeight: '600' }}>Amit Kumar</h5>
                      <p className="text-muted">- Placed at Amazon</p>
                  </div>
                  <div className="testimonial-content">
                      <p className="text-white" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                        "From struggling with aptitude tests to acing them - InstaIQ made it possible. The personalized guidance and practice material are excellent."
                      </p>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
