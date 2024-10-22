import React, { useState,useEffect } from "react";
import './DetailCompany.scss'
import { NavLink } from "react-router-dom";
import { Link, useNavigate,useLocation,useParams } from "react-router-dom";

import companyAPI from "../api/companyAPI";

const DetailCompany = () => {

  const [company,setCompany] = useState({});
  const {company_id} = useParams();
  console.log(company_id);
  const [ratings,setRatings] = useState({
    5:10,
    4:30,
    3:2,
    2:5,
    1:6
  })
  const handleSetRatings = (rat) =>{
      rat.array.forEach(r => {
        // setRatings({...ratings,})
        console.log(r)
        
      });

  }
  const fetchDetailCompany = async() => {
    try{
      const response = await companyAPI.getDetailCompany(company_id);
      console.log(response);
      setCompany(response.data);
      // if (response && response.data){
      //   handleSetRatings(response?.data?.ratingStatistics);
      // }  want set rating but bị undefined

    }
    catch(error){
      console.console.error("Error fetching detail company: ",error);
      
    }

  }
  useEffect(() => {
    fetchDetailCompany();
  }, []);

  console.log(company);



    return (
        <div className="container">
          <div className="main-content full-width"> 
            <div>
              <b>Chi Tiết Công Ty</b>
              <div className="company-details">
                <div className="image-section">
                  <img
                    src={company.main_image}
                    alt="product"
                    className="main-image"
                  />
                  <div className="thumbnail-section">
                    <img
                      src={company.image2}
                      alt="thumbnail"
                    />
                    <img
                      src={company.image3}
                      alt="thumbnail"
                    />
                    <img
                      src={company.image4}
                      alt="thumbnail"
                    />
                    <img
                      src={company.image5}
                      alt="thumbnail"
                    />
                  </div>
                  <div className="button-container">
                  <NavLink to='/dashboard/appointmentform?company_id=6'>
                    <button>Đặt lịch</button>
                  </NavLink>
                    
                  </div>
                </div>
                    
                <div className="info-section">
                  <b style={{ fontSize: '16px' }}>{company.name}</b>
                  <p style={{ fontSize: '14px' }}>{company.service_cost}đ / giờ</p>
                  <b style={{ fontSize: '16px' }}>Giới thiệu:</b>
                  <p style={{ fontSize: '14px' }}>
                    Chuyên cung cấp các dịch vụ vệ sinh dọn dẹp tận nhà
                  </p>
                  <b style={{ fontSize: '16px' }}>Dịch vụ:</b>
                  <p style={{ fontSize: '14px' }}>
                    Dịch vụ dọn nhà theo giờ ngày càng phổ biến và dường như đang trở thành xu hướng hiện nay. Tuy vậy vẫn còn một số chị em mơ hồ về loại hình dịch vụ này
                  </p>
                  
                  <b style={{ fontSize: '16px' }}>Thời gian :</b>
                  <p style={{ fontSize: '14px' }}>Khung giờ làm việc</p>
                  <b style={{ fontSize: '16px' }}>Thông tin liên hệ:</b>
                  <p style={{ fontSize: '14px' }}>Số điện thoại: {company.phone}</p>
                  <p style={{ fontSize: '14px' }}>Email: {company?.account?.email ?? "abc@gmail.com"}</p>
                  <p style={{ fontSize: '14px' }}>Địa chỉ: {company.address}</p>
                </div>
              </div>
              <div className="reviews-and-contact">
                <div className="reviews">
                  <h3 style={{ fontSize: '18px' }}>Đánh giá & Nhận xét</h3>
                  <div className="rating-summary">
                    <div className="rating-score">
                      <span className="score" style={{ fontSize: '24px' }}>5</span>
                      <div className="star-rating" style={{ fontSize: '18px' }}>
                        <span>⭐⭐⭐⭐⭐</span>
                      </div>
                      <p style={{ fontSize: '12px' }}>595 Verified Buyers</p>
                    </div>
                    <div className="rating-breakdown">

                      {Object.entries(ratings).map(([name,value])=>(


                       <div className="rating-bar" style={{ fontSize: '12px' }}>
                        <span>{name} ⭐</span>
                        <div className="progress-bar">
                          <div className="fill" style={{ width: '85%' }}></div>
                        </div>
                        <span>{value}</span>
                      </div>   
                      )

                      )}

                      
                      
                    </div>
                  </div>
                </div>
              </div>
    
            </div>
          </div>
        </div>
      );
    };
    

export default DetailCompany;