// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import path from 'path';

export default (req, res) => {
  // Open Chrome DevTools to step through the debugger!
  // debugger;
  res.status(200).json({ name: path.basename('C:\\temp\\myfile.html') });
};
