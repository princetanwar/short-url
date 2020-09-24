const shortid = require("shortid");
const shortUrl = require("../model/ShortUrl");
const validUrl = require("valid-url");
const { baseUrl } = require("../config/keys");

module.exports.shortUrlPost = async (req, res) => {
  const { longurl } = req.body;

  try {
    if (!validUrl.isUri(longurl)) {
      res.status(401).json({ error: "not a valid url" });
    } else {
      let url = await shortUrl.findOne({ longUrl: longurl });

      if (url) {
        const { urlCode } = url;
        res.json({ url: `${baseUrl}/api/${urlCode}` });
      } else {
        const url = new shortUrl({
          longUrl: longurl,
          urlCode: shortid.generate(),
        });

        const { urlCode } = await url.save();

        res.json({ url: `${baseUrl}/api/${urlCode}` });
      }
    }
  } catch (err) {
    console.log(err);
    res.Json({ error: "faild to create short url" });
  }
};

module.exports.redirectGet = async (req, res) => {
  try {
    const { urlCode } = req.params;

    const urlObj = await shortUrl.findOne({ urlCode: urlCode }, "longUrl");
    if (urlObj) {
      const { longUrl } = urlObj;
      console.log(longUrl);
      res.redirect(longUrl);
    } else {
      throw "not a valid short url";
    }
  } catch (err) {
    res.send("Url not find");
    console.log(err);
  }
};
