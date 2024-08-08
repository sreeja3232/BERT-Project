import React from 'react'
import { useSearch } from '../context/search'
import Layout from './../components/Layout/Layout';

const Search = () => {

    const [values, setValues]=useSearch();
  return (
    <Layout>
        <div className='container'>
            <div className='text-center'>
                <h1>Search Results</h1>
                <h6>{values?.results.length<1 ? 'No Restaurants Found' : `Found ${values?.results.length}`} </h6>

                <div className='d-flex flex-wrap mt-4'>
                        {values?.results.map((r)=>(
                                    <div className='card m-2 ' style={{width:"18rem"}}>
                                        <img src={`/restaurant/restaurant-photo/${r.slug}`} className='card-img-top' alt={r.name} />
                                        <div className='card-body'>
                                            <h5 className='card-title'>{r.restName}</h5>
                                            <p className='card-text'>{r.description.substring(0,30)}...</p>
                                            <button className='btn btn-primary ms-1'>More Details</button>
                                            <button className='btn btn-secondary ms-1'>Give Review</button>
                                        </div>
                                    </div>
                            ) )}
                    </div>
            </div>

        </div>
    </Layout>

  )
}

export default Search