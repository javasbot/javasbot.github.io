import style from "./index.module.less";
export default function AI() {
  return (
    <div className={style.aiContainer}>
      <div className={style.title}>人工智能</div>
      <div className={style.bigMe} />
    </div>
  );
}
