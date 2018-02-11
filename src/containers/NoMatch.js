import React from 'react';

export default ({location}) => {
  console.log(location);
  return (
    <div>
      <p>{location.pathname} Not Found 404</p>
    </div>
  )
}