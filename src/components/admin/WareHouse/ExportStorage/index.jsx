import React from 'react';
import { FaFileExport, FaFileImport, FaPen, FaTimesCircle } from 'react-icons/fa';
import { formatDate } from '../../../../utils/formatDate';
import TableLayout from '../../../commons/Layouts/Table';
import './style.css';
export function ExportTable(props) {
  const renderTableBody = () => {
    return props.tableBody.map((item, index) => {
      return (
        <tr key={item.id} className="cursor-pointer font-weight-bold row-data">
          <td>{index + 1}</td>
          <td>{item.products.id}</td>
          <td>{item.products.name}</td>
          <td>{item.export_amount}</td>
          <td>{item.providers.name}</td>
          <td>{formatDate(item.created_at, 'YYYY-MM-DD')}</td>
          {/* <td>
            <div className="d-flex">
              <button
                id="improt_product"
                onClick={(e) => {
                  // handleEditProduct(e, item.id);
                }}
                className="br-6px p-2 bg-gray-100 text-black w-48px h-48px d-flex align-items-center justify-content-center border-none"
              >
                <FaFileImport className="font-20px" />
              </button>
              <button
                id="delete-product"
                // onClick={(e) => {
                //   handleCheckDisabledUser(e, item.id);
                // }}
                className="br-6px p-2 ms-3 text-danger bg-gray-100 w-48px h-48px d-flex align-items-center justify-content-center border-none"
              >
                <FaFileExport className="font-20px" />
              </button>
            </div>
          </td> */}
        </tr>
      );
    });
  };
  return (
    <>
      <div className="container-fluid ">
        <div className="row justify-content-center">
          <TableLayout tableHeader={props.tableHeader} tableBody={renderTableBody()} />
        </div>
      </div>
    </>
  );
}
