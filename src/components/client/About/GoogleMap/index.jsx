import React from 'react';

const GoogleMap = (props) => {
  return (
    <>
      <iframe
        {...props}
        src="https://maps.google.com/maps?width=600&amp;height=500&amp;hl=en&amp;q=đại học sài gòn&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
      ></iframe>
    </>
  );
};

export default GoogleMap;
