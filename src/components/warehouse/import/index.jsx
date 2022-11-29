import React, { useState, useRef } from 'react';
import { FaFemale, FaMale, FaPen, FaTimes, FaTimesCircle } from 'react-icons/fa';
import Modal from '../../commons/Layouts/Modal';
import TableLayout from '../../commons/Layouts/Table';
import { URL_SERVER } from '../../../utils/urlPath';
import AutoSendMail from '../../commons/Layouts/AutoSendMail';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { HiMail } from 'react-icons/hi';
import { MdOutlineManageAccounts } from 'react-icons/md';
import { FiMapPin } from 'react-icons/fi';
import { GrStatusUnknown } from 'react-icons/gr';
import AutoCallPhone from '../../commons/Layouts/AutoCallPhone';
import { setIsEdit, setIsReset } from '../../../redux/reducer/staff/staff.reducer';
import Notiflix from 'notiflix';
import { ErrorToast, SuccessToast } from '../../commons/Layouts/Alerts';
import { useDispatch } from 'react-redux';
import ImageCustom from '../../commons/Layouts/Image';

export function ImportTable(props) {
  console.log(props.tableBody);
  const [show, setShowDetail] = useState(false);
  const [detailImport, setDetailImport] = useState('');
  const inputRef = useRef();
  const dispatch = useDispatch();
  const showDetail = (item) => {
    setShowDetail(true);
    setDetailImport(item.item);
  };




  const renderTableBody = () => {

    return props.tableBody.map((item) => {
      return (
        <tr key={item.id} className='row-data cursor-pointer' onClick={() => showDetail({ item })}>
          <td>
            {item.id}
          </td>
          <td>
            <ImageCustom type='avatar' src={item.product.img}   />
          </td>

          <td className='col-txt'>
            {item.provider.name}
          </td>

          <td className='col-txt'>
            {item.amount}
          </td>

          <td className='col-txt'>
            {item.price}
          </td>

          <td>
            <div className='d-flex'>

              <button
                id='disabled-user'

                className='br-6px p-2 ms-3 text-danger bg-gray-100 w-48px h-48px d-flex align-items-center justify-content-center border-none'
              >
                <FaTimesCircle className='text-danger font-20px' />
              </button>
            </div>
          </td>
        </tr>
      );
    });
  };
  // const renderDetailImport = (item) => {
  //   return (
  //     <div className='card-overlay'>
  //       <div className='card-image-overlay'>
  //         {/* <img className="avatar-detail" src={`${URL_SERVER}/storage/staff/${item.avatar}`} /> */}
  //         <ImageCustom type='avatar-overlay' src={item.avatar} />
  //         <p className='card-txt card-txt-title'>{`${item.first_name} ${item.last_name}`}</p>
  //         <p className='card-txt'>
  //           <BsFillTelephoneFill className='icon' />
  //           {item.phone && <AutoCallPhone phoneNumber={item.phone} />}
  //         </p>
  //         <p className='card-txt'>
  //           {' '}
  //           <HiMail className='cursor-pointer spinner icon' />
  //           {item.email && <AutoSendMail email={item.email} className='spinner' />}
  //         </p>
  //       </div>
  //       <div className='card-content-overlay'>
  //         <p className='card-txt-content'>
  //           <MdOutlineManageAccounts className='icon' />
  //           {item.role_name}
  //         </p>
  //         <p className='card-txt-content'>
  //           {item.gender === 'female' ? <FaFemale className='icon' /> : <FaMale className='icon' />}
  //           {item.gender}
  //         </p>
  //         <p className='card-txt-content'>
  //           {' '}
  //           <FiMapPin className='icon' /> {item.address}
  //         </p>
  //         <p className='card-txt-content'>
  //           {' '}
  //           <GrStatusUnknown className='icon' /> {item.status === 1 ? 'Active' : 'Disabled'}
  //         </p>
  //         <p className='card-txt-content'>
  //           {' '}
  //           <strong>Enrollment date:</strong> {item.created_date}
  //         </p>
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <>
      <div className='container-fluid '>
        <div className='row justify-content-center'>
          <TableLayout tableHeader={props.tableHeader} tableBody={renderTableBody()} />
        </div>
      </div>

      {/*<Modal*/}
      {/*  show={show}*/}
      {/*  isHeader={false}*/}
      {/*  className='modal-md'*/}
      {/*  setStateModal={() => setShowDetail(false)}*/}
      {/*  elementModalTitle='Detail Import'*/}
      {/*  elementModalBody={renderDetailImport(detailImport)}*/}
      {/*/>*/}

    </>
  );
}
