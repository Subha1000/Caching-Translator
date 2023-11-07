import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
let fromLang = 'en'; 
const API_KEY = ["AIzaSyBGevtycVKX2n4pIAQSa2n3VGfER8pjl9g"];

const EditTranslations = () => {
  const [phraseToTranslate, setPhraseToTranslate] = useState('');
  const [translatedPhrase, setTranslatedPhrase] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/translations/${id}`)
    .then((response) => {
      setPhraseToTranslate(response.data.phraseToTranslate);
      setTranslatedPhrase(response.data.translatedPhrase);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
      alert('An error happened. Please Check Console');
      console.log(error);
    });
  }, [])

  // Translation-related states
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing');
  const [language, setLanguage] = useState('es'); // Set the initial target language here

  const handleEditTranslation = () => {
    const data = {
      phraseToTranslate,
      translatedPhrase,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/translations/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened. Please Check Console');
      });
  };
  // Handle translation submission
  const handleTranslate = async () => {
    setStatus('submitting');
    try {
      const translationResult = await getTranslation(phraseToTranslate, language);
      setTranslatedPhrase(translationResult);
      setStatus('success');
    } catch (err) {
      setStatus('typing');
      setError(err);
    }
  };
  async function getTranslation(text, selectedLanguage) {
    const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
    const data = {
      q: text,
      source: fromLang,
      target: selectedLanguage,
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Translation request failed');
    }

    const json = await response.json();
    return json.data.translations[0].translatedText;
  }

  // Handle language selection change
  function handleLanguageChange(e) {
    setLanguage(e.target.value); // Update the language state when the dropdown changes
  }
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3x1 my-4'> Edit Translation</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-x1 w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-x1 mr-4 text-gray-500'>Enter a word or phrase (in English) to translate: </label>
          <input 
            type = 'text'
            value = {phraseToTranslate}
            onChange={(e) => setPhraseToTranslate(e.target.value)}
            className = 'border-2 border-gray-500 px-4 py-2 w-full'
            />
        </div>
        <div>
          <label className='text-x1 mr-4 text-gray-500'>Target Language: </label>
          <select 
          className='border-2 border-gray-500 px-4 py-2 w-100'
          value={language} onChange={handleLanguageChange}>
          <option value="af">Afrikaans</option>
          <option value="sq">Albanian</option>
          <option value="am">Amharic</option>
          <option value="ar">Arabic</option>
          <option value="hy">Armenian</option>
          <option value="as">Assamese</option>
          <option value="ay">Aymara</option>
          <option value="az">Azerbaijani</option>
          <option value="bm">Bambara</option>
          <option value="eu">Basque</option>
          <option value="be">Belarusian</option>
          <option value="bn">Bengali</option>
          <option value="bho">Bhojpuri</option>
          <option value="bs">Bosnian</option>
          <option value="bg">Bulgarian</option>
          <option value="ca">Catalan</option>
          <option value="ceb">Cebuano</option>
          <option value="zh-CN">Chinese (Simplified)</option>
          <option value="zh-TW">Chinese (Traditional)</option>
          <option value="co">Corsican</option>
          <option value="hr">Croatian</option>
          <option value="cs">Czech</option>
          <option value="da">Danish</option>
          <option value="dv">Dhivehi</option>
          <option value="doi">Dogri</option>
          <option value="nl">Dutch</option>
          <option value="en">English</option>
          <option value="eo">Esperanto</option>
          <option value="et">Estonian</option>
          <option value="ee">Ewe</option>
          <option value="fil">Filipino (Tagalog)</option>
          <option value="fi">Finnish</option>
          <option value="fr">French</option>
          <option value="fy">Frisian</option>
          <option value="gl">Galician</option>
          <option value="ka">Georgian</option>
          <option value="de">German</option>
          <option value="el">Greek</option>
          <option value="gn">Guarani</option>
          <option value="gu">Gujarati</option>
          <option value="ht">Haitian Creole</option>
          <option value="ha">Hausa</option>
          <option value="haw">Hawaiian</option>
          <option value="he">Hebrew</option>
          <option value="hi">Hindi</option>
          <option value="hmn">Hmong</option>
          <option value="hu">Hungarian</option>
          <option value="is">Icelandic</option>
          <option value="ig">Igbo</option>
          <option value="ilo">Ilocano</option>
          <option value="id">Indonesian</option>
          <option value="ga">Irish</option>
          <option value="it">Italian</option>
          <option value="ja">Japanese</option>
          <option value="jv">Javanese</option>
          <option value="kn">Kannada</option>
          <option value="kk">Kazakh</option>
          <option value="km">Khmer</option>
          <option value="rw">Kinyarwanda</option>
          <option value="gom">Konkani</option>
          <option value="ko">Korean</option>
          <option value="kri">Krio</option>
          <option value="ku">Kurdish</option>
          <option value="ckb">Kurdish (Sorani)</option>
          <option value="ky">Kyrgyz</option>
          <option value="lo">Lao</option>
          <option value="la">Latin</option>
          <option value="lv">Latvian</option>
          <option value="ln">Lingala</option>
          <option value="lt">Lithuanian</option>
          <option value="lg">Luganda</option>
          <option value="lb">Luxembourgish</option>
          <option value="mk">Macedonian</option>
          <option value="mai">Maithili</option>
          <option value="mg">Malagasy</option>
          <option value="ms">Malay</option>
          <option value="ml">Malayalam</option>
          <option value="mt">Maltese</option>
          <option value="mi">Maori</option>
          <option value="mr">Marathi</option>
          <option value="mni-Mtei">Meiteilon (Manipuri)</option>
          <option value="lus">Mizo</option>
          <option value="mn">Mongolian</option>
          <option value="my">Myanmar (Burmese)</option>
          <option value="ne">Nepali</option>
          <option value="no">Norwegian</option>
          <option value="ny">Nyanja (Chichewa)</option>
          <option value="or">Odia (Oriya)</option>
          <option value="om">Oromo</option>
          <option value="ps">Pashto</option>
          <option value="fa">Persian</option>
          <option value="pl">Polish</option>
          <option value="pt">Portuguese (Portugal, Brazil)</option>
          <option value="pa">Punjabi</option>
          <option value="qu">Quechua</option>
          <option value="ro">Romanian</option>
          <option value="ru">Russian</option>
          <option value="sm">Samoan</option>
          <option value="sa">Sanskrit</option>
          <option value="gd">Scots Gaelic</option>
          <option value="nso">Sepedi</option>
          <option value="sr">Serbian</option>
          <option value="st">Sesotho</option>
          <option value="sn">Shona</option>
          <option value="sd">Sindhi</option>
          <option value="si">Sinhala (Sinhalese)</option>
          <option value="sk">Slovak</option>
          <option value="sl">Slovenian</option>
          <option value="so">Somali</option>
          <option value="es">Spanish</option>
          <option value="su">Sundanese</option>
          <option value="sw">Swahili</option>
          <option value="sv">Swedish</option>
          <option value="tl">Tagalog (Filipino)</option>
          <option value="tg">Tajik</option>
          <option value="ta">Tamil</option>
          <option value="tt">Tatar</option>
          <option value="te">Telugu</option>
          <option value="th">Thai</option>
          <option value="ti">Tigrinya</option>
          <option value="ts">Tsonga</option>
          <option value="tr">Turkish</option>
          <option value="tk">Turkmen</option>
          <option value="ak">Twi (Akan)</option>
          <option value="uk">Ukrainian</option>
          <option value="ur">Urdu</option>
          <option value="ug">Uyghur</option>
          <option value="uz">Uzbek</option>
          <option value="vi">Vietnamese</option>
          <option value="cy">Welsh</option>
          <option value="xh">Xhosa</option>
          <option value="yi">Yiddish</option>
          <option value="yo">Yoruba</option>
          <option value="zu">Zulu</option>
            
          </select>
        </div>
        <button 
          className='border-2 border-gray-500 px-50 py- w-20'
        onClick={handleTranslate}>Translate</button>
        
        <div className='my-4'>
          <label className='text-x1 mr-4 text-gray-500'>Translation: </label>
          <input
            type='text'
            value={translatedPhrase}
            readOnly
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        
        <button onClick={handleEditTranslation}>Edit Translation</button>
      </div>
    </div>
  )
}

export default EditTranslations