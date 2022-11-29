
import { useEffect, useState } from 'react';
import { FaEnvelope, FaMapMarked, FaPhone } from 'react-icons/fa';
import SkeletonBanner from '../../../components/commons/Layouts/Skeleton/SkeletonBanner';
import SkeletonSlider from '../../../components/commons/Layouts/Skeleton/SkeletonSlider';


import './index.css';

function getWindowDimensions() {
    const { innerWidth: width } = window;

    return width;
}

export function ContactPage() {

    const [isLoading, setIsLoading] = useState(false);
    const [column, setColumn] = useState(2);


    useEffect(() => {
        window.addEventListener('resize', () => {
            const width = getWindowDimensions()
            console.log(width);
            width <= 730 ? setColumn(1) : setColumn(2);
        });
        const timer = setTimeout(() => {
            setIsLoading(true);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <div className="wrapper">
                {
                    isLoading ? (<div className="banner">
                        <p >contact</p>
                    </div>) : (<SkeletonSlider isShow={false} height='300px' ></SkeletonSlider>)
                }

                {isLoading ? (<div className="content">
                    <div className="content_right">
                        <p>Send Us A Message</p>
                        <form className='form_help'>
                            <div className="group_input">
                                <label htmlFor="id_email">Your Email Address</label>
                                <input id="id_email" className='input_email' type="email" placeholder='Your Email Address' />
                            </div>
                            <div className="group_input">
                                <label htmlFor="input_help">How Can We help ?</label>
                                <textarea name="" id="input_help" placeholder='How Can We help ?' className='text_area_help'></textarea>
                            </div>
                        </form>
                        <div className="wrapper_btn">
                            <button className='btn_help'>submit</button>
                        </div>
                    </div>
                    <div className="content_left">
                        <div className="wrapper_help">
                            <div className="group_title">

                                <p> <FaMapMarked />
                                    <span> Address</span></p>
                                <p>Coza Store Center 8th floor, 379 Hudson St, New York, NY 10018 US</p>
                            </div>
                            <div className="group_title">

                                <p> <FaPhone />
                                    <span>
                                        Lets Talk</span></p>
                                <p className='text_color_cutom'>

                                    (+1) 96 716 6879</p>
                            </div>
                            <div className="group_title">

                                <p> <FaEnvelope />
                                    <span>
                                        Sale Support</span></p>
                                <p className='text_color_cutom'>contact@example.com</p>
                            </div>
                        </div>
                    </div>
                </div>) : (<SkeletonBanner colunm={column} ></SkeletonBanner>)}

            </div >
        </>
    );

}