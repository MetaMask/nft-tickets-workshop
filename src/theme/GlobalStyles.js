import { lighten } from 'polished'
import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`

  html {
    height: 100vh;
  }

  body {
    font-family: 'Space Mono', monospace;
    margin: 0;
    padding: 0;
    position: relative;
    background-color: #efefef;
    color: #000A;
    width: 100vw;
    height: 100%;
    #root {
      position: relative;
      width: 100vw;
      display: grid;
      height: 100%;
      overflow: scroll;
      grid-template-columns: 14vw auto;
      grid-template-rows: 80px auto 80px;
      gap: 0px 0px;
      grid-template-areas:
        "header header"
        "nav main"
        "footer footer";
      @media (min-width: 1500px) {
        grid-template-rows: 80px auto 80px;
        grid-template-columns: 14vw auto;
        justify-items: stretch;
      }
    }

  }

  header {
    align-items: center;
    display: flex;
    align-self: start;
    background-color: #161616;
    grid-area: header;
    flex-direction: row;
    height: 80px;
    justify-content: space-between;
    width: 100%;
    padding: 0 0.75em;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 2px solid #000;
    > * { justify-self: end; }
    @media (min-width: 1200px) {
      padding: 0 2em;
      grid-template-columns: 14vw auto;
    }
  }

  footer {
    height: 80px;
    border-top: 2px solid #000;
    grid-area: footer;
    background-color: #333;
    color: #fff;
    width: 100%;
    align-self: flex-end;
    display: flex;
    padding: 0 2em;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > * { width: fit-content; }
    p > a { text-decoration: underline; }
    > div {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    @media (min-width: 600px) {
      flex-direction: row;
      justify-content: space-between;
    }
  }

  nav {
    height: 100%;
    justify-self: center;
    background-color: #666;
    opacity: 0.8;
    background-image: radial-gradient(#4f4f4f 1px, #4e4e4e 1px);
    background-size: 17px 17px;
    align-self: stretch;
    grid-area: nav;
    width: 14vw;
    border-right: 2px solid #000;
    justify-self: center;
    align-self: stretch;
    @media (min-width: 1500px) {
      width: 14vw;
    }
    ul {
      list-style-type: none;
    }
    li {
      padding-left: 0.5em; text-indent: -2em;
    }
    li > a {
      color: #fff;
    }
    li > a:hover {
      color: #999;
    }
  }

  main {
    grid-area: main;
    z-index: 10;
    width: 100%;
    justify-self: stretch;
    padding-left: 1em;
    padding-top: 0.5em;
  }

  section {
    padding-top: 1em;
    width: 100%;
    @media (min-width: 500px) {
      width: fit-content;
      align-self: stretch;
      height: 100%;
      padding-top: 2em;
      padding-bottom: 2em;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 400;
    font-style: normal;
    color: #000;
    margin: 0;
    &::selection {
      background-color: #000;
      color: #fff;
    }
  }

  h1 {
      font-size: 1.5em;
    @media (min-width: 1500px) {
      font-size: 2rem;
    }
   }

  h2 {
    font-size: 1.02rem;
    @media (min-width: 500px) {
      font-size: 1.602rem;
    }
  }

  h3 {font-size: 1.3rem;}

  h4 {font-size: 1.266rem;}

  h5 {font-size: 1.125rem;}

  p {
    font-weight: 400;
    padding: 0;
    color: #000;
    margin: 0;
    &::selection {
      color: #fff;
    }
  }

  a {
    color: #000;
    text-decoration: none;
    &::selection {
      background-color: #000;
      color: #fff;
    }
  }

  span::selection {
    background-color: #000;
    color: #fff;
  }

  form {
    grid-area: form;
    border-radius: 15px;
    width: 100%;
    box-sizing: border-box;
    padding: 1em;
    height: fit-content;
    @media (min-width: 1300px) {
      width: 460px;
    }
  }

  legend {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: .25em 0 .5em;
    h2 {
      color: ${lighten(0.15, '#16171d')};
    }
  }

  fieldset {
    border: none;
    margin: 0;
    padding: 0;
    &:disabled {
      user-select: none;
    }
  }

  button {
    display: flex;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    flex-direction: row;
    align-items: center;
    width: fit-content;
    padding: 0em 1.5em;
    cursor: pointer;
    border-radius: 50px;
    border: 3px solid #E2761B;
    img { height: 40px; width: 40px; margin-right: 10px; }
    background-color: ${lighten(0.075, '#16171c')};
    color: #FFF;
    font-size: 1em;
    p {
      color: #FFF;
    }
    &:disabled {
      cursor: not-allowed;
      user-select: none;
    }
  }

  label {
    display: flex;
    flex-direction: column;
    padding: 0.25em 0 0;
    margin-top: 0.5em;
    position: relative;
    color: ${lighten(0.35, '#16171d')};
  }

  input {
    width: calc(100% - 1em - 60px);
    margin: 1em 0;
    height: 40px;
    box-shadow: rgba(0, 0, 0, 5%) 0px 5px 10px inset;
    border-radius: 10px;
    border: none;
    outline: none;
    margin: 0;
    padding: 0;
    padding-left: .5em;
    font-weight: 400;
    font-size: 1.1em;
    line-height: 25px;
    border: 2px solid ${lighten(0.075, '#16171d')};
    background-color: #fff;
    transition: 0.2s;
    color: #000;
    &:focus { border: 2px solid ${lighten(0.15, '#16171d')}; }
    &:disabled { cursor: not-allowed; user-select: none; }
    margin-top: 0.15em;
    padding-top: .05em;
    &::selection {
      background-color: #000;
      color: #fff;
    }
  }

  img { user-select: none; }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
  input[type=number] { -moz-appearance: textfield; }
`

export default GlobalStyles