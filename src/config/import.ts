import path from 'path';
import csvParse from 'csv-parse';
import fs from 'fs';

export default async function loadCSV(filePath: string): Promise<any[]> {
  const csvFilePath = path.resolve(__dirname, `${filePath}`);
  const readCSVStream = fs.createReadStream(csvFilePath);

  const parseStream = csvParse({
    from_line: 2,
    ltrim: true,
    rtrim: true,
  });

  const parseCSV = readCSVStream.pipe(parseStream);

  const lines: string[] = [];

  parseCSV.on('data', line => {
    lines.push(line);
  });

  await new Promise(resolve => {
    parseCSV.on('end', resolve);
  });

  return lines;
}
