import classes from './loader.module.scss';

export const Loader = () => {
  return   <div className={classes["loader-inner"]}>
  <div className={classes["lds-spinner"]}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
  </div>
};