import cheerio from 'cheerio';

function timezoneToString(timezone) {
  let _timezone = (Math.abs(timezone) * 100).toString().padStart(4, '0');
  return (timezone < 0 ? '-' : '+') + _timezone;
}

function parseWeek(text, timezone) {
  let match = text.match(/(\d{4})\D+(\d{1,2})\D+(\d{1,2})/);
  return match
    ? new Date(
      `${match[1]}-${match[2]}-${match[3]}T00:00:00${timezoneToString(
        timezone
      )}`
    ).getTime()
    : 0;
}

function parseTime(text, timezone) {
  let match = text.match(
    /(\d{1,2})\D+(\d{1,2})\D+(\d{4})\D+(\d{1,2})\D+(\d{1,2})\D+(\d{1,2})/
  );
  return match
    ? new Date(
      `${match[3]}-${match[2]}-${match[1]}T${match[4]}:${match[5]}:${
        match[6]
      }${timezoneToString(timezone)}`
    ).getTime()
    : 0;
}

export function parseRow(rowHtml, timezone) {
  const $ = cheerio.load(`<table>${rowHtml}</table>`);
  const $tds = $('td');
  const url = $($tds[0])
    .find('a')
    .attr('href')
    .trim();
  let urlId = url.match(/[^?]+\?prg=(\d+)&/i);
  urlId = urlId ? parseInt(urlId[1], 10) : 0;

  return {
    id: $($tds[0])
      .text()
      .trim(),
    url: url,
    urlId: urlId,
    name: $($tds[1])
      .text()
      .trim(),
    variant: $($tds[2])
      .text()
      .trim(),
    week: parseWeek(
      $($tds[3])
        .text()
        .trim(),
      timezone
    ),
    time: parseTime(
      $($tds[4])
        .text()
        .trim(),
      timezone
    ),
    type: $($tds[5])
      .text()
      .replace(/-/g, '')
      .trim(),
    timeshift: parseInt($($tds[6]).text(), 10)
  };
}

/**
 * Parse s-tv html files list responde
 *
 * @param {String} html -- UTF-8 encoding
 * @param {Number} timezone -- server timezone for date/time parsing
 */
export default function(html, timezone) {
  const $ = cheerio.load(html);
  let files = [];
  $('tbody tr').each((key, tr) => files.push(parseRow($(tr).html(), timezone)));
  return files;
}
