import React from 'react';

import { setExpiredToken } from '../../../redux/reducer/auth/auth.reducer';
import { deleteCookie, getCookies } from '../../../api/Admin/Auth';
import FilterStatus from '../../../components/admin/Staff/FilterStatus';
import SearchWithDropdownOptions
  from '../../../components/commons/Layouts/SearchWithDropdownOptions/SearchWithDropdownOptions';
import { Button } from 'react-bootstrap';
import { StaffTable } from '../../../components/admin/Staff';
import NotFoundData from '../../../components/commons/Layouts/NotFoundData';
import PaginationUI from '../../../components/commons/Layouts/Pagination';
import Skeleton from '../../../components/commons/Layouts/Skeleton';
import { import_table_header } from '../../../asset/data/import_table_header';
import { ImportTable } from '../../../components/warehouse/import';


function ImportPage(props) {
  const [loading, setLoading] = React.useState(false);
  const data_import_table_header = [...import_table_header];
  const [data, setData] = React.useState([]);
  setData([
    {id:1,product:{id:1,name:'Bgulanky',img:'http://images'},provider:{id:2,name:'LungQuan YuNa'},amount:100,price:320},
    {id:2,product:{id:2,name:'Ngubulo',img:'http://images'},provider:{id:3,name:'CangXu ManNa'},amount:180,price:220},
    {id:3,product:{id:8,name:'VyCHua',img:'http://images'},provider:{id:4,name:'VinhLunfg'},amount:170,price:420},
  ])
  const data_provider = [
    { value: 1, label: 'DVRK' },
    { value: 2, label: 'SUNG NAMBLK' },
    { value: 3, label: 'Dệt May Vĩnh Hưng' },
  ];


  return (
    <div className='container-fluid mt-5'>

        <h5 className="text-danger font-weight-bold mb-3">Staff List</h5>
        {/*<div className="row">*/}
        {/*  <div className="mb-3 d-flex justify-content-between">*/}
        {/*    <div className="d-flex justify-content-between ">*/}
        {/*      <FilterStatus data_options={data_options_filter} setFilterStatus={setFilterStatus} />*/}
        {/*    </div>*/}
        {/*    <div className="d-flex justify-content-between ">*/}
        {/*      <SearchWithDropdownOptions currentFilter={filter} setSearch={setSearch} setFilter={setFilter} />*/}
        {/*      <Button*/}
        {/*        id="create-new-product"*/}
        {/*        variant="danger"*/}
        {/*        className="font-weight-bold ms-3"*/}
        {/*        onClick={goToPageAddStaff}*/}
        {/*      >*/}
        {/*        Create new import*/}
        {/*      </Button>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
        <div className="row justify-content-center">
          {!loading ? (
            <>
              {data.length > 0 ? (
                <ImportTable tableHeader={data_import_table_header} tableBody={data} />
              ) : (
                <NotFoundData />
              )}
              {/*{totalRecord > 8 && (*/}
              {/*  <PaginationUI*/}
              {/*    handlePageChange={handlePageChange}*/}
              {/*    perPage={perPage}*/}
              {/*    totalRecord={totalRecord}*/}
              {/*    currentPage={page}*/}
              {/*  />*/}
              {/*)}*/}
            </>
          ) : (
            <Skeleton column={7} />
          )}
        </div>
    </div>
  );
}

export default ImportPage;