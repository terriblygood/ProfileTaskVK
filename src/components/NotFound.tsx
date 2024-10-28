import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404 - Страница не найдена</h1>
      <p>Извините, но запрашиваемая страница не найдена. Попробуйте перезагрузить страницу, возможно просто возникла ошибка</p>
    </div>
  );
};

export default NotFound;
