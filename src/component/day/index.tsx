import classes from "./style.module.scss";
export const DayComponent = () => {
  return (
    <>
      <div className={classes.div}>
        <span className={classes.sun}></span>
        <span className={classes.sunx}></span>
      </div>
    </>
  );
};
