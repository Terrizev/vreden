
const axios = require('axios')
const cheerio = require('cheerio')

const mediafireDl = async (url) => {
const res = await axios.get(`https://api.botwa.space/api/mediafire?url=${encodeURIComponent(url)}&apikey=YcOZYAZiP7vO`)
const hasil = []
const link = res.data.result.link
const size = res.data.result.filesize
const sizeB = parseFloat(size) * (/MB$/.test(size) ? 1000 : 1)
const nama = res.data.result.filename
const mime = res.data.result.mimetype
hasil.push({ nama: nama,
mime: mime,
size: size,
sizeB: sizeB,
link: link
})
return hasil
}


module.exports = { mediafireDl }