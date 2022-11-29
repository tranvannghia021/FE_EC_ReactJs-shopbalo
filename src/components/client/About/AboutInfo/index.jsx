import React from 'react';
import GoogleMap from '../GoogleMap';

const AboutInfo = ({ aboutData }) => {
  return (
    <>
      {aboutData.length > 0 &&
        aboutData.map((item, index) => (
          <div className="row p-b-148" key={item.id}>
            <div className={`col-md-7 col-lg-8 ${item.isRight ? '' : 'order-md-2'}`}>
              <div className="p-t-7 p-r-85 p-r-15-lg p-r-0-md">
                <h3 className="mtext-111 cl2 p-b-16">{item.title}</h3>
                {item.content.length > 0 &&
                  item.content.map((ob, index) => (
                    <p key={index} className="stext-113 cl6 p-b-26 fs-5">
                      {ob}
                    </p>
                  ))}
              </div>
            </div>

            <div className={`col-11 col-md-5 col-lg-4 m-lr-auto ${item.isRight ? '' : 'order-md-1'}`}>
              {!item.isMap ? (
                <div
                  className={`${item.isRight ? 'how-bor1' : 'how-bor2'} `}
                  style={{ width: '25rem', height: '20rem' }}
                >
                  <div className="hov-img0">
                    <img src={item.image} alt="IMG" style={{ width: '25rem', height: '20rem' }} />
                  </div>
                </div>
              ) : (
                <GoogleMap style={{ width: '50rem', height: '20rem', marginLeft: '-20rem' }} />
              )}
            </div>
          </div>
        ))}
    </>
  );
};

export default AboutInfo;
