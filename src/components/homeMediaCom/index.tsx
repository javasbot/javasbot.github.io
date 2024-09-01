import { memo, useEffect, useRef, useState } from "react";
import { Tooltip } from "antd";
import { DisconnectOutlined, NotificationOutlined } from "@ant-design/icons";
import style from "./index.module.less";

const HomeMediaCom = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(true); // 添加状态跟踪音频是否正在播放
  const [tooltipTitle, setTooltipTitle] = useState("暂停");
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleEnded = () => setIsPlaying(false);

      audio.addEventListener("play", handlePlay);
      audio.addEventListener("pause", handlePause);
      audio.addEventListener("ended", handleEnded);

      return () => {
        audio.removeEventListener("play", handlePlay);
        audio.removeEventListener("pause", handlePause);
        audio.removeEventListener("ended", handleEnded);
      };
    }
  }, []);

  const handleClick = () => {
    const audio = audioRef.current;
    const videoArr = document.querySelectorAll("video");
    if (audio) {
      if (isPlaying) {
        audio.pause();
        setTooltipTitle("播放");
        videoArr.forEach((vi) => vi.pause());
      } else {
        audio.play();
        videoArr.forEach((vi) => vi.play());
        setTooltipTitle("暂停");
      }
      setIsPlaying(!isPlaying); // 更新状态
    }
  };
  return (
    <div>
      <div className={style.audiowp} onClick={handleClick}>
        <Tooltip className={style.icon} title={tooltipTitle}>
          {isPlaying ? <DisconnectOutlined /> : <NotificationOutlined />}
        </Tooltip>
      </div>
      <audio autoPlay src="yungong.mp3" ref={audioRef}>
        云宫迅音
      </audio>
    </div>
  );
};

export default memo(HomeMediaCom);
