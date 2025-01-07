import React, { useContext, useEffect, useState } from "react";
import { ContextProvider } from "../../context/Context";
import { db } from "../sign-in-and-out-with-firebase/Firebase";
import { deleteDoc, doc } from "firebase/firestore";

export const Videos = () => {
  const {
    currentUserProfile,
    javascriptVideos,
    setJavascriptVideos,
    reactJsVideos,
    setReactJsVideos,
    addNewVideo,
    fetchVideos,
  } = useContext(ContextProvider);
  const [addVideo, setAddVideo] = useState("");

  useEffect(() => {
    fetchVideos();
  }, []);

  const currentSubject =
    currentUserProfile.subject === "JavaScript"
      ? javascriptVideos
      : reactJsVideos;
  console.log(currentSubject, "currentSubject");

  const isYouTubeUrl = (url) => url.includes("youtu");
  const getYouTubeEmbedUrl = (url) => {
    return url.replace("youtu.be/", "www.youtube.com/embed/").split("?")[0];
  };

  const handleAddVideo = (e) => {
    e.preventDefault();
    if (!addVideo) return;

    const subject = currentUserProfile.subject;
    addNewVideo(addVideo, subject);
    setAddVideo("");
  };

  const handleRemove = async (id) => {
    const subject = currentUserProfile.subject;
    try {
      await deleteDoc(
        doc( db, subject === "JavaScript" ? "javascriptVideos" : "reactJsVideos", id ));
      if (subject === "JavaScript") {
        setJavascriptVideos((prev) => prev.filter((video) => video.id !== id));
      } else {
        setReactJsVideos((prev) => prev.filter((video) => video.id !== id));
      }
    } catch (error) {
      console.error("Error in removing video from Firestore: ", error.message);
    }
  };

  return (
    <div className="videos-container">
      <h2>Videos for {currentUserProfile.subject}</h2>
      <div className="add-video-div">
        <form className="add-video-form" onSubmit={handleAddVideo}>
          <input
            className="add-video-input"
            type="text"
            placeholder="Add Url"
            value={addVideo}
            name="addVideo"
            onChange={(e) => setAddVideo(e.target.value)}
          />
          <button className="add-video-btn" type="submit">
            Add Video
          </button>
        </form>
      </div>
      <div className="videos-grid">
        {currentSubject.map((vid, i) => (
          <div key={i}>
            <h5>{vid.title}</h5>
            {vid?.url ? (
              isYouTubeUrl(vid.url) ? (
                <div className="videos-div">
                  <iframe
                    width="350"
                    height="200"
                    src={getYouTubeEmbedUrl(vid.url)}
                    title={vid.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <button
                    className="removeVideo-btn"
                    onClick={() => handleRemove(vid.id)}
                  >
                    Remove Video
                  </button>
                </div>
              ) : (
                <video width="550" height="500" controls>
                  <source src={vid.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )
            ) : (
              <div>
                <p>No video available</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
