import MD5 from "crypto-js/md5.js";

inf.nfind((x) => MD5(`${data}${x}`).toString().startsWith("000000")).print();
