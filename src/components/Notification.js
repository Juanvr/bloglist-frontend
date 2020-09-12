import React from 'react'


const Notification = ({ notification }) => {

    const notificationStyle = {
        color: 'red',
        background: '#ffef96',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10, 
        marginBottom: 10
    }

    if (!notification.error){
        notificationStyle.color = '#50394c';
    }

    if (notification.message === null) {
      return null
    }
  
    return (
      <div style={notificationStyle}>
        {notification.message}
      </div>
    )
  }

  export default Notification;