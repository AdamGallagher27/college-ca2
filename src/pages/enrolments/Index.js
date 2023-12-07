import React, { useEffect, useState } from 'react'
import { getAllEnrolments } from '../../utilities/enrolments/enrolementsAPI'
import EnrolmentTable from '../../components/EnrolmentTable'
import useNotification from '../../utilities/useNotification'
import { useLocation, useNavigate } from 'react-router-dom'
import { catchSuccessParam } from '../../utilities/catchSuccessParam'
import NotificationBox from '../../components/NotificationBox'


const Index = () => {

  // state variable for enrolments
  const [enrolments, setEnrolments] = useState([])

  // current location / navigate function
  const location = useLocation();
  const navigate = useNavigate();

  // custom hook for showing success notifcation
  const { visible, text, showNotification } = useNotification()
  
  // on first load get all enrolments
  // if success message in url show success notification
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