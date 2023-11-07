import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';


const Home = () => {
  const [translations, setTranslations] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/translations')
      .then((response) => {
        setTranslations(response.data.data);
        setLoading(false);
      }) 
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <div className='p-4'>
      <div className='flex justify-center items-center'>
        <h1 className='text-3x1 my-8 text-center font-bold text-4xl'>Caching Translator</h1>
        <Link to= '/translations/create' >
          <MdOutlineAddBox className= 'text-blue-800 text-4x1 ' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className='w-full border-separate border-spacing-2'>
          <thead>
            <tr>
              <th className='border border-slate-600 rounder-md'>No</th>
              <th className='border border-slate-600 rounder-md'>Phrase</th>
              <th className='border border-slate-600 rounder-md'>Translation</th>
              <th className='border border-slate-600 rounder-md'>Operation</th>

            </tr>
          </thead>
          <tbody>
            {translations.map((translation, index) => (
              <tr key = {translation._id} className='h-8'>
                <td className='border border-slate-700 rounded-md text-center'>
                  {index+1}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  {translation.phraseToTranslate}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  {translation.translatedPhrase}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  <div className='flex justify-center gap-x-4'>
                  <Link to= {`/translations/details/${translation._id}`}>
                    <BsInfoCircle className='text-2x1 text-green-800' />
                  </Link>
                  <Link to= {`/translations/edit/${translation._id}`}>
                    <AiOutlineEdit className='text-2x1 text-yellow-600' />
                  </Link>
                  <Link to= {`/translations/delete/${translation._id}`}>
                    <MdOutlineDelete className='text-2x1 text-red-600' />
                  </Link>
                  </div>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      )}
    </div>
  )
}

export default Home