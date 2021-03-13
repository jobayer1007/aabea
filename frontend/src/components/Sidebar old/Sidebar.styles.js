import styled from '@emotion/styled';

export const SidebarContainer = styled.div`
  width: ${(p) => (p.isSidebarOpen ? '20%' : '5%')};
  top: 20%;
  height: 80%;
  max-width: 280px;
  min-width: 80px;
  background-image: linear-gradient(
      315deg,
      rgba(252, 82, 150, 0.8) 0%,
      rgba(246, 112, 98, 0.8) 74%
    ),
    url(${(p) => p.backgroundImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  color: #fff;
  position: relative; // TogglerContaianer
  transition: 0.2s ease-in all;
`;

export const SidebarHeader = styled.h3`
  padding: 20px 0;
  text-align: center;
  margin-bottom: 10px;
  letter-spacing: 6px;
  font-family: ${(p) => p.fonts};
  color: #fff;
`;

export const ItemContainer = styled.div``;
export const MenuItemContainer = styled.div``;

// Menu Items ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const MenuItem = styled.div`
  ${(p) =>
    !p.isSidebarOpen &&
    `
    text-align: center;
    ${(p = p.selected && 'background-color: rgba(0 ,0 ,0 ,0.6)')};
    
    `};
  padding: 6px 20px;
  font-weight: 600;
  color: ${(p) => (p.selected ? 'rgba(255, 255, 255)' : 'rgba(19, 15, 64)')};
  font-family: ${(p) => p.fonts};
  white-space: nowrap;
  position: relative; // Dropdown Icon
  transition: 0.2s ease-in all;

  &:hover {
    color: rgba(255, 255, 255);
    transform: 0.1s ease-in all;
  }

  &:after {
    content: '';
    border: 0.1px solid
      ${(p) => (p.selected ? 'rgba(255, 255, 255)' : 'rgba(255, 112, 85)')};

    display: ${(p) =>
      p.isSidebarOpen && p.selected && p.isOpen ? 'none' : 'block'};
    margin: 8px 0 4px;
    transition: 0.1s ease-in all;
  }

  ${(p) =>
    !p.selected &&
    `
  &:hover {
    &:after {
      border: 1px solid rgba(255, 255, 255, 0.2);
      transform: 0.1s ease-in all;
    }
  }
  `}
`;

export const Text = styled.p`
  display: ${(p) => (p.isSidebarOpen ? 'inline' : 'none')};
  /* padding-left: 20px; */
  /* transition: 0.2s ease-in display; */
`;

export const Icon = styled.img`
  ${(p) =>
    p.isSidebarOpen &&
    `margin-right: 20px; transition: .2s ease-in margin-right`};

  height: 16px;
  width: 16px;
`;

// SubMenu Item ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const SubMenuItemContainer = styled.div`
  font-size: 14px;
  ${(p) => p.isSidebarOpen && 'padding-left: 20%'};
  ${(p) => !p.isSidebarOpen && 'text-align: center'};
`;

export const SubMenuItem = styled.p`
  color: rgba(19, 15, 64);

  &:hover {
    color: rgba(255, 255, 255);
  }
`;

// Dropdown Icon ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const DropDownIcon = styled.span`
  position: absolute;
  top: ${(p) => (p.isOpen ? '16px' : '13px')};
  right: 24px;
  border: solid
    ${(p) => (p.selected ? 'rgba(255, 255, 255)' : 'rgba(19, 15, 64)')};
  border-width: 0 1px 1px 0;
  padding: 3px;
  transform: ${(p) => (p.isOpen ? 'rotate(-135deg)' : 'rotate(45deg)')};
  transition: 0.2s ease-in all;
`;

// Toggler ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const TogglerContainer = styled.div`
  position: absolute; // SidebarContainer
  width: 30%;
  bottom: 10%;
  left: 0;
  right: 0;
  margin: 0 auto;
`;

export const Toggler = styled.div`
  height: 40px;
  cursor: pointer;
  /* border: 1px solid #333; */
  position: relative; // horizontal line
  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0.25em;
    width: 100%;
    height: 0.1em;
    background: #fff;
    box-shadow: 0 0.75em 0 0 #fff, 0 1.5em 0 0 #fff;
  }
`;
