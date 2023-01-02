import * as React from 'react';
import styles from './DropDownMenu.module.css';

// import { useContext } from "react";
// import { TaskContext } from '../../contexts/TaskContext';
// import useFetch from '../../hooks/useFetch'; //loading..., fetch


const DropDwonsMenu = ({ tasks }) => {

  return (
    <>
      <Dropdown
        trigger={<button>Dropdown</button>}
        menu={tasks.map(x => <span>{x.title}</span>)}
      />
    </>
  );
};

const Dropdown = ({ trigger, menu }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className={styles['dropdown']}>
      {React.cloneElement(trigger, {
        onClick: handleOpen,
      })}
      {open ? (
        <ul className={styles['menu']}>
          {menu.map((menuItem, index) => (
            <li key={index} className={styles["menu-item"]}>
              {React.cloneElement(menuItem, {
                onClick: () => {
                  menuItem.props.onClick();
                  setOpen(false);
                },
              })}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default DropDwonsMenu;



