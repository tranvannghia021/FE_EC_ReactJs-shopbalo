/* eslint-disable no-lone-blocks */
import React from 'react';
import { aboutData, teamData } from '../../../asset/data/client/data_about_client';
import AboutInfo from '../../../components/client/About/AboutInfo';
import CardProfile from '../../../components/client/About/CardProfile';


export function AboutPage(props) {
  return (
    <section>
      <section className="bg0 p-t-75 p-b-120">
        <div className="container">
          <AboutInfo aboutData={aboutData} />
          <div>
            <div className="d-flex flex-column align-items-center">
              <h3 className="mtext-111 cl2 p-b-16 mb-4">Our Team</h3>

              <div className="d-flex justify-content-center gap-5">
                <CardProfile items={teamData} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
