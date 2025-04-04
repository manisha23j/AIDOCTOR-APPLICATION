import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import axios from "axios";
import { Button, Col, DatePicker, Row, TimePicker } from "antd";
import { toast } from "react-hot-toast";
import dayjs from "dayjs";
import booking from "../booking.png"

function BookAppointment() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const dispatch = useDispatch();

  const getDoctorData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/doctor/get-doctor-info-by-doctor-id",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setDoctor(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const bookNow = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        setIsAvailable(false);
        navigate('/appointments')
      }
    } catch (error) {
      toast.error("Something went wrong!");
      dispatch(hideLoading());
    }
  };

  const checkAvailability = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/check-booking-availability",
        {
          doctorId: params.doctorId,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        setIsAvailable(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getDoctorData();
  }, []);

  return (
    <Layout>
      {doctor && (
        <div>
          <h1 className="page-title">
            {doctor.firstName} {doctor.lastName}
          </h1>
          <hr />
          <Row gutter={20} className="mt-5" align="middle">
          <Col span={8} sm={24} xs={24} lg={9}>
              <img src={booking} alt="bookingImg" width="100%" height="450"/>
          </Col>
          <Col span={8} sm={24} xs={24} lg={4}></Col>
            <Col span={8} sm={24} xs={24} lg={8}>
              <h1 className="normal-text">
                <b>Timings: </b>
                {doctor.timings[0]} - {doctor.timings[1]}
                <hr/>
              </h1>
                <p>
                  <b>Specialization:  </b>
                  {doctor.specialization}
                </p>
                <p>
                  <b>Phone No:  </b>
                  {doctor.phoneNumber}
                </p>
                <p>
                  <b>Address:  </b>
                  {doctor.address}
                </p>
                <p>
                  <b>Fee per visit (Rs):  </b>
                  {doctor.feePerConsultation}
                </p>
                <p>
                  <b>Experience (Yrs):  </b>
                  {doctor.experience}
                </p>
              <div className="d-flex flex-column pt-2">
                <DatePicker
                  format="DD-MM-YYYY"
                  onChange={(value) => {
                    setDate(dayjs(value).format("DD-MM-YYYY"));
                    setIsAvailable(false);
                  }}
                />
                <TimePicker
                  format="HH:mm"
                  className="mt-3"
                  onChange={(value) => {
                    setTime(dayjs(value).format("HH:mm"));
                    setIsAvailable(false);
                  }}
                />
                {!isAvailable && <Button
                  className="primary-button mt-3"
                  onClick={checkAvailability}
                >
                  Check Availability
                </Button>}
                
                {isAvailable && (
                  <Button className="primary-button mt-3" onClick={bookNow}>
                    Book Now
                  </Button>
                )}
              </div>
            </Col>
            
          </Row>
        </div>
      )}
    </Layout>
  );
}

export default BookAppointment;
