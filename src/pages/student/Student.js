import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Studenttable from '../../components/studenttable/Studenttable'
import './student.css'

const Student = () => {
    return (
        <div className="studentcontainer">
            <Navbar />
            <div className="students container">
                <Studenttable />
            </div>
        </div>
    )
}

export default Student
