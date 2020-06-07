import got from "got"
import * as fs from "fs"
import util from "util"

interface ItemRef {
  index: string
  name: string
  url: string
}

const main = async () => {
  console.log("Getting items...")
  const items = {}
  const itemList: ItemRef[] = (await got("https://www.dnd5eapi.co/api/equipment/").json()).results
  console.log(itemList)
  for (let i=0;i<itemList.length;i++) {
    const itemRef = itemList[i]
    const item = await got(`https://www.dnd5eapi.co${itemRef.url}`).json()
    items[item.index] = item
  }
  fs.writeFileSync("./equipment.json", JSON.stringify(items))
}

main()