import styled from '@emotion/styled';

export const NavbarContainer = styled.div`
  /* background: #1e3b70; */
  width: 100%;
  height: 20%;
  position: absolute;
  text-align: center;
  color: white;
  /* background-image: linear-gradient(
      315deg,
      rgba(252, 82, 150, 0.8) 0%,
      rgba(246, 112, 98, 0.8) 74%
    ),
    url(${(p) => p.logoImage}); */
`;

export const LogoContainer = styled.div`
  height: 100%;
  width: 20%;
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  text-align: center;
  background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 100%
    ),
    url(${(p) => p.logoImage});
`;
