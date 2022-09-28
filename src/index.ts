import * as fs from 'fs';

function printBuffer(buffer: Array<string>, indexes: Array<number>) {
  console.log(indexes, buffer[0]);
}

try {
  const data = fs.readFileSync('./data/source.md', 'utf8');
  const lines = data.split('\n');

  const indexes = [0, 0, 0];

  const re = /^(#{1,3})/;

  const buffer: Array<string> = [];
  for (const line of lines) {
    const match = line.match(re);
    if (match !== null) {
      const header = match[0];
      const idx = header!.length - 1;
      if (buffer.length > 0) {
        printBuffer(buffer, indexes);
        buffer.length = 0;
      }
      indexes[idx]++;
      if (idx < 1) indexes[1] = 0;
      if (idx < 2) indexes[2] = 0;
      buffer.push(line);
    }
  }
} catch (err) {
  console.error(err);
}

