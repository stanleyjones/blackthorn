import React from 'react';
import { Link } from 'react-router';

const List = ({ className, label, nameAttr, path, items }) => (
  <div className={className}>
    { label ? <h2>{label} ({items.length})</h2> : null }
    <ul>
    { items.map(item => (
      <li key={item.id}>
        { path
          ? <Link to={`${path}/${item.id}`}>{item[nameAttr]}</Link>
          : <span>{item[nameAttr]}</span>
        }
      </li>
    )) }
    </ul>
  </div>
);

List.defaultProps = {
  items: [],
  nameAttr: 'name',
};

export default List;
