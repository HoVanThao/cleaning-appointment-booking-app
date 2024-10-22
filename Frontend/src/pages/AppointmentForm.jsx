import React, { useState, useEffect } from "react";
import "./AppointmentForm.scss"; 
import { Link, useNavigate,useLocation } from "react-router-dom";
import {toast,ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';


import RequestAPI from "../api/requestAPI";
const AppointmentForm = () => {
  
  const navigate = useNavigate();
  const storedUserInfo = localStorage.getItem("user_info");
    const user_id = storedUserInfo ? JSON.parse(storedUserInfo)?.user_id : "";

  
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  

  const [minDateTime,setMinDateTime] = useState('');

  const [textError, setTextError] = useState("");

  useEffect(()=>{
    const now = new Date();
    now.setHours(now.getHours()+7);
    now.setMinutes(now.getMinutes()+30);
    const formattedDateTime = now.toISOString().slice(0, 16);
    setMinDateTime(formattedDateTime); 
     
  },[]);


  
  const [formData, setFormData] = useState({
    workContent: "",
    notes: "",
    time: "",
    name: "",
    phoneNumber: "",
    location: "",
  });
  
  const fetchRequest = async(formData)=>{
    try{
      const res = await RequestAPI.createRequest(formData);
      const status = res.status;
      if (status ===201){
        console.log("Create request success!!!!")
        
        toast.success("Tạo cuộc hẹn thành công",{
          position:'top-right'
        });


        
      }
      console.log(res.data.message);
    }
    catch(error){
      console.error("Error fetch create request : ", error);
      toast.error("Tạo cuộc hẹn không thành công",{
        position:'top-right'
      });
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name==="phoneNumber")
      setTextError("")
  };


  

  const handleSubmit = (e) => {
    e.preventDefault();
    const phoneRegex = /^[0-9]{9,10}$/; 
    if (!phoneRegex.test(formData.phoneNumber)) {
      setTextError('Please enter a valid phone number (9 or 10 digits).');
      return; 
    }// check phoneNumber
    //convert formData to format body post api
    const postData = {
      user_id: user_id,
      company_id: queryParams.get('companyId'),

      name: formData.name,
      phone: formData.phoneNumber,
      address: formData.location,
      request_date: formData.time.split("T")[0],
      timejob: formData.time.replace("T"," ")+":00", 
      status: "PENDING",
      price: 100000,
      notes: formData.notes,
      request: formData.workContent, 
    };

    console.log(formData);
    console.log(postData);
    fetchRequest(postData);
  };

  return (
    <div>
      <h3 className="h3-header">Đặt lịch</h3>


      <ToastContainer />

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
                required
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
              {/* <ReactQuill id="notes" theme="snow" value={formData.notes} onChange={handleChange} /> */}
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
                min={minDateTime}
                required
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
                required
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
                required
              />
              {textError && <p style={{ color: 'red' }} className="error-text">{textError}</p>}
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
                required
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
