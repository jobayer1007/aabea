import React from 'react';
import * as S from './Navbar.Styles';

const Navbar = (props) => {
  const { logoImage = '' } = props;

  return (
    <S.NavbarContainer>
      <S.LogoContainer logoImage={logoImage}></S.LogoContainer>
    </S.NavbarContainer>
  );
};

export default Navbar;
