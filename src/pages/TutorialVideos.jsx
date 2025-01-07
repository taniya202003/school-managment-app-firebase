import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ContextProvider } from "../context/Context";

export const TutorialVideos = () => {
  const { fetchVideos, javascriptVideos, reactJsVideos } =
    useContext(ContextProvider);
  const navigate = useNavigate();
  const location = useLocation();
  const selectedSubject = location?.state?.subject;

  const isYouTubeUrl = (url) => url.includes("youtu");
  const getYouTubeEmbedUrl = (url) => {
    return url.replace("youtu.be/", "www.youtube.com/embed/").split("?")[0]; // Transform YouTube shareable URL to embed URL
  };

  //.includes() method is a JavaScript method that is used to check if a specific string or element is present in another string or array.

  // example ;-
  // let  myString = "Hello, world!";
  // let searchString = "world";
  // if (myString.includes(searchString)) {
  //   console.log("The string includes the word 'world'");
  // } else {
  //   console.log("The string does not include the word 'world'");
  // }

  useEffect(() => {
    fetchVideos();
  }, []);

  const videoToShow =
    selectedSubject === "JavaScript" ? javascriptVideos : reactJsVideos;

  return (
    <div className="tutorialVideos-container">
      <h2>{selectedSubject} Tutorial Videos </h2>
      <div className="videos-grid">
        {videoToShow.map((vid, i) => (
          <div key={i}>
            <h5>{vid.title}</h5>
            {vid?.url ? (
              isYouTubeUrl(vid.url) ? (
                <iframe
                  width="350"
                  height="200"
                  src={getYouTubeEmbedUrl(vid.url)}
                  title={vid.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <video width="550" height="500" controls>
                  <source src={vid.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )
            ) : (
              <p>No video available</p>
            )}
          </div>
        ))}
      </div>

      <button className="goBack-btn" onClick={() => navigate(-1)}>
        Go Back
      </button>
    </div>
  );
};
