import blogsService from '@/services/blogsService';
import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment'
import { AiOutlineArrowLeft } from "react-icons/ai";

const DetailBlogPage: FC = () => {
  const [loading, setLoading] = useState(false)
  const param = useParams()
  const navigate = useNavigate()
  const [blogDetail, setBlogDetail] = useState({
    title: '',
    image: '',
    content: '',
    dayCreate: '',
    dayUpdate: ''
  })

  const getBlogByID = async (id: string): Promise<void> => {
    setLoading(true)
    try {
      const { data: { title, content, image: { url }, created_at, updated_at } } = await blogsService.getById(id)
      setBlogDetail({
        title, content, image: url, dayCreate: moment(created_at).format('DD/MM/YYYY'), dayUpdate: moment(updated_at).format('DD/MM/YYYY')
      })
    } catch (error) {
      navigate('/blogs')
    }
    finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    if (param.id) {
      getBlogByID(param.id)
    }



  }, [param])
  return (
    <div className='flex justify-center items-center h-screen '>
      <div className='p-2'>
        <div className='max-w-lg rounded border p-4'>
          <div className='text-end my-4'>
            <AiOutlineArrowLeft onClick={() => navigate('/blogs')} className='!font-bold text-blue-600' />
          </div>
          <div>
            <div className='flex justify-between items-center pb-2'>
              <p className='font-bold'>title:</p>
              <p className='font-bold text-xl'>{blogDetail.title}</p>
            </div>
            <div className='pb-2'>
              <p className='font-bold'>image:</p>
              <img src={blogDetail.image} alt="" />
            </div>
            <div className='pb-2'>
              <p className='font-bold'>content:</p>
              <p className='max-h-24 overflow-y-auto'> {blogDetail.content} </p>
            </div>
            <div className='flex justify-between items-center pb-2'>
              <p className='font-bold'>Day Create:</p>
              <p>{blogDetail.dayCreate} </p>
            </div>
            <div className='flex justify-between items-center pb-2'>
              <p className='font-bold'>Day update:</p>
              <p>{blogDetail.dayUpdate} </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailBlogPage;
