import React from 'react'

export const Alert = ({message}) => (
  <div className="alert alert-danger" role="alert">
    {message}
  </div>
)