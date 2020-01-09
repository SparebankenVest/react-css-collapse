import React, { useState } from 'react';
import { render } from '@testing-library/react';
import Collapse from '../../../src/components/Collapse';

const Simple = () => <p>Simple?</p>;
const Test = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button type="button" onClick={() => setIsOpen(!isOpen)}>
        Toggle
      </button>
      <Collapse data-testid="collapse" isOpen={isOpen} />
    </div>
  );
};
context('Collapse', () => {
  describe('Interactions', () => {
    // it('lifecycle', () => {
    //   cy.visit(
    //     'http://localhost:6006/iframe.html?id=collapse--default&viewMode=story',
    //   );
    //   cy.get('[data-cy=collapse-0]').should($collapse => {
    //     expect($collapse).to.have.attr(
    //       'style',
    //       'will-change: height; overflow: hidden; visibility: hidden; height: 0px;',
    //     );
    //   });
    //   cy.get('[data-cy=collapse-toggle-0]').click();
    //   cy.get('[data-cy=collapse-0]').should($collapse => {
    //     expect($collapse).to.have.attr(
    //       'style',
    //       'will-change: height; overflow: visible; visibility: visible; height: auto;',
    //     );
    //   });
    //   cy.get('[data-cy=collapse-toggle-0]').click();
    //   cy.get('[data-cy=collapse-0]').should($collapse => {
    //     expect($collapse).to.have.attr(
    //       'style',
    //       'will-change: height; overflow: hidden; visibility: hidden; height: 0px;',
    //     );
    //   });
    // });
    it('test', () => {
      cy.mount(<Simple />);
      const component = render(<Test />);
      const el = component.getByTestId('collapse');
      expect(el).to.have.attr(
        'style',
        'will-change: height; overflow: hidden; visibility: hidden; height: 0px;',
      );
    });
  });
});
