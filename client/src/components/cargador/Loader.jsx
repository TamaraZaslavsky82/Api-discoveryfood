import loader from '../../img/loader.mp4'
import style from '../../components/cargador/Loader.module.css'
import { useHistory } from 'react-router-dom';
import React, { useEffect } from 'react';


export default function Loader() {
  const history = useHistory();

  useEffect(() => {
    const video = document.getElementById("loader-video");
    if (video) {
      video.addEventListener("loadeddata", () => {
        video.play();
      });
    }

    const timeoutId = setTimeout(() => {
      history.push('/home');
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [history]);

  return (
    <div className={style.fondo}>
      <video id="loader-video" src={loader} className={style.video}></video>
    </div>
  )
}
