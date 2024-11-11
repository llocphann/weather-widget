import classes from "./style.module.scss";
const day = () => {
  return (
    <>
      <div className={classes.div}>
        <span className={classes.sun}></span>
        <span className={classes.sunx}></span>
      </div>
    </>
  );
};
export default day;
