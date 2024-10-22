import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import './DetailCompany.scss';
import companyAPI from "../api/companyAPI";

const DetailCompany = () => {
  const { companyId } = useParams();
  const [companyDetail, setCompanyDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyDetail = async () => {
      try {
        const response = await companyAPI.getCompanyDetails(companyId);
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
  // Tính tổng số đánh giá và số lượng từng loại đánh giá
  const totalReviews = companyDetail.ratingStatistics.reduce((acc, stat) => acc + stat.count, 0);
  const fiveStarCount = companyDetail.ratingStatistics.find(stat => stat.rating === 5)?.count || 0;
  const fourStarCount = companyDetail.ratingStatistics.find(stat => stat.rating === 4)?.count || 0;
  const threeStarCount = companyDetail.ratingStatistics.find(stat => stat.rating === 3)?.count || 0;
  const twoStarCount = companyDetail.ratingStatistics.find(stat => stat.rating === 2)?.count || 0;
  const oneStarCount = companyDetail.ratingStatistics.find(stat => stat.rating === 1)?.count || 0;
  return (
    <div className="container">
      <div className="main-content full-width"> 
        <div>
          <b>Chi Tiết Công Ty</b>
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
              <div className="button-container">
                <NavLink to={`/dashboard/appointmentform?companyId=${companyDetail.company_id}`}>
                  <button>Đặt lịch</button>
                </NavLink>
              </div>
            </div>

            <div className="info-section">
              <b style={{ fontSize: '16px' }}>{companyDetail.company_name} :</b>
              <p style={{ fontSize: '14px' }}>{companyDetail.service_cost} đ / giờ</p>
              <b style={{ fontSize: '16px' }}>Giới thiệu:</b>
              <p style={{ fontSize: '14px' }}>{companyDetail.description}</p>
              <b style={{ fontSize: '16px' }}>Dịch vụ:</b>
              <p style={{ fontSize: '14px' }}>{companyDetail.service}</p>
              <b style={{ fontSize: '16px' }}>Thời gian :</b>
              <p style={{ fontSize: '14px' }}>{companyDetail.worktime}</p>
              <b style={{ fontSize: '16px' }}>Thông tin liên hệ:</b>
              <p style={{ fontSize: '14px' }}>Số điện thoại: {companyDetail.phone}</p>
              <p style={{ fontSize: '14px' }}>Địa chỉ: {companyDetail.address}</p>
            </div>
          </div>

          <div className="reviews-and-contact">
            <div className="reviews">
              <h3 style={{ fontSize: '18px' }}>Đánh giá & Nhận xét</h3>
              <div className="rating-summary">
                <div className="rating-score">
                  <span className="score" style={{ fontSize: '24px' }}>
                    {companyDetail.ratingStatistics.reduce((acc, stat) => acc + (stat.rating * stat.count), 0) / totalReviews || 0}
                  </span>
                  <div className="star-rating" style={{ fontSize: '18px' }}>
                    <span>⭐⭐⭐⭐⭐</span>
                  </div>
                  <p style={{ fontSize: '12px' }}>{totalReviews} Verified Buyers</p>
                </div>
                <div className="rating-breakdown">
                  <div className="rating-bar" style={{ fontSize: '12px' }}>
                    <span>5 ⭐</span>
                    <div className="progress-bar">
                      <div className="fill" style={{ width: `${(fiveStarCount / totalReviews) * 100 || 0}%` }}></div>
                    </div>
                    <span>{fiveStarCount}</span>
                  </div>
                  <div className="rating-bar" style={{ fontSize: '12px' }}>
                    <span>4 ⭐</span>
                    <div className="progress-bar">
                      <div className="fill" style={{ width: `${(fourStarCount / totalReviews) * 100 || 0}%` }}></div>

                    </div>
                    <span>{fourStarCount}</span>
                  </div>
                  <div className="rating-bar" style={{ fontSize: '12px' }}>
                    <span>3 ⭐</span>
                    <div className="progress-bar">
                      <div className="fill" style={{ width: `${(threeStarCount / totalReviews) * 100 || 0}%` }}></div>
                    </div>
                    <span>{threeStarCount}</span>
                  </div>
                  <div className="rating-bar" style={{ fontSize: '12px' }}>
                    <span>2 ⭐</span>
                    <div className="progress-bar">
                      <div className="fill" style={{ width: `${(twoStarCount / totalReviews) * 100 || 0}%` }}></div>
                    </div>
                    <span>{twoStarCount}</span>
                  </div>
                  <div className="rating-bar" style={{ fontSize: '12px' }}>
                    <span>1 ⭐</span>
                    <div className="progress-bar">
                      <div className="fill" style={{ width: `${(oneStarCount / totalReviews) * 100 || 0}%` }}></div>
                    </div>
                    <span>{oneStarCount}</span>
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
export default DetailCompany;
