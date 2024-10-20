import React, { useState } from "react";
import "./AppointmentForm.scss"; 

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    workContent: "",
    notes: "",
    time: "",
    name: "",
    phoneNumber: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <div>
      <h3>Đặt lịch</h3>
      <div className="appointment-form">
        <form onSubmit={handleSubmit}>
          {/* Left Side - Time, Name, Phone, Address */}
          <div className="form-left">
            <div className="form-group">
              <label htmlFor="workContent">Nội dung công việc</label>
              <textarea
                id="workContent"
                name="workContent"
                value={formData.workContent}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="notes">Ghi chú</label>
              <div className="toolbar">
                <select>
                  <option value="normal">Normal</option>
                  <option value="heading1">Heading 1</option>
                  <option value="heading2">Heading 2</option>
                </select>

                <select>
                  <option value="sans-serif">Sans Serif</option>
                  <option value="serif">Serif</option>
                </select>

                <button className="toolbar-btn"><b>B</b></button>
                <button className="toolbar-btn"><i>I</i></button>
                <button className="toolbar-btn"><u>U</u></button>
                <button className="toolbar-btn"><s>S</s></button>

                <select>
                  <option value="normal">Normal</option>
                  <option value="bold">Bold</option>
                </select>
              </div>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>

          {/* Right Side - Work Content, Notes */}
          <div className="form-right">
            <div className="form-group-right">
              <label htmlFor="time">Thời gian</label>
              <input
                type="datetime-local"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="form-control-right"
              />
            </div>

            <div className="form-group-right">
              <label htmlFor="name">Tên</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control-right"
              />
            </div>

            <div className="form-group-right">
              <label htmlFor="phoneNumber">Số điện thoại</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="form-control-right"
              />
            </div>

            <div className="form-group-right">
              <label htmlFor="location">Địa chỉ</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="form-control-right"
              />
            </div>

            <button type="submit" className="submit-btn">
              Tạo lịch hẹn
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
