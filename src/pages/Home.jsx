import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    title: "Webinar on Generative AI",
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
    img: "assets/images/event/6.png",
    date: "29",
    month: "October",
    title: "Communication Assessment",
    time: "7:00am 8:00am",
    location: "Nagpur , India",
    desc: "A dedicated assessment module offering comprehensive evaluation of communication skills, verbal ability, and presentation techniques, designed to be engaging, time-efficient, and progressively challenging for daily practice."
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
  const navigate = useNavigate();
  const { courses: adminCourses, events: adminEvents } = useAdmin();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Add CSS for smooth transitions
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .testimonial-bx {
        transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out !important;
      }
      .testimonial-bx.sliding {
        transform: translateY(-20px) !important;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Navigation handlers with scroll to top
  const handleNavigation = (path) => {
    scrollToTop();
    navigate(path);
  };
  
  // Testimonial carousel states
  const [clientCurrentIndex, setClientCurrentIndex] = useState(0);
  const [studentCurrentIndex, setStudentCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

     // Testimonial data
   const clientTestimonials = [
     {
       id: 1,
       name: "Sarah Johnson",
       role: "HR Manager, TechCorp",
       image: "assets/images/testimonials/pic1.jpg",
       content: "InstaIQ has transformed our hiring process. The quality of candidates we receive now is exceptional. Their aptitude training programs are industry-leading."
     },
     {
       id: 2,
       name: "Michael Chen",
       role: "Director, Innovation Labs",
       image: "assets/images/testimonials/pic2.jpg",
       content: "We've been partnering with InstaIQ for over 2 years. Their students consistently demonstrate strong problem-solving skills and technical aptitude."
     },
     {
       id: 3,
       name: "Emily Rodriguez",
       role: "CEO, StartupXYZ",
       image: "assets/images/testimonials/pic3.jpg",
       content: "The candidates from InstaIQ are well-prepared and ready to contribute from day one. Their training methodology is truly effective."
     },
     {
       id: 4,
       name: "David Wilson",
       role: "CTO, Digital Solutions",
       image: "assets/images/testimonials/pic1.jpg",
       content: "The technical aptitude of InstaIQ graduates is outstanding. They bring immediate value to our development teams."
     },
     {
       id: 5,
       name: "Lisa Thompson",
       role: "VP Engineering, TechFlow",
       image: "assets/images/testimonials/pic2.jpg",
       content: "InstaIQ's training methodology is revolutionary. Their students have exceptional problem-solving abilities."
     },
     {
       id: 6,
       name: "Robert Kim",
       role: "Head of Talent, InnovateCorp",
       image: "assets/images/testimonials/pic3.jpg",
       content: "We've seen a 40% improvement in candidate quality since partnering with InstaIQ. Their programs are game-changing."
     }
   ];

     const studentTestimonials = [
     {
       id: 1,
       name: "Rahul Sharma",
       role: "Placed at Google",
       image: "assets/images/testimonials/pic4.jpg",
       content: "InstaIQ's mock tests and practice questions were exactly what I needed. The structured approach helped me crack my dream job at Google!"
     },
     {
       id: 2,
       name: "Priya Patel",
       role: "Placed at Microsoft",
       image: "assets/images/testimonials/pic5.jpg",
       content: "The aptitude training at InstaIQ is world-class. The instructors are amazing and the question bank is comprehensive. Highly recommended!"
     },
     {
       id: 3,
       name: "Amit Kumar",
       role: "Placed at Amazon",
       image: "assets/images/testimonials/pic6.jpg",
       content: "From struggling with aptitude tests to acing them - InstaIQ made it possible. The personalized guidance and practice material are excellent."
     },
     {
       id: 4,
       name: "Neha Singh",
       role: "Placed at Apple",
       image: "assets/images/testimonials/pic4.jpg",
       content: "InstaIQ's systematic approach to aptitude preparation was exactly what I needed. The practice tests are incredibly realistic."
     },
     {
       id: 5,
       name: "Vikram Mehta",
       role: "Placed at Netflix",
       image: "assets/images/testimonials/pic5.jpg",
       content: "The quality of questions and explanations at InstaIQ is unmatched. It helped me build strong analytical skills."
     },
     {
       id: 6,
       name: "Anjali Desai",
       role: "Placed at Meta",
       image: "assets/images/testimonials/pic6.jpg",
       content: "InstaIQ's personalized learning path made all the difference. I went from average to exceptional in just 3 months."
     }
   ];

  // Carousel navigation functions
  const nextClient = () => {
    setClientCurrentIndex((prevIndex) => 
      prevIndex === clientTestimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevClient = () => {
    setClientCurrentIndex((prevIndex) => 
      prevIndex === 0 ? clientTestimonials.length - 1 : prevIndex - 1
    );
  };

  const nextStudent = () => {
    setStudentCurrentIndex((prevIndex) => 
      prevIndex === studentTestimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevStudent = () => {
    setStudentCurrentIndex((prevIndex) => 
      prevIndex === 0 ? studentTestimonials.length - 1 : prevIndex - 1
    );
  };

  // Auto-rotate carousels every 3 seconds with smooth transition
  useEffect(() => {
    const clientInterval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        nextClient();
        setIsAnimating(false);
      }, 300);
    }, 3000);

    const studentInterval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        nextStudent();
        setIsAnimating(false);
      }, 300);
    }, 3000);

    return () => {
      clearInterval(clientInterval);
      clearInterval(studentInterval);
    };
  }, [clientCurrentIndex, studentCurrentIndex]);

  // Apply sliding animation to all cards when isAnimating is true
  useEffect(() => {
    const allCards = document.querySelectorAll('.testimonial-bx');
    allCards.forEach(card => {
      if (isAnimating) {
        card.classList.add('sliding');
    } else {
        card.classList.remove('sliding');
    }
    });
  }, [isAnimating]);

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
              <button onClick={() => handleNavigation('/courses')} className="btn radius-xl" style={{ ...homeBtnStyle, marginRight: 10 }}>BROWSE COURSES</button>
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
              <button onClick={() => handleNavigation('/about')} className="btn radius-xl" style={{ 
                ...homeBtnStyle, 
                background: '#8B5CF6', 
                fontSize: '18px', 
                padding: '15px 30px',
                borderRadius: '25px',
                boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)'
              }}>
                KNOW ABOUT US
              </button>
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
            <button onClick={() => handleNavigation('/events')} className="btn" style={homeBtnStyle}>View All Events</button>
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
                           <button onClick={() => handleNavigation(`/course-details/${course._id}`)} style={{ color: '#fff', background: 'none', border: 'none', cursor: 'pointer', fontSize: 'inherit', fontWeight: 'inherit' }}>{course.title}</button>
                         </h5>
                        <span style={{ color: '#bbb', fontSize: 15 }}>{course.provider}</span>
                      </div>
                      <div className="price" style={{ margin: '0 12px 12px 12px', textAlign: 'center', fontWeight: 700, fontSize: 22, color: '#fff', background: '#1e1e1e !important' }}>
                        {course.oldPrice && <del style={{ color: '#888', marginRight: 8, fontSize: 16 }}>{course.oldPrice}</del>}
                        <span>{course.price}</span>
                      </div>
                    </div>
                                         <div className="d-flex flex-column align-items-center" style={{ padding: '0 12px 12px 12px', background: '#1e1e1e !important' }}>
                       <button onClick={() => handleNavigation(`/course-details/${course._id}`)} className="btn" style={{ ...homeBtnStyle, width: '100%', margin: 0, borderRadius: 10, textAlign: 'center' }}>Buy Now</button>
                     </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="text-center" style={{ marginTop: 40 }}>
            <button onClick={() => handleNavigation('/courses')} className="btn" style={homeBtnStyle}>View All Courses</button>
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
                <h3 className="text-white text-center" style={{ fontSize: '24px', fontWeight: '600', marginBottom: '0px' }}>Client Feedback</h3>
                <div className="testimonial-carousel" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  
                  {/* Testimonial Card Stack */}
                  <div style={{ position: 'relative', width: '80%', height: '400px' }}>
                    {/* Sixth Card (Bottom) */}
                    <div className="testimonial-bx" style={{ 
                      background: '#1e1e1e', 
                      borderRadius: '12px', 
                      padding: '25px', 
                      border: '1px solid #333',
                      width: '100%',
                      height: '280px',
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                      transform: 'translateY(100px) scale(0.75)',
                      zIndex: 1,
                      opacity: 0.2
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                        <img 
                          src={clientTestimonials[(clientCurrentIndex + 5) % clientTestimonials.length].image} 
                          alt="Client" 
                          style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', marginRight: '15px' }} 
                        />
                        <div>
                          <h5 className="name text-white" style={{ fontSize: '12px', fontWeight: '600', margin: 0, color: '#ffffff' }}>
                            {clientTestimonials[(clientCurrentIndex + 5) % clientTestimonials.length].name}
                          </h5>
                          <p style={{ margin: 0, fontSize: '10px', color: '#ffffff' }}>- {clientTestimonials[(clientCurrentIndex + 5) % clientTestimonials.length].role}</p>
                        </div>
                      </div>
                      <div className="testimonial-content">
                        <p style={{ fontSize: '10px', lineHeight: '1.3', textAlign: 'left', color: '#ffffff' }}>
                          "{clientTestimonials[(clientCurrentIndex + 5) % clientTestimonials.length].content}"
                        </p>
                      </div>
                    </div>

                    {/* Fifth Card */}
                    <div className="testimonial-bx" style={{ 
                      background: '#1e1e1e', 
                      borderRadius: '12px', 
                      padding: '25px', 
                      border: '1px solid #333',
                      width: '100%',
                      height: '280px',
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                      transform: 'translateY(80px) scale(0.8)',
                      zIndex: 2,
                      opacity: 0.3
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                        <img 
                          src={clientTestimonials[(clientCurrentIndex + 4) % clientTestimonials.length].image} 
                          alt="Client" 
                          style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', marginRight: '15px' }} 
                        />
                        <div>
                          <h5 className="name text-white" style={{ fontSize: '13px', fontWeight: '600', margin: 0, color: '#ffffff' }}>
                            {clientTestimonials[(clientCurrentIndex + 4) % clientTestimonials.length].name}
                          </h5>
                          <p style={{ margin: 0, fontSize: '11px', color: '#ffffff' }}>- {clientTestimonials[(clientCurrentIndex + 4) % clientTestimonials.length].role}</p>
                        </div>
                      </div>
                      <div className="testimonial-content">
                        <p style={{ fontSize: '11px', lineHeight: '1.3', textAlign: 'left', color: '#ffffff' }}>
                          "{clientTestimonials[(clientCurrentIndex + 4) % clientTestimonials.length].content}"
                        </p>
                      </div>
                    </div>

                    {/* Fourth Card */}
                    <div className="testimonial-bx" style={{ 
                      background: '#1e1e1e', 
                      borderRadius: '12px', 
                      padding: '25px', 
                      border: '1px solid #333',
                      width: '100%',
                      height: '280px',
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                      transform: 'translateY(60px) scale(0.85)',
                      zIndex: 3,
                      opacity: 0.4
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                        <img 
                          src={clientTestimonials[(clientCurrentIndex + 3) % clientTestimonials.length].image} 
                          alt="Client" 
                          style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', marginRight: '15px' }} 
                        />
                        <div>
                          <h5 className="name text-white" style={{ fontSize: '13px', fontWeight: '600', margin: 0, color: '#ffffff' }}>
                            {clientTestimonials[(clientCurrentIndex + 3) % clientTestimonials.length].name}
                          </h5>
                          <p style={{ margin: 0, fontSize: '11px', color: '#ffffff' }}>- {clientTestimonials[(clientCurrentIndex + 3) % clientTestimonials.length].role}</p>
                        </div>
                      </div>
                      <div className="testimonial-content">
                        <p style={{ fontSize: '11px', lineHeight: '1.3', textAlign: 'left', color: '#ffffff' }}>
                          "{clientTestimonials[(clientCurrentIndex + 3) % clientTestimonials.length].content}"
                        </p>
                  </div>
                </div>

                    {/* Third Card */}
                    <div className="testimonial-bx" style={{ 
                      background: '#1e1e1e', 
                      borderRadius: '12px', 
                      padding: '25px', 
                      border: '1px solid #333',
                      width: '100%',
                      height: '280px',
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                      transform: 'translateY(40px) scale(0.9)',
                      zIndex: 4,
                      opacity: 0.5
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                        <img 
                          src={clientTestimonials[(clientCurrentIndex + 2) % clientTestimonials.length].image} 
                          alt="Client" 
                          style={{ width: '45px', height: '45px', borderRadius: '50%', objectFit: 'cover', marginRight: '15px' }} 
                        />
                        <div>
                          <h5 className="name text-white" style={{ fontSize: '14px', fontWeight: '600', margin: 0, color: '#ffffff' }}>
                            {clientTestimonials[(clientCurrentIndex + 2) % clientTestimonials.length].name}
                          </h5>
                          <p style={{ margin: 0, fontSize: '12px', color: '#ffffff' }}>- {clientTestimonials[(clientCurrentIndex + 2) % clientTestimonials.length].role}</p>
            </div>
          </div>
                      <div className="testimonial-content">
                        <p style={{ fontSize: '12px', lineHeight: '1.4', textAlign: 'left', color: '#ffffff' }}>
                          "{clientTestimonials[(clientCurrentIndex + 2) % clientTestimonials.length].content}"
                        </p>
                      </div>
                  </div>

                    {/* Second Card */}
                    <div className="testimonial-bx" style={{ 
                      background: '#1e1e1e', 
                      borderRadius: '12px', 
                      padding: '25px', 
                      border: '1px solid #333',
                      width: '100%',
                      height: '280px',
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                      transform: 'translateY(20px) scale(0.95)',
                      zIndex: 5,
                      opacity: 0.7
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                        <img 
                          src={clientTestimonials[(clientCurrentIndex + 1) % clientTestimonials.length].image} 
                          alt="Client" 
                          style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', marginRight: '15px' }} 
                        />
                        <div>
                          <h5 className="name text-white" style={{ fontSize: '16px', fontWeight: '600', margin: 0, color: '#ffffff' }}>
                            {clientTestimonials[(clientCurrentIndex + 1) % clientTestimonials.length].name}
                          </h5>
                          <p style={{ margin: 0, fontSize: '14px', color: '#ffffff' }}>- {clientTestimonials[(clientCurrentIndex + 1) % clientTestimonials.length].role}</p>
                </div>
              </div>
                      <div className="testimonial-content">
                        <p style={{ fontSize: '13px', lineHeight: '1.5', textAlign: 'left', color: '#ffffff' }}>
                          "{clientTestimonials[(clientCurrentIndex + 1) % clientTestimonials.length].content}"
                        </p>
                      </div>
                  </div>

                    {/* Main Card (Current) */}
                    <div className="testimonial-bx" style={{ 
                      background: '#1e1e1e', 
                      borderRadius: '12px', 
                      padding: '25px', 
                      border: '1px solid #333',
                      width: '100%',
                      height: '280px',
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                      zIndex: 6,
                      boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
                      transform: 'translateY(0)',
                      transition: 'all 0.3s ease'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                        <img 
                          src={clientTestimonials[clientCurrentIndex].image} 
                          alt="Client" 
                          style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', marginRight: '15px' }} 
                        />
                        <div>
                          <h5 className="name text-white" style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: '#ffffff' }}>
                            {clientTestimonials[clientCurrentIndex].name}
                          </h5>
                          <p style={{ margin: 0, fontSize: '14px', color: '#ffffff' }}>- {clientTestimonials[clientCurrentIndex].role}</p>
                </div>
              </div>
                      <div className="testimonial-content">
                        <p style={{ fontSize: '14px', lineHeight: '1.6', textAlign: 'left', color: '#ffffff' }}>
                          "{clientTestimonials[clientCurrentIndex].content}"
                        </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

            {/* Student Feedback Carousel */}
            <div className="col-md-6">
              <div className="testimonial-section">
                <h3 className="text-white text-center" style={{ fontSize: '24px', fontWeight: '600', marginBottom: '0px' }}>Student Feedback</h3>
                <div className="testimonial-carousel" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  
                  {/* Testimonial Card Stack */}
                  <div style={{ position: 'relative', width: '80%', height: '400px' }}>
                    {/* Sixth Card (Bottom) */}
                    <div className="testimonial-bx" style={{ 
                      background: '#1e1e1e', 
                      borderRadius: '12px', 
                      padding: '25px', 
                      border: '1px solid #333',
                      width: '100%',
                      height: '280px',
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                      transform: 'translateY(100px) scale(0.75)',
                      zIndex: 1,
                      opacity: 0.2
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                        <img 
                          src={studentTestimonials[(studentCurrentIndex + 5) % studentTestimonials.length].image} 
                          alt="Student" 
                          style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', marginRight: '15px' }} 
                        />
                        <div>
                          <h5 className="name text-white" style={{ fontSize: '12px', fontWeight: '600', margin: 0, color: '#ffffff' }}>
                            {studentTestimonials[(studentCurrentIndex + 5) % studentTestimonials.length].name}
                          </h5>
                          <p style={{ margin: 0, fontSize: '10px', color: '#ffffff' }}>- {studentTestimonials[(studentCurrentIndex + 5) % studentTestimonials.length].role}</p>
                        </div>
                      </div>
                      <div className="testimonial-content">
                        <p style={{ fontSize: '10px', lineHeight: '1.3', textAlign: 'left', color: '#ffffff' }}>
                          "{studentTestimonials[(studentCurrentIndex + 5) % studentTestimonials.length].content}"
                        </p>
                      </div>
                    </div>

                    {/* Fifth Card */}
                    <div className="testimonial-bx" style={{ 
                      background: '#1e1e1e', 
                      borderRadius: '12px', 
                      padding: '25px', 
                      border: '1px solid #333',
                      width: '100%',
                      height: '280px',
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                      transform: 'translateY(80px) scale(0.8)',
                      zIndex: 2,
                      opacity: 0.3
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                        <img 
                          src={studentTestimonials[(studentCurrentIndex + 4) % studentTestimonials.length].image} 
                          alt="Student" 
                          style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', marginRight: '15px' }} 
                        />
                        <div>
                          <h5 className="name text-white" style={{ fontSize: '13px', fontWeight: '600', margin: 0, color: '#ffffff' }}>
                            {studentTestimonials[(studentCurrentIndex + 4) % studentTestimonials.length].name}
                          </h5>
                          <p style={{ margin: 0, fontSize: '11px', color: '#ffffff' }}>- {studentTestimonials[(studentCurrentIndex + 4) % studentTestimonials.length].role}</p>
            </div>
          </div>
                      <div className="testimonial-content">
                        <p style={{ fontSize: '11px', lineHeight: '1.3', textAlign: 'left', color: '#ffffff' }}>
                          "{studentTestimonials[(studentCurrentIndex + 4) % studentTestimonials.length].content}"
                        </p>
                  </div>
                      </div>

                    {/* Fourth Card */}
                    <div className="testimonial-bx" style={{ 
                      background: '#1e1e1e', 
                      borderRadius: '12px', 
                      padding: '25px', 
                      border: '1px solid #333',
                      width: '100%',
                      height: '280px',
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                      transform: 'translateY(60px) scale(0.85)',
                      zIndex: 3,
                      opacity: 0.4
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                        <img 
                          src={studentTestimonials[(studentCurrentIndex + 3) % studentTestimonials.length].image} 
                          alt="Student" 
                          style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', marginRight: '15px' }} 
                        />
                        <div>
                          <h5 className="name text-white" style={{ fontSize: '13px', fontWeight: '600', margin: 0, color: '#ffffff' }}>
                            {studentTestimonials[(studentCurrentIndex + 3) % studentTestimonials.length].name}
                          </h5>
                          <p style={{ margin: 0, fontSize: '11px', color: '#ffffff' }}>- {studentTestimonials[(studentCurrentIndex + 3) % studentTestimonials.length].role}</p>
                      </div>
                    </div>
                      <div className="testimonial-content">
                        <p style={{ fontSize: '11px', lineHeight: '1.3', textAlign: 'left', color: '#ffffff' }}>
                          "{studentTestimonials[(studentCurrentIndex + 3) % studentTestimonials.length].content}"
                        </p>
                  </div>
                </div>

                    {/* Third Card */}
                    <div className="testimonial-bx" style={{ 
                      background: '#1e1e1e', 
                      borderRadius: '12px', 
                      padding: '25px', 
                      border: '1px solid #333',
                      width: '100%',
                      height: '280px',
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                      transform: 'translateY(40px) scale(0.9)',
                      zIndex: 4,
                      opacity: 0.5
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                        <img 
                          src={studentTestimonials[(studentCurrentIndex + 2) % studentTestimonials.length].image} 
                          alt="Student" 
                          style={{ width: '45px', height: '45px', borderRadius: '50%', objectFit: 'cover', marginRight: '15px' }} 
                        />
                        <div>
                          <h5 className="name text-white" style={{ fontSize: '14px', fontWeight: '600', margin: 0, color: '#ffffff' }}>
                            {studentTestimonials[(studentCurrentIndex + 2) % studentTestimonials.length].name}
                          </h5>
                          <p style={{ margin: 0, fontSize: '12px', color: '#ffffff' }}>- {studentTestimonials[(studentCurrentIndex + 2) % studentTestimonials.length].role}</p>
              </div>
          </div>
                      <div className="testimonial-content">
                        <p style={{ fontSize: '12px', lineHeight: '1.4', textAlign: 'left', color: '#ffffff' }}>
                          "{studentTestimonials[(studentCurrentIndex + 2) % studentTestimonials.length].content}"
                        </p>
          </div>
        </div>

                    {/* Second Card */}
                    <div className="testimonial-bx" style={{ 
                      background: '#1e1e1e', 
                      borderRadius: '12px', 
                      padding: '25px', 
                      border: '1px solid #333',
                      width: '100%',
                      height: '280px',
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                      transform: 'translateY(20px) scale(0.95)',
                      zIndex: 5,
                      opacity: 0.7
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                        <img 
                          src={studentTestimonials[(studentCurrentIndex + 1) % studentTestimonials.length].image} 
                          alt="Student" 
                          style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', marginRight: '15px' }} 
                        />
                        <div>
                          <h5 className="name text-white" style={{ fontSize: '16px', fontWeight: '600', margin: 0, color: '#ffffff' }}>
                            {studentTestimonials[(studentCurrentIndex + 1) % studentTestimonials.length].name}
                          </h5>
                          <p style={{ margin: 0, fontSize: '14px', color: '#ffffff' }}>- {studentTestimonials[(studentCurrentIndex + 1) % studentTestimonials.length].role}</p>
                        </div>
                      </div>
                      <div className="testimonial-content">
                        <p style={{ fontSize: '13px', lineHeight: '1.5', textAlign: 'left', color: '#ffffff' }}>
                          "{studentTestimonials[(studentCurrentIndex + 1) % studentTestimonials.length].content}"
                        </p>
            </div>
          </div>

                    {/* Main Card (Current) */}
                    <div className="testimonial-bx" style={{ 
                      background: '#1e1e1e', 
                      borderRadius: '12px', 
                      padding: '25px', 
                      border: '1px solid #333',
                      width: '100%',
                      height: '280px',
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                      zIndex: 6,
                      boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
                      transform: 'translateY(0)',
                      transition: 'all 0.3s ease'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                        <img 
                          src={studentTestimonials[studentCurrentIndex].image} 
                          alt="Student" 
                          style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', marginRight: '15px' }} 
                        />
                        <div>
                          <h5 className="name text-white" style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: '#ffffff' }}>
                            {studentTestimonials[studentCurrentIndex].name}
                          </h5>
                          <p style={{ margin: 0, fontSize: '14px', color: '#ffffff' }}>- {studentTestimonials[studentCurrentIndex].role}</p>
                  </div>
                  </div>
                  <div className="testimonial-content">
                        <p style={{ fontSize: '14px', lineHeight: '1.6', textAlign: 'left', color: '#ffffff' }}>
                          "{studentTestimonials[studentCurrentIndex].content}"
                        </p>
                      </div>
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
