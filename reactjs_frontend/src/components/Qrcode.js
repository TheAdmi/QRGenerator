import React, {useState} from "react";
import { AtSymbolIcon, CheckCircleIcon, DocumentTextIcon, LinkIcon, PhoneIcon, QrCodeIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { saveAs } from "file-saver";
import toast, { Toaster } from 'react-hot-toast';
import Navbar from "./Navbar";
import Footer from "./Footer";

function Qrcode() {
  const [activeLink, setActiveLink] = useState(1);
  const [inputText, setInputText] = useState('');
  const [bgColor, setBgColor] = useState('white');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [qrCodeImg, setQrCodeImg] = useState('');

  // Type of text icons : 
  const handleLinkClick = (linkNumber) => {
    setActiveLink(linkNumber);
    setInputText('');
  };

  let iconToRender;
  switch (activeLink) {
    case 1:
      iconToRender = <LinkIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />;
      break;
    case 2:
      iconToRender = <DocumentTextIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />;
      break;
    case 3:
      iconToRender = <PhoneIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />;
      break;
    case 4:
      iconToRender = <AtSymbolIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />;
      break;
    default:
      iconToRender = null;
  }

  // Theme switcher :
  const changeBgColor = (color) => {
    toggleDarkMode();
    setBgColor(color);
  }
  const toggleDarkMode = () => {
    if (isDarkMode) {
      setIsDarkMode(!false);
      document.body.classList.remove('dark'); 
    } else {
      setIsDarkMode(!true);
      document.body.classList.add('dark');
    }
  };

  // Generating qrcode :
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/qrcodes/', {link: inputText});
      setQrCodeImg("http://localhost:8000"+response.data.qr_code_image);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  // Saving notification :
  const SavingNotif = () => (
    toast(
      <div className="max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700" role="alert">
        <div className="flex items-center px-4 py-6">
          <div className="animate-spin inline-block w-5 h-5 border-[3px] border-current border-t-transparent text-purple-500 rounded-full" role="status" aria-label="loading">
            <span className="sr-only">Loading...</span>
          </div>
          <p className="ml-2 text-md text-gray-700 dark:text-gray-400">
            Saving...
          </p>
        </div>
      </div>
      , {
        style: {background: 'none', boxShadow: 'none'},
        duration: 2000,
        position: 'top-center',
      })
  );

  // Saved image notification :
  const SavedNotif = (msg) => (
    toast(
      <div className="max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700" role="alert">
        <div className="flex items-center px-4 py-6">
          <CheckCircleIcon className="w-6 h-6 fill-purple-500" />
          <p className="ml-2 text-md text-gray-700 dark:text-gray-400">
            {msg}
          </p>
        </div>
      </div>
      , {
        style: {background: 'none', boxShadow: 'none'},
        duration: 2000,
        position: 'top-center',
      })
  );

  // Save qrcode as png :
  function randomName(){
    return Math.random().toString().substring(2, 6);
  };

  function saveAsPng(){
    SavingNotif();
    setTimeout(() => {
      saveAs(qrCodeImg, "Qrcode_"+randomName());
      toast.remove();
      SavedNotif("Image successfully saved as PNG");
    }, 2500);
  };

  // Save qrcode as svg :
  const saveAsSvg = async () => {
    try {
      SavingNotif();
      const response = await axios.post('http://localhost:8000/api/convert_image_to_svg/', { image_url: qrCodeImg });
      saveAs("http://localhost:8000/media/converted_imgs/" + response.data.svg_name, "Qrcode_" + randomName());
      toast.remove();
      SavedNotif("Image successfully saved as SVG");
    } catch (error) {
      console.error('Error saving QR code:', error);
    }
  };

  // Save qrcode as svg :
  const saveAsJpg = async () => {
    try {
      SavingNotif();
      const response = await axios.post('http://localhost:8000/api/convert_image_to_jpg/', { image_url: qrCodeImg });
      saveAs("http://localhost:8000/media/converted_imgs/" + response.data.jpg_name, "Qrcode_" + randomName());
      toast.remove();
      SavedNotif("Image successfully saved as JPG");
    } catch (error) {
      console.error('Error saving QR code:', error);
    }
  };

  return (
    <section className={`bg-${bgColor} dark:bg-gray-900 min-h-screen`}>
      <Navbar/>
      <Toaster/>

      <div className="py-4 text-center">
        <h1 className="text-3xl font-extrabold leading-none tracking-normal text-gray-900 dark:text-white md:text-5xl md:tracking-tight">
          Welcome to <QrCodeIcon className="h-8 w-8 md:h-11 md:w-11 align-top md:align-bottom fill-purple-600 inline-block"/>
          Generator <br /> Project
        </h1>
        <div className="flex flex-col text-center w-full mt-3 px-4">
          <h1 className="text-xl font-semibold title-font mb-0 text-gray-900 dark:text-white">
            Generate QR Codes with Ease
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-700 dark:text-gray-300">
            Create QR codes for your links, contact details, and more. Simple,
            fast, and free. <br />
            Get started now!
          </p>
        </div>
      </div>

      <div className="container px-5 pt-14 pb-8 mx-auto flex flex-wrap flex-col">
        <div className="flex mx-auto flex-wrap mb-10 text-gray-900 dark:text-white font-medium">
          <button className={`sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 cursor-pointer inline-flex items-center leading-none border-gray-900 dark:border-white hover:text-slate-400 tracking-wider ${activeLink === 1 ? "rounded-t bg-gray-900 text-white dark:bg-white dark:text-gray-900":""}`}
          onClick={()=>handleLinkClick(1)}>
            <LinkIcon className="w-5 h-5 mr-3 "/>URL
          </button>
          <button className={`sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 cursor-pointer inline-flex items-center leading-none border-gray-900 dark:border-white hover:text-slate-400 tracking-wider ${activeLink === 2 ? "rounded-t bg-gray-900 text-white dark:bg-white dark:text-gray-900":""}`}
          onClick={()=>handleLinkClick(2)}>
            <DocumentTextIcon className="w-5 h-5 mr-3 "/>TEXT
          </button>
          <button className={`sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 cursor-pointer inline-flex items-center leading-none border-gray-900 dark:border-white hover:text-slate-400 tracking-wider ${activeLink === 3 ? "rounded-t bg-gray-900 text-white dark:bg-white dark:text-gray-900":""}`}
          onClick={()=>handleLinkClick(3)}>
            <PhoneIcon className="w-5 h-5 mr-3 "/>PHONE
          </button>
          <button className={`sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 cursor-pointer inline-flex items-center leading-none border-gray-900 dark:border-white hover:text-slate-400 tracking-wider ${activeLink === 4 ? "rounded-t bg-gray-900 text-white dark:bg-white dark:text-gray-900":""}`}
          onClick={()=>handleLinkClick(4)}>
            <AtSymbolIcon className="w-5 h-5 mr-3 "/>EMAIL
          </button>
        </div>

        <form className="mb-6" onSubmit={handleSubmit}>
          <div className="relative w-full xl:w-5/12 lg:w-3/5 md:w-3/4 sm:w-3/4 mx-auto">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              {iconToRender}
            </div>
            <input type="text" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="typing here.." value={inputText} onChange={(e)=>setInputText(e.target.value)} required/>
            <button type="submit" className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 absolute right-2.5 bottom-2.5 font-medium rounded-lg text-sm px-4 py-2">
              Generate
            </button>
          </div>
        </form>

        <div className="flex items-center justify-center">
            <div className="flex flex-col items-center justify-center mr-2">
              <button className="w-12 h-12 rounded-full bg-white border-2 border-gray-900 dark:border-white mb-4"
              onClick={()=>changeBgColor('white')} ></button>
              <button className="w-12 h-12 rounded-full bg-green-500 border-2 border-gray-900 dark:border-white mb-4"
              onClick={()=>changeBgColor('green-500')} ></button>
              <button className="w-12 h-12 rounded-full bg-red-500 border-2 border-gray-900 dark:border-white mb-4"
              onClick={()=>changeBgColor('red-500')} ></button>
              <button className="w-12 h-12 rounded-full bg-yellow-400 border-2 border-gray-900 dark:border-white"
              onClick={()=>changeBgColor('yellow-400')} ></button>
            </div>
            <img className="w-64 h-64 object-cover object-center rounded float-left" id="img-qrcode" alt="Qrcode" src={qrCodeImg?qrCodeImg:"https://i.imgur.com/o6ZYbF8.png"} />
          </div>
          <div className="flex flex-row items-center justify-center mt-2 text-gray-900 dark:text-white">
            <div className="w-14 h-12 rounded-full bg-transparent"></div>
            <button className="w-20 py-2 text-center font-semibold rounded-full text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 mr-3"
              onClick={saveAsPng}>Png
            </button>
            <button className="w-20 py-2 text-center font-semibold rounded-full text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 mr-3"
              onClick={saveAsSvg}>Svg
            </button>
            <button className="w-20 py-2 text-center font-semibold rounded-full text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800"
              onClick={saveAsJpg}>Jpg
            </button>
          </div>

      </div>

      <Footer />
    </section>
  );
}

export default Qrcode;
