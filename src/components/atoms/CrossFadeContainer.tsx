// https://jakearchibald.com/2021/dom-cross-fade/
import styled from 'styled-components'

const CrossFadeContainer = styled.div`
  display: grid;
  grid-template-areas: 'inner-div';
  height: 100%;
  width: 100%;
  place-items: inherit;
  isolation: isolate;

  > * {
    grid-area: inner-div;
    mix-blend-mode: plus-lighter; // 赞赞
  }
`

export default CrossFadeContainer
