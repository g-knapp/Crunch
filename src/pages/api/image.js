import nc from 'next-connect';
import fs from "fs";
import path from "path";

function saveImageFile(name, base64Data) {
  // the data comes with a head like:
  // data:image/jpeg;base64
  // which is separated from the actual data by a comma
  const [header, body] = base64Data.split(",");
  const data = Buffer.from(body, "base64");
  const suffix = header.slice(11,header.indexOf(';'));
  const imgName = `${Date.now()}.${suffix}`;
  fs.writeFileSync(path.join('./public/uploads', `${imgName}`), data);
  return imgName;
}

export function onError(error, req, res) {
  console.error(error);
  res.status(500).end(error.toString());
}

const handler = nc({onError})
  .post( (req, res) => {
    const {name} = req.body;
    const {image} = req.body;
    const imgName = saveImageFile(name, image);
    const savedImg = { img: image, path: `/uploads/${imgName}`};
    res.status(200).json(savedImg);
  }
);

export default handler;