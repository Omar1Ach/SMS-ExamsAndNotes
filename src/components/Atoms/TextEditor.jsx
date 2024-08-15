import React from 'react';
import {FaBold, FaItalic, FaUnderline, FaStrikethrough, FaListUl, FaListOl, FaCode, FaLink, FaImage, FaSmile, FaTrash, FaPaperPlane, FaPlusCircle, FaThumbsUp, FaTextWidth,FaEllipsisH} from 'react-icons/fa';
import { RxDotsHorizontal } from "react-icons/rx";
import { GoPlus } from "react-icons/go";

const TextForm = () => {
    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-gray-600">
                <div className="bg-white w-[550px] p-4 rounded-lg">
                    <div className="flex gap-4 text-gray-400 mb-2">
                        <button className="text-black hover:text-black"><FaBold/></button>
                        <button className="hover:text-black"><FaItalic/></button>
                        <button className="hover:text-black"><FaUnderline/></button>
                        <button className="hover:text-black"><FaStrikethrough/></button>|
                        <button className="hover:text-black"><FaListUl/></button>
                        <button className="hover:text-black"><FaListOl/></button>|
                        <button className="hover:text-black"><FaTextWidth/></button>
                        <button className="hover:text-black"><FaCode/></button>
                        <button className="hover:text-black"><FaLink/></button>|
                        <button className="hover:text-black"><FaImage/></button>
                        <button className="hover:text-black"><FaSmile/></button>|
                        <button className="hover:text-black"><RxDotsHorizontal/></button>
                        <button className="hover:text-black ml-10"><FaTrash/></button>
                    </div>
                    <textarea
                        className="w-full p-2 -ml-2 text-black bg-white border-none focus:outline-none focus:ring-0"
                        placeholder="Type a message"
                    ></textarea>
                    <div className="flex justify-end mt-2 text-gray-400">
                        <button className="hover:text-gray-200 mr-2 "><GoPlus size={24}/></button>
                        <button className="mr-2"><FaPaperPlane /></button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TextForm;
