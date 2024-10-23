import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import './DetailCompany.scss';
import companyAPI from "../api/companyAPI";
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

const DetailCompany = () => {
  const { companyId } = useParams();
  const [companyDetail, setCompanyDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCompanyDetail = async () => {
      try {
        const response = await companyAPI.getCompanyDetails(companyId);
        console.log("API response:", response.data);  // Log the API response
        setCompanyDetail(response.data);
      } catch (error) {
        console.error("Error fetching company details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyDetail();
  }, [companyId]);

  if (loading) return <p>Loading...</p>;
  if (!companyDetail) return <p>No company details available.</p>;

  const totalReviews = companyDetail.ratingStatistics.reduce((acc, stat) => acc + stat.count, 0);

  return (
    <div className="container">
      <div className="main-content full-width">
        <div>
          <h1><b>Chi Tiết Công Ty</b></h1>
          <div className="company-details">
            <div className="image-section">
              <img
                src={companyDetail.main_image}
                alt="company"
                className="main-image"
              />
              <div className="thumbnail-section">
                {companyDetail.image2 && <img src={companyDetail.image2} alt="thumbnail" />}
                {companyDetail.image3 && <img src={companyDetail.image3} alt="thumbnail" />}
                {companyDetail.image4 && <img src={companyDetail.image4} alt="thumbnail" />}
                {companyDetail.image5 && <img src={companyDetail.image5} alt="thumbnail" />}
              </div>
              <NavLink to={`/dashboard/appointmentform?companyId=${companyDetail.company_id}`}>
                <button className="button-booking">Đặt lịch</button>
              </NavLink>


            </div>


            <div className="info-section">
              <h2 style={{ fontSize: '30px', fontWeight: 'bold' }}>{companyDetail.company_name}</h2>
              <p  style={{ fontWeight: 'normal', color: '#555',marginLeft:'10px' }}> <FontAwesomeIcon icon={faMoneyBill} style={{ marginRight: '8px' }} /> <b>{companyDetail.service_cost} đ / giờ</b> </p>
              <br />
              <p><b>Giới thiệu:</b></p>
              <p style={{ fontWeight: 'normal', color: '#555',marginLeft:'10px' }}>{companyDetail.description}</p>
              <br />
              <p><b>Dịch vụ :</b></p>
              <p style={{ fontWeight: 'normal', color: '#555' ,marginLeft:'10px'}}>{companyDetail.service}</p>
              <br />
              <p><b>Thời gian làm việc:</b></p>
              <p> <FontAwesomeIcon icon={faCalendar} style={{ marginLeft: '10px' }} /> Khung giờ làm việc :</p>
              <p style={{ fontWeight: 'normal', color: '#555',marginLeft:'10px' }}>{companyDetail.worktime}</p>
              <br />

              <b>Thông tin liên hệ:</b> <br/>
              <br/> <p style={{ fontWeight: 'normal', color: '#555',marginLeft:'10px' }}><FontAwesomeIcon icon={faPhone} /> Số điện thoại: {companyDetail.phone}</p><br/>
              <p style={{ fontWeight: 'normal', color: '#555' ,marginLeft:'10px'}}><FontAwesomeIcon icon={faEnvelope} /> Email: {companyDetail.account.email}</p><br/>
              <p style={{ fontWeight: 'normal', color: '#555' ,marginLeft:'10px'}}><FontAwesomeIcon icon={faMapMarkerAlt} /> Địa chỉ: {companyDetail.address}</p><br/>


            </div>

          </div>

          <div className="reviews-section">
            <h3><b>Đánh Giá & Nhận Xét</b></h3>
            <div className="rating-summary">
              <div className="rating-score">
                <span className="score">{(companyDetail.ratingStatistics.reduce((acc, stat) => acc + (stat.rating * stat.count), 0) / totalReviews).toFixed(1)}</span>
                <div className="star-rating">
                  <span>⭐⭐⭐⭐⭐</span>
                </div>
                <p>{totalReviews} Lượt đánh giá</p>
              </div>

              <div className="rating-breakdown">
                {[5, 4, 3, 2, 1].map(rating => (
                  <div key={rating} className="rating-bar">
                    <span>{rating} ⭐</span>
                    <div className="progress-bar">
                      <div
                        className="fill"
                        style={{ width: `${(companyDetail.ratingStatistics.find(stat => stat.rating === rating)?.count || 0) / totalReviews * 100}%` }}
                      ></div>
                    </div>
                    <span>{companyDetail.ratingStatistics.find(stat => stat.rating === rating)?.count || 0}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DetailCompany;
