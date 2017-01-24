import express from 'express';
import path from 'path';

const useExpress = app => {
  app.get(/.*\.js/, express.static('public'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../public/index.html'));
  });
};

export default useExpress;
