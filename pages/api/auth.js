// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import path from 'path';
import fs from 'fs';
import mime from 'mime';
import request from 'request';

var file = '../../assets/images/nextjs-icon.png'; // Filename you want to upload on your local PC
var onedrive_folder = 'assets/images'; // Folder name on OneDrive
var onedrive_filename = 'nextjs-icon.png'; // Filename on OneDrive

export default (req, res) => {
  request.post(
    {
      url: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
      form: {
        redirect_uri: 'http://localhost/dashboard',
        client_id: '60dbf259-3e7b-41d1-98c1-da0df9addca7',
        client_secret: '8Lr8Q~ruGkwRzQhxCErBIvdELlSqBv3UaevV.dqo',
        code: 'M.R3_SN1.408ce67c-3877-caa3-7853-636f2ffc626b',
        grant_type: 'authorization_code',
      },
    },
    function (error, response, body) {
      fs.readFile(file, function read(e, f) {
        request.put(
          {
            url:
              'https://graph.microsoft.com/v1.0/drive/root:/' +
              onedrive_folder +
              '/' +
              onedrive_filename +
              ':/content',
            headers: {
              Authorization: 'Bearer ' + JSON.parse(body).access_token,
              'Content-Type': mime.lookup(file),
            },
            body: f,
          },
          function (er, re, bo) {
            console.log(bo);
          }
        );
      });
    }
  ).then(() => {
    res.status(200).json({ name: path.basename('C:\\temp\\myfile.html') });
  }).catch(() => {
    res.status(200).json({ name: path.basename('C:\\temp\\myfile.html') });
  })
  
};
