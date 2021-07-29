import fs from "fs";
import path from "path";

export default function saveImageFile(name, base64Data) {
  // the data comes with a head like:
  // data:image/jpeg;base64
  // which is separated from the actual data by a comma
  const [header, body] = base64Data.split(",");
  const data = Buffer.from(body, "base64");
  const suffix = header.slice(11,header.indexOf(';'));
  fs.writeFileSync(path.join('./uploads', `${name}.${suffix}`), data);
}