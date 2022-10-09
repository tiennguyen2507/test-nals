import GModal from "@/components/Gmodal"
import blogsService from "@/services/blogsService"
import { FC, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"


type TCreateOrEditBlogPage = {
  showModal: boolean,
  onCloseModal?: Function
  onRefreshList?: Function
}



const CreateOrEditBlogPage: FC<TCreateOrEditBlogPage> = ({ showModal, onCloseModal = () => { }, onRefreshList = () => { } }) => {
  const { register, handleSubmit, formState: { errors, }, reset } = useForm()
  const [imgEdit, setImgEdit] = useState()
  const [loading, setLoading] = useState(false)

  const param = useParams()
  const navigate = useNavigate()

  const renderImg = (event: any) => {
    const file = event.target.files[0]

    file.preview = URL.createObjectURL(file)
    setImgEdit(URL.createObjectURL(event.target.files[0]) as any)
  }


  const onSubmit = async (data: any) => {
    setLoading(true)
    const formData = new FormData();
    formData.append('blog[image]', data.image[0])
    formData.append('blog[content]', data.content)
    formData.append('blog[title]', data.title)
    if (!param.id) {
      await blogsService.create(formData)
      reset({})
      closeModal()
      onRefreshList()
    } else {
      await blogsService.edit(param.id as string, formData)
      reset({})
      onRefreshList()
      closeModal()
    }
    setLoading(false)
  }
  const getBlogByID = async (id: string): Promise<void> => {
    setLoading(true)
    try {
      const { data: { title, content, image: { url } } } = await blogsService.getById(id)
      setImgEdit(url)
      reset({
        title, content, image: url
      })
    } catch (error) {
      closeModal()
    }
    finally {
      setLoading(false)
    }
  }

  const closeModal = (): void => {
    onCloseModal()
    reset({})
    navigate('/blogs')
    setImgEdit(undefined)
  }

  useEffect(() => {
    if (param.id) {
      getBlogByID(param.id)
    }
  }, [param])
  return (
    <GModal showModal={showModal} title={!param.id ? 'Add Blog' : 'Edit Blog'} onCloseModal={() => closeModal()} loading={loading}>
      <form onSubmit={handleSubmit(onSubmit)} className='max-w-lg'>
        <div >
          <div className='text-base'>
            <label className='font-medium' >Title:</label>
            <input className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
              {...register('title', { required: true })} />
            {errors.title?.type === 'required' && <p className="text-red-600">Title is required</p>}
          </div>
          {imgEdit && <img src={imgEdit} alt="img" className="pt-2" />}
          <div className='text-base'>
            <label className='font-medium' >Image:</label>
            <div className='p-2 rounded-sm border'>
              <input type="file" className="form-control-file"
                {...register('image')} onInput={renderImg} />
            </div>
          </div>
          <div className='text-base'>
            <label className='font-medium' >Content:</label>
            <textarea className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register('content', { required: true })} />
            {errors.content?.type === 'required' && <p className="text-red-600">Title is required</p>}

          </div>
        </div>
        <div className=' flex justify-end items-end md:col-start-8 mt-4'>
          <button type="button" className="btn border mr-3 w-24" onClick={() => closeModal()} >Close</button>
          <button type="submit" className="btn btn-primary bg-blue-500 w-24">{!param.id ? 'Add Blog' : 'Edit Blog'}</button>
        </div>
      </form>
    </GModal >
  )
}


export default CreateOrEditBlogPage