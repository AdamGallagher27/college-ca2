import React, { useEffect, useState } from 'react'
import { getAllEnrolments } from '../../utilities/enrolments/enrolementsAPI'
import EnrolmentTable from '../../components/EnrolmentTable'
import useNotification from '../../utilities/useNotification'
import { useLocation, useNavigate } from 'react-router-dom'
import { catchSuccessParam } from '../../utilities/catchSuccessParam'
import NotificationBox from '../../components/NotificationBox'


const Index = () => {

  const [enrolments, setEnrolments] = useState([])
  const { visible, text, showNotification } = useNotification()
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    getAllEnrolments(setEnrolments)

    const urlParams = new URLSearchParams(location.search);
    const successParam = urlParams.get('success');

    if (successParam) {
      showNotification(catchSuccessParam(successParam), 3000)
      navigate('/enrolments')
    }
  }, [])

  if (enrolments.length === 0) return <>No Enrolments To Show</>

  return (
    <>
      <h1 className='hero text-3xl'>Enrolments</h1>
      <NotificationBox visible={visible} message={text} />
      <div className='hero'>
        <EnrolmentTable enrolments={enrolments} />
      </div>
    </>

  )
}

export default Index