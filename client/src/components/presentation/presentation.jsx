import "./presentation.css";
import { useState, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { RiLinkedinFill } from "react-icons/ri";
import { FaBehance } from "react-icons/fa";
import { BsGithub } from "react-icons/bs";

const Presentation = () => {
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [wordsBankNumper, setWordsBankNumper] = useState(0);
  const [mainWord, setMainWord] = useState("");

  const wordsBank = [
    {
      main: (
        <span className="prWords bold">
          Welcome to
          <span className="lemon d-block">SoftGalaxy</span>
        </span>
      ),
    },
    {
      main: <span className="prWords lemon bold">Enjoy watching</span>,
    },
  ];

  const HandleCloseMessage = () => {
    setIsMessageVisible(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsMessageVisible(true);
    }, 1100);
  }, []);

  useEffect(() => {
    const prWords = document.querySelector(".prWords");
    setMainWord(wordsBank[wordsBankNumper].main);
    prWords && (prWords.style.animation = "");
    setTimeout(() => {
      prWords && (prWords.style.animation = "outToInWords .8s ease");
    }, 1);
  }, [wordsBankNumper]);

  return (
    <>
      {isMessageVisible && (
        <section
          id="presentation"
          className="d-flex justify-content-center align-items-center"
        >
          <div className="presentationBody d-flex justify-content-center align-items-center p-3">
            {wordsBankNumper === wordsBank.length - 1 && (
              <div className="closeIcon">
                <div onClick={HandleCloseMessage}>
                  <IoCloseSharp />
                </div>
              </div>
            )}
            <div className="ownerImg">
              <img
                src="/icon.svg"
                alt="ahmed abd alalime"
                width="100%"
              />
            </div>
            <div className="moverButton d-flex gap-3">
              <div
                className="moverIcon d-flex justify-content-center align-items-center"
                onClick={() =>
                  setWordsBankNumper((prvNum) =>
                    prvNum > 0 ? prvNum - 1 : prvNum
                  )
                }
              >
                <FaAngleLeft />
              </div>
              <div
                className="moverIcon d-flex justify-content-center align-items-center"
                onClick={() =>
                  setWordsBankNumper((prvNum) =>
                    prvNum < wordsBank.length - 1 ? prvNum + 1 : prvNum
                  )
                }
              >
                <FaAngleRight />
              </div>
            </div>
            <div className="presentationWords">{mainWord}</div>
          </div>
        </section>
      )}
    </>
  );
};

export default Presentation;
