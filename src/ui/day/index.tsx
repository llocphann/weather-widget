import classes from "./style.module.scss";
import sunStyles from "../elements/sun.module.scss";
const day = () => {
  return (
    <>
      <div className={classes.div}>
        <span className={sunStyles.sun}></span>
        <span className={sunStyles.sunx}></span>
      </div>
    </>
  );
};
export default day;