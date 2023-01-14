const fetch = require("node-fetch");
const cheerio = require("cheerio");
const readlineSync = require("readline-sync");

const check = (rek, bank) =>
  new Promise((resolve, reject) => {
    fetch("http://api.xfatih.com/checker/rek.php", {
      method: "POST",
      headers: {
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
        "Cache-Control": "max-age=0",
        Connection: "keep-alive",
        Cookie: "i18next=en",
        Origin: "http://api.xfatih.com",
        Referer: "http://api.xfatih.com/checker/rek.php",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent": "Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Mobile Safari/537.36",
      },
      body: new URLSearchParams({
        acc: rek,
        bank: bank,
        submit: "Check",
      }),
    })
      .then((res) =>
        res.text().then((res) => {
          $ = cheerio.load(res).text();

          const nama = $.substring($.indexOf(":") + 1, $.indexOf("Account")).trim();

          resolve(nama);
        })
      )
      .catch((err) => reject(err));
  });

(async () => {
  const namaBanks = ["BCA", "Blu By BCA", "BNI", "BRI", "Cimb Niaga", "Permata", "Danamon", "Bank DKI", "BTPN/Jenius", "NOBU Bank", "Bank Jago/Artos", "Line Bank", "LinkAja!", "Gopay", "Ovo", "Dana"];
  const banks = ["bca", "royal", "bni", "bri", "cimb", "permata", "danamon", "dki", "tabungan_pensiunan_nasional", "nationalnobu", "artos", "hana", "linkaja", "gopay", "ovo", "dana"];

  console.log("===========================================\n| Checker Bank\n|\n| Author: M Khoirul Risqi\n| Github: https://github.com/risqikhoirul\n| Thanks to: M Reza Rizaldi\n===========================================");
  const bank = readlineSync.keyInSelect(namaBanks, "Masukan Nomer Bank? ");

  const rek = readlineSync.question("Masukan No REK/Telp? ");
  const readCheck = await check(rek, banks[bank]);

  if (readCheck.length === 0) {
    console.log("\nData tidak temukan");
  } else {
    console.log(`\nNama: ${readCheck}\nBank: ${namaBanks[bank]}\nNo Rek: ${rek}`);
  }
})();
