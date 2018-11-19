import React from 'react';
import _ from 'lodash';

import Purchase from './Purchase';

export default function Purchases(props) {
  const { content, contentType, mode } = props;

  return (
    <ul className="purchases">
      {_.map(content, (elem) => {
        let image;
        try {
          image = require(`../../../assets/${contentType}/${elem.id}.jpg`);
        } catch (err) {
          image = '';
        };

        return (
          <Purchase
            key={elem.id}
            itemId={elem.id}
            status={elem.status}
            itemType={contentType}
            itemPrice={elem.price}>
            {(simplePurchase, togglePurchase) => (
              <li onClick={mode === 'toggle'
                ? togglePurchase
                : simplePurchase}
                className={`${elem.status === false ? 'non-bought' : 'bought'} standard_tile`}>
                <div className="name">
                  <h3>{elem.name}</h3>
                </div>
                <div className="price title">
                  <p>{Number(elem.price).toLocaleString('en')} $</p>
                </div>
                <img src={image} alt="hmm, there should be something here"/>
                <button>
                  {elem.status === false ? 'Buy' : 'Sell'}
                </button>
              </li>
            )}
          </Purchase>
        );
      })}
    </ul>
  );
}
