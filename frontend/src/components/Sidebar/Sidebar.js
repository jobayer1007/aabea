import React, { useState } from 'react';
import * as S from './Sidebar.styles';

const Sidebar = (props) => {
  const {
    backgroundImage = '',
    sidebarHeader = '',
    menuItems = [],
    fonts = {
      header: '',
      menu: '',
    },
  } = props;

  // State
  const [selected, setSelectedMenuItem] = useState(menuItems[0].name);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleMenuItemClick = (name) => {
    setSelectedMenuItem(name);
  };

  const menuItemsJSX = menuItems.map((item, index) => {
    const isItemSelected = selected === item.name;
    console.log(`${item.name} selected? ${isItemSelected} `);

    return (
      <S.MenuItem
        key={index}
        fonts={fonts.menu}
        selected={isItemSelected}
        onClick={() => handleMenuItemClick(item.name)}
      >
        <S.Icon src={item.icon} />
        <S.Text>{item.name}</S.Text>
      </S.MenuItem>
    );
  });

  console.log(`is it open: ${isSidebarOpen}`);

  return (
    <S.SidebarContainer backgroundImage={backgroundImage}>
      <S.SidebarHeader fonts={fonts.header}>{sidebarHeader}</S.SidebarHeader>
      <S.MenuItemContainer>{menuItemsJSX}</S.MenuItemContainer>
      <S.TogglerContainer onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        <S.Toggler />
      </S.TogglerContainer>
    </S.SidebarContainer>
  );
};

export default Sidebar;
