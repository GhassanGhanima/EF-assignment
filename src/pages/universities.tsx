import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../shared/components/Table';
import Pagination from '../shared/components/Pagination';
import { deleteItems, setPage, SetSearch } from '../store/universitiesStore/actions';
import { University, UniversityState } from '../shared/interface/universitiesInterFace';
import { useNavigate } from 'react-router-dom';
import Card from '../shared/components/Card';
import SearchBar from '../shared/components/SearchBar';
import { getUniversities } from '../shared/services/apiService/apiUniversities';


const Universities: React.FC = () => {

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const items = useSelector((state: UniversityState) => state.items);
  const currentPage = useSelector((state: UniversityState) => state.currentPage);

  useEffect(() => {
    dispatch(getUniversities());
  }, [dispatch]);

  const onPageChange = (pageNumber: number) => {
    dispatch(setPage(pageNumber));
  }

  const showUniversityDetails = (University: University) => {
    navigate(`/details/${University.name}`);
  }

  const DeleteUniversity = (University: University) => {
    dispatch(deleteItems(University));

  }

  const onSearchBarChange = (search: string,country:string) => {
    dispatch(SetSearch(search,country));
  }


  return (
    <div className='container'>
      <h1 className='page-title'>Universities</h1>
      <Card className='overflow-x-hidden'>
      <SearchBar onSearchBarChange={onSearchBarChange} Reset={true}  className="mb-3"/>
        <Table data={items} columns={['name', 'web_pages', 'state-province', 'country', 'alpha_two_cod']} currentPage={currentPage} itemsPerPage={10}
          actions={
            [
              { name:'View',  title:'View', style: 'btn btn-outline-primary btn-sm', icon: 'main-icon-eye', actionHandler: (item: any) => { showUniversityDetails(item) } },
              { name:'Delete', title:'Delete',  style: 'btn btn-danger btn-sm', icon: 'main-icon-bin', actionHandler: (item: any) => { DeleteUniversity(item) } }
            ]
          }
        />
        {items.length === 0 && <h1 className='table-no-data'> there is no University data </h1>}
        <Pagination totalItems={items.length} itemsPerPage={10} currentPage={currentPage} onPageChange={onPageChange} />
      </Card>
    </div>
  );
};

export default Universities