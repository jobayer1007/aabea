import styled from '@emotion/styled';

export const MainScreenContainer = styled.div`
  width: ${(p) => (p.isSidebarOpen ? '80%' : '95%')};
  top: 20%;
  /* margin-top: 13%; */
  /* padding-top: 20%; */
  height: 80%;
  text-align: center;
  background: pink;
  position: relative;
  transition: 0.2s ease-in all;
`;
