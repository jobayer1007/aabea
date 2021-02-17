import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import * as S from './Sidebar.styles';

const Sidebar = (props) => {
  const {
    backgroundImage = '',
    sidebarHeader = {
      fullName: '',
      shortName: '',
    },
    menuItems = [],
    fonts = {
      header: '',
      menu: '',
    },
  } = props;

  // State
  const [selected, setSelectedMenuItem] = useState(menuItems[0].name);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [header, setHeader] = useState(sidebarHeader.fullName);
  const [subMenuItemsState, setSubMenuItemsState] = useState({});

  // Effect

  // Update of Header State
  useEffect(() => {
    isSidebarOpen
      ? setTimeout(() => setHeader(sidebarHeader.fullName), 200)
      : setHeader(sidebarHeader.shortName);
  }, [isSidebarOpen, sidebarHeader]);

  // Update of Sidebar State
  useEffect(() => {
    const updateWindowWidth = () => {
      if (window.innerWidth < 1280) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener('resize', updateWindowWidth);

    return () => window.removeEventListener('resize', updateWindowWidth);
  }, [isSidebarOpen]);

  // Add Index of Menu items with SubMenus to State
  useEffect(() => {
    const newSubmenus = {};
    menuItems.forEach((item, index) => {
      const hasSubMenus = !!item.subMenuItems.length;

      if (hasSubMenus) {
        newSubmenus[index] = {};
        newSubmenus[index]['isOpen'] = false;
        newSubmenus[index]['isSelected'] = null;
      }
    });

    setSubMenuItemsState(newSubmenus);
  }, [menuItems]);

  const handleMenuItemClick = (name, index) => {
    setSelectedMenuItem(name);
    console.log('index:', index);

    const subMenusCopy = JSON.parse(JSON.stringify(subMenuItemsState));

    if (subMenuItemsState.hasOwnProperty(index)) {
      subMenusCopy[index]['isOpen'] = !subMenuItemsState[index]['isOpen'];
      setSubMenuItemsState(subMenusCopy);
    }
  };
  console.log(subMenuItemsState);

  const menuItemsJSX = menuItems.map((item, index) => {
    const isItemSelected = selected === item.name;
    // console.log(`${item.name} selected? ${isItemSelected} `);

    const hasSubMenus = !!item.subMenuItems.length;
    const isOpen = subMenuItemsState[index]
      ? subMenuItemsState[index].isOpen
      : null;

    const subMenuJSX = item.subMenuItems.map(
      (subMenuItem, SubMenuItemIndex) => {
        return (
          <S.SubMenuItem key={SubMenuItemIndex}>
            {subMenuItem.name}
          </S.SubMenuItem>
        );
      }
    );

    return (
      <S.ItemContainer key={index}>
        <Link to={item.to} style={{ textDecoration: 'none' }}>
          <S.MenuItem
            fonts={fonts.menu}
            selected={isItemSelected}
            onClick={() => handleMenuItemClick(item.name, index)}
            isSidebarOpen={isSidebarOpen}
            isOpen={isOpen}
          >
            <S.Icon isSidebarOpen={isSidebarOpen} src={item.icon} />
            <S.Text isSidebarOpen={isSidebarOpen}>{item.name}</S.Text>
            {hasSubMenus && isSidebarOpen && (
              <S.DropDownIcon selected={isItemSelected} isOpen={isOpen} />
            )}
          </S.MenuItem>
        </Link>
        {/* // Display Submenus if they exist */}
        <AnimatePresence>
          {hasSubMenus && isOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              exit={{ opacity: 0, x: -30 }}
            >
              <S.SubMenuItemContainer isSidebarOpen={isSidebarOpen}>
                {subMenuJSX}
              </S.SubMenuItemContainer>
            </motion.nav>
          )}
        </AnimatePresence>
      </S.ItemContainer>
    );
  });

  console.log(`is it open: ${isSidebarOpen}`);

  return (
    <S.SidebarContainer
      backgroundImage={backgroundImage}
      isSidebarOpen={isSidebarOpen}
    >
      <S.SidebarHeader fonts={fonts.header}>{header}</S.SidebarHeader>
      <S.MenuItemContainer>{menuItemsJSX}</S.MenuItemContainer>
      <S.TogglerContainer onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        <S.Toggler />
      </S.TogglerContainer>
    </S.SidebarContainer>
  );
};

export default Sidebar;
