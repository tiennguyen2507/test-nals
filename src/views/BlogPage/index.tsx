import blogsService from '@/services/blogsService'
import { FC, useEffect, useState } from 'react'
import imgError from '@/assets/imgError.png'
import GSelect from '@/components/GSelect'
import { pageOptions, softByOptions, softDirectionOptions } from './constant'
import CreateOrEditBlogPage from './CreateOrEditBlogPage'
import { useNavigate, useParams } from 'react-router-dom'
import GLoading from '@/components/GLoading'
import { AiFillEdit } from "react-icons/ai";

type TFormSearch = {
  page: number,
  offset: string,
  search: string,
  sort_by: undefined | string,
  sort_direction: undefined | string
}


const BlogsPage: FC = () => {
  const navigate = useNavigate()
  const [listBlog, setListBlog] = useState([])
  const [formSearch, setFormSearch] = useState<TFormSearch>({
    page: 1,
    offset: '5',
    search: '',
    sort_by: undefined,
    sort_direction: undefined
  })
  const [totalPage, setTotalPage] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const param = useParams()



  const getListBlog = async (formSearch: any) => {
    setLoading(true)
    try {
      const resuft = await blogsService.getList(formSearch) as any
      setListBlog(resuft.data.items)
      setTotalPage(resuft.pagination.total)
    } finally {
      setLoading(false)
    }
  }

  const renderPagination = () => {
    const paginationJSX = []
    for (let i = 1; i <= totalPage; i++) {
      if (i < 5 || i === totalPage) {
        paginationJSX.push(
          <li className={`page-item ${i === formSearch.page && 'active'}`} key={i}
            onClick={() => setFormSearch({ ...formSearch, page: i })}>
            <a className="page-link" >{i}</a>
          </li>)
      }
      if (i === 5) {
        paginationJSX.push(<li className="page-item " key={i}><a className="page-link" >...</a></li>)
      }
    }
    return paginationJSX
  }

  const selectPage = (e: string) => {
    setFormSearch({
      ...formSearch, offset: e
    })
  }

  const handleSearch = (event: any) => {
    if (event.key === 'Enter') {
      setFormSearch({
        ...formSearch,
        search: event.target.value,
        page: 1
      })
    }
  }

  const showEdit = (id: string) => {
    navigate(`/blogs/${id}`)
    setShowModal(true)
  }

  useEffect(() => {
    getListBlog(formSearch)
    if (param.id) {
      setShowModal(true)
    }
  }, [formSearch])

  return (
    <div className='md:p-10 lg:p-20'>
      <div className='md:p-10 lg:p-20 p-2'>
        <div className='grid mb-4 grid-cols-2 md:grid-cols-8 gap-4'>
          <div className='md:col-start-1 md:col-span-2'>
            <label className='font-medium' >Soft By:</label>
            <GSelect data={softByOptions} value={formSearch.sort_by} onChange={(value: string) => setFormSearch({ ...formSearch, sort_by: value, page: 1 })} />
          </div>
          <div className='md:col-start-3 md:col-span-2'>
            <label className='font-medium' >Sort Direction:</label>
            <GSelect data={softDirectionOptions} value={formSearch.sort_direction} onChange={(value: string) => setFormSearch({ ...formSearch, sort_direction: value, page: 1 })} />
          </div>
          <div className=' flex justify-end items-end md:col-start-5 md:col-span-2 lg:col-span-3'>
            <input type='text' className="form-control" placeholder='Please enter to search' onKeyDown={(e) => handleSearch(e)} />
          </div>
          <div className=' flex justify-end items-end md:col-start-8'>
            <button type="button" className="btn btn-primary bg-blue-500 w-full" onClick={() => setShowModal(true)}>Add Post</button>
          </div>
        </div>
        <GLoading isLoading={loading} >
          <div className='p-4 border rounded bg-white min-h-[500px]'>
            {listBlog.length !== 0 ? (<ul className="list-unstyled">
              {listBlog.length !== 0 && listBlog.map(({ title, id, content, image: { url } }) => {
                return (
                  <>
                    <li className="media border rounded p-2 mb-3 cursor-pointer hover:bg-blue-50 flex justify-between items-center" key={id} >
                      <div className='media overflow-hidden '>
                        <img src={url || imgError} className="mr-3 w-20" alt="img" onClick={() => navigate(`/blogs/detail/${id}`)} />
                        <div className="overflow-hidden " onClick={() => navigate(`/blogs/detail/${id}`)}>
                          <h5 className="mt-0 mb-1  font-bold text-ellipsis overflow-hidden  whitespace-nowrap">{title}</h5>
                          <div className="media-body max-h-20  overflow-hidden whitespace-normal text-ellipsis" dangerouslySetInnerHTML={{ __html: content }}>
                          </div>
                        </div>
                      </div>
                      <div className='p-2 border rounded cursor-pointer' onClick={() => showEdit(id)} >
                        <AiFillEdit className='text-xl' />
                      </div>
                    </li>
                  </>
                )
              })}
            </ul>) : (<div className='w-full h-full text-center text-xl font-semibold'>No blog!</div>)}
          </div>
        </GLoading>
        <div className='flex justify-between pt-4 min-w[50px]'>
          <div className='w-32'>
            <GSelect data={pageOptions} value={formSearch.offset} onChange={(e: string) => selectPage(e)} />
          </div>
          <ul className="pagination">
            <li className="page-item" onClick={() => formSearch.page !== 1 && setFormSearch({ ...formSearch, page: formSearch.page - 1 })}>
              <a className="page-link" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>

            {renderPagination()}
            <li className="page-item" onClick={() => formSearch.page < listBlog.length && setFormSearch({ ...formSearch, page: formSearch.page + 1 })}>
              <a className="page-link" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </div>
        <CreateOrEditBlogPage showModal={showModal} onCloseModal={() => setShowModal(false)} onRefreshList={() => getListBlog(formSearch)} />
      </div >
    </div>
  )
}

export default BlogsPage
