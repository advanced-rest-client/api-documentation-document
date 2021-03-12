import { css } from 'lit-element';

export default css`
:host {
  display: block;
}

h1 {
  font-size: var(--arc-font-headline-font-size);
  font-weight: var(--arc-font-headline-font-weight);
  letter-spacing: var(--arc-font-headline-letter-spacing);
  line-height: var(--arc-font-headline-line-height);
}

arc-marked {
  background-color: transparent;
  padding: 0;
}
`;
