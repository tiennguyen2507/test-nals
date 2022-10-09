import { FC } from 'react'
import GLoading from '../GLoading'


type TGModal = {
  children: React.ReactNode,
  showModal: boolean,
  title: string,
  onCloseModal?: Function,
  loading?: boolean
}

const GModal: FC<TGModal> = ({ children, showModal, title = '', onCloseModal = () => { }, loading = false }) => {
  if (!showModal) return null
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 z-10 bg-slate-300 bg-opacity-50 flex justify-center items-center p-3" >
      <GLoading isLoading={loading} >
        <div className='bg-white rounded p-3'>
          <div className=' flex justify-between items-center pb-4'>
            <h2 className='font-bold text-xl'>{title}</h2>
            <p className='font-bold text-xl cursor-pointer' onClick={() => onCloseModal()}>x</p>
          </div>
          {children}
        </div>
      </GLoading>

    </div>
  )
}

export default GModal