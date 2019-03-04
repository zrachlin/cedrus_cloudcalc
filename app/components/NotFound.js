import React from 'react';
const NotFound = props => {
  const { type, id } = props.match.params;
  const typeStr = type[0].toUpperCase() + type.slice(1);
  return (
    <h1>
      {`Couldn't find ${typeStr} with ID "${id}" -> Please verify that you have the correct ${typeStr} ID!`}
    </h1>
  );
};

export default NotFound;
