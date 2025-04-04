import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Layout from '../../components/Layout'
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import axios from "axios";
import { Table } from 'antd';
import dayjs from 'dayjs';
import { toast } from 'react-hot-toast';

function DoctorAppointments() {
    const dispatch = useDispatch();
    const [appointments, setAppointments] = useState([]);

    
    const getAppointmentData = async() =>{
        try {
            dispatch(showLoading());
            const response = await axios.get("/api/doctor/get-appointments-by-doctor-id", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            dispatch(hideLoading());

            if(response.data.success){
                setAppointments(response.data.data);
            }
        } catch (error) {
            dispatch(hideLoading());
        }
    };
    
    useEffect(()=>{
        getAppointmentData();
    },[]);
    
    const changeAppointmentStatus = async(record, status) =>{
        try {
            dispatch(showLoading());
            const response = await axios.post("/api/doctor/change-appointment-status",{ appointmentId: record._id, status: status}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            dispatch(hideLoading());

            if(response.data.success){
                toast.success(response.data.message)
                getAppointmentData();
            }
        } catch (error) {
            toast.error("Error changing status")
            dispatch(hideLoading());
        }
    }
    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
        },
        {
            title: 'Patient',
            dataIndex: 'name',
            render: (text,record) => <span>{record.userInfo.name}</span>
        },
        {
            title: 'Phone',
            dataIndex: 'phoneNumber',
            render: (text,record) => <span>{record.doctorInfo.phoneNumber}</span>
        },
        {
            title: 'Date & Time',
            dataIndex: 'createdAt',
            render: (text,record) => <span>{dayjs(record.date).format("DD-MM-YYYY")} {dayjs(record.time).format("HH:mm")}</span>

        },
        {
            title: 'Status',
            dataIndex: 'status'
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text,record) =>(
                <div className='d-flex'>
                    {record.status === 'pending' && (
                        <div className='d-flex'>
                            <h1 className='anchor px-2' onClick={()=> changeAppointmentStatus(record, 'approved')}>Approve</h1>
                            <h1 className='anchor' onClick={()=> changeAppointmentStatus(record, 'blocked')}>Reject</h1>
                        </div>
                    )  
                    }
                </div>
            )
        },
    ]


  return (
    <Layout>
        <h1 className='page-title'>Appointments</h1>
        <hr/>
        <Table columns={columns} dataSource={appointments} />
    </Layout>
  )
}

export default DoctorAppointments